import { fetchCategories } from '../services/quizApi';
import { useQuery } from '@tanstack/react-query';
import type { Track } from '@/features/home/types/home';
import type { Lyric } from '@/features/track/types/track';

export default function useCategories(track?: Track, lyric?: Lyric[]) {
  const trackId = track?.id || '';
  const {
    data: categories,
    isLoading: categoryLoading,
    error: categoryError,
  } = useQuery({
    queryKey: ['category', trackId],
    queryFn: () => fetchCategories(trackId, lyric),
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 25,
    retry: false,
    enabled: lyric && lyric.length > 0 && !!trackId,
  });

  return { categories, categoryLoading, categoryError };
}
