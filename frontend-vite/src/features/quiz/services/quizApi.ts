import { apiClient } from '@/services/axios';
import type {
  ListeningQuiz,
  ListeningQuizResult,
  Quiz,
  QuizResult,
} from '../types/quiz';

// track Id와 가사로 가능한 퀴즈 카테 고리 요청
export async function fetchCategories(id: string, lyric: string) {
  const { data } = await apiClient.post(
    `/api/support/quiz/category/${id}`,
    lyric
  );
  return Object.keys(data);
}

// 퀴즈 생성
export async function createQuiz(
  musicId: string,
  category: string,
  lyric?: string,
  signal?: AbortSignal
): Promise<Quiz[] | ListeningQuiz> {
  const quizType = category.toUpperCase();
  const modifiedLyric = lyric?.replace(/\[.*?\]/g, '').replace(/\n/g, '.\n');

  const { data } = await apiClient.post(
    `/api/quiz/${category}`,
    {
      musicId,
      quizType,
      lyric: modifiedLyric,
    },
    { signal }
  );
  if (category === 'listening') return data as ListeningQuiz;
  return data.quizzes as Quiz[];
}

export async function submitQuiz(
  musicId: string,
  category: string,
  answers: number[]
): Promise<QuizResult> {
  const quizType = category.toUpperCase();
  const { data } = await apiClient.post(`/api/quiz/submit/${category}`, {
    musicId,
    quizType,
    answers,
  });
  return data;
}

export async function submitListeningQuiz(
  musicId: string,
  submitWordList: string[]
): Promise<ListeningQuizResult> {
  const { data } = await apiClient.post(`/api/quiz/submit/listening`, {
    musicId,
    submitWordList,
  });
  return data;
}
