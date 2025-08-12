import { useQuery } from '@tanstack/react-query';
import { fetchRanks } from '../services/quizApi';

export default function useRank(id: string) {
  const {
    data: ranks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['ranks'],
    queryFn: () => fetchRanks(id),
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 25,
    refetchOnWindowFocus: false,
    retry: false,
  });

  return { ranks, isLoading, error };
}
