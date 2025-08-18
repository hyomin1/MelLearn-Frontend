import { useMutation } from '@tanstack/react-query';
import { fetchMockExam } from '../api/mockExamApi';
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

  return { create };
}
