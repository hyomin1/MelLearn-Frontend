import { useMutation } from '@tanstack/react-query';
import { fetchMockExam, submitMockExam } from '../api/mockExamApi';
import toast from 'react-hot-toast';
import { useMockExamStore } from '@/store/useMockExamStore';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/services/router';

export default function useMockExam(lyric: string, musicId?: string) {
  const setMockExam = useMockExamStore((state) => state.setMockExam);
  const setMockExamResult = useMockExamStore(
    (state) => state.setMockExamResult
  );
  const navigate = useNavigate();
  const { mutate: create } = useMutation({
    mutationFn: () => fetchMockExam(lyric, musicId),
    onSuccess: ({ data }) => {
      setMockExam(data);
      toast.success('모의고사 생성 완료');
    },
    onError: () => {
      toast.error('모의고사 생성 실패');
    },
  });

  const { mutate: submit } = useMutation({
    mutationFn: (form: FormData) => submitMockExam(form),
    onSuccess: (data) => {
      toast.success('모의고사 제출 완료');
      setMockExamResult(data.comprehensiveQuizAnswer);
      navigate(ROUTES.MOCK_EXAM_RESULT(musicId || ''));
    },
    onError: () => {
      toast.error('모의고사 제출 실패');
    },
  });

  return { create, submit };
}
