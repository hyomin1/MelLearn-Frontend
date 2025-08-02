import { useMutation, useQuery } from '@tanstack/react-query';

import { createQuiz, fetchCategories, submitQuiz } from '../services/quizApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function useQuiz(trackId: string, lyric?: string) {
  const [comment, setComment] = useState<Comment>();
  const [quiz, setQuiz] = useState([]);
  const navigate = useNavigate();
  const {
    data: categories,
    isLoading: categoryLoading,
    error: categoryError,
  } = useQuery({
    queryKey: ['category', trackId],
    queryFn: () => fetchCategories(trackId, lyric || ''),
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 25,
    retry: false, // 제거
  });

  const { mutate: create, isPending: quizLoading } = useMutation({
    mutationFn: (category: string) => createQuiz(trackId, category, lyric),
    onSuccess: (data, category) => {
      toast.success('퀴즈 생성 성공!');
      setQuiz(data);
      navigate(`/quiz/${category.toLowerCase()}/${trackId}`);
    },
    onError: (error: any, category) => {
      if (error?.code === 'ERR_CANCELED') {
        return;
      }
      toast.error('퀴즈 생성 실패');
      navigate(`/quiz/${category.toLocaleLowerCase()}/${trackId}`); // 추후 제거
    },
  });

  //퀴즈 제출
  const { mutate: submit } = useMutation({
    mutationFn: ({
      category,
      answers,
    }: {
      category: string;
      answers: number[];
    }) => submitQuiz(trackId, category, answers),
    onSuccess: (data, { category }) => {
      toast.success('답안이 제출되었습니다.');
      navigate(`/quiz/${category.toLocaleLowerCase()}/result/${trackId}`);
      setComment(data);
    },
    onError: (_, { category }) => {
      toast.error('퀴즈 제출 실패');
      navigate(`/quiz/${category.toLocaleLowerCase()}/result/${trackId}`);
    },
  });

  return {
    categories,
    categoryLoading,
    quizLoading,
    categoryError,
    create,
    submit,
    quiz,
    comment,
  };
}
