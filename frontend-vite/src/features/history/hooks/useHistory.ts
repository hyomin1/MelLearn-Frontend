import { useQuery } from '@tanstack/react-query';
import { fetchHistory } from '../api/historyApi';
import type { HistoryData, QuizType } from '../types/history';

export default function useHistory(page: number, quizType: QuizType) {
  const {
    data: history,
    isLoading,
    error,
  } = useQuery<HistoryData>({
    queryKey: ['history', page, quizType],
    queryFn: () => fetchHistory(page, quizType),
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 25,
    refetchOnWindowFocus: false,
    retry: false,
  });

  return { history, isLoading, error };
}
