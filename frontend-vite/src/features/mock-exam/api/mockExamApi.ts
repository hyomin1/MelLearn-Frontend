import { apiClient } from '@/services/axios';

export async function fetchMockExam(lyric: string, musicId?: string) {
  return await apiClient.post('/api/comprehensive-quiz', {
    musicId,
    lyric,
    quizType: 'GRAMMAR',
  });
}
export async function submitMockExam(form: FormData) {
  const { data } = await apiClient.post('/api/comprehensive-quiz/submit', form);
  return data;
}
