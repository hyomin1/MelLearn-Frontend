import { apiClient } from '@/services/axios';
import type {
  TextHistory,
  ListeningHistory,
  SpekaingHistory,
  QuizType,
} from '../types/history';

export async function fetchHistory(
  page: number,
  quizType: QuizType
): Promise<TextHistory | ListeningHistory | SpekaingHistory> {
  const { data } = await apiClient.get('/api/quiz/submit', {
    params: {
      page,
      quizType,
    },
  });
  return data;
}
