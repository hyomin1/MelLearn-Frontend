import { useMutation } from '@tanstack/react-query';
import { fetchMockExam, submitMockExam } from '../api/mockExamApi';
import toast from 'react-hot-toast';
import { useMockExamStore } from '@/store/useMockExamStore';

export default function useMockExam(lyric: string, musicId?: string) {
  const setMockExam = useMockExamStore((state) => state.setMockExam);
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
      console.log(data); // 제출 후 모의고사 해설 처리하기
    },
    onError: () => {
      toast.error('모의고사 제출 실패');
    },
  });

  return { create, submit };
}
