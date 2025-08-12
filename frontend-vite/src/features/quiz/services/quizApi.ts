import { apiClient } from '@/services/axios';
import type {
  ListeningQuiz,
  ListeningComment,
  Quiz,
  Comment,
} from '../types/quiz';
import type { Lyric } from '@/features/track/types/track';

function convertToRequestBody(lyrics?: Lyric[]) {
  if (!lyrics) return [];
  const result = [];

  for (let i = 0; i < lyrics.length; i++) {
    const current = lyrics[i];
    const next = lyrics[i + 1];

    const startMs = Math.round(current.time * 1000); // 초 → 밀리초
    const durMs = next ? Math.round((next.time - current.time) * 1000) : 2000; // 마지막은 기본 2초 처리

    result.push({
      startMs,
      durMs,
      text: current.text,
    });
  }

  return result;
}

// track Id와 가사로 가능한 퀴즈 카테 고리 요청
export async function fetchCategories(id: string, syncedLyrics?: Lyric[]) {
  if (!id) return;
  const payload = convertToRequestBody(syncedLyrics);

  const { data } = await apiClient.post(
    `/api/support/quiz/category/${id}`,
    payload
  );
  return data;
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
): Promise<Comment> {
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
): Promise<ListeningComment> {
  const { data } = await apiClient.post(`/api/quiz/submit/listening`, {
    musicId,
    submitWordList,
  });
  return data;
}

export async function submitSpeakingQuiz(form: FormData) {
  const { data } = await apiClient.post(
    '/api/problem/speaking/transcription',
    form
  );
  return data;
}

export async function fetchRanks(musicId: string) {
  const { data } = await apiClient.get('/api/problem/speaking/ranking', {
    params: {
      musicId,
    },
  });
  return data;
}
