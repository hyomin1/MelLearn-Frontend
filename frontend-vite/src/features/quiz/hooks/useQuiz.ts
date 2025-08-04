import { useMutation } from '@tanstack/react-query';
import {
  createQuiz,
  submitListeningQuiz,
  submitQuiz,
} from '../services/quizApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useQuizStore } from '@/store/useQuizStore';
import type { ListeningQuiz, Quiz } from '../types/quiz';
import { ROUTES } from '@/services/router';

export default function useQuiz(trackId: string, lyric?: string) {
  const setQuiz = useQuizStore((state) => state.setQuiz);
  const setListeningQuiz = useQuizStore((state) => state.setListeningQuiz);
  const setComment = useQuizStore((state) => state.setComment);
  const setListeningComment = useQuizStore(
    (state) => state.setListeningComment
  );
  const navigate = useNavigate();

  const { mutate: create, isPending: quizLoading } = useMutation({
    mutationFn: (category: string) => createQuiz(trackId, category, lyric),
    onSuccess: (data, category) => {
      toast.success('퀴즈 생성 성공!');
      if (category === 'listening') {
        setListeningQuiz(data as ListeningQuiz);
      } else {
        setQuiz(data as Quiz[]);
      }
      navigate(`/quiz/${category.toLowerCase()}/${trackId}`);
    },
    onError: (error: any) => {
      //TODO: 취소 로직 다시 구현 및 ERROR 타입 정의
      if (error?.code === 'ERR_CANCELED') {
        return;
      }
      toast.error('퀴즈 생성 실패');
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
      navigate(ROUTES.QUIZ_RESULT(category.toLocaleLowerCase(), trackId));
      setComment(data);
    },
    onError: () => {
      toast.error('퀴즈 제출 실패');
    },
  });

  const { mutate: submitListening } = useMutation({
    mutationFn: (submitAnswers: string[]) =>
      submitListeningQuiz(trackId, submitAnswers),
    onSuccess: (data) => {
      toast.success('답안이 제출되었습니다.');

      navigate(ROUTES.QUIZ_RESULT('listening', trackId));
      setListeningComment(data);
    },
    onError: () => {
      toast.error('퀴즈 제출 실패');
    },
  });

  return {
    quizLoading,

    create,
    submit,
    submitListening,
  };
}
