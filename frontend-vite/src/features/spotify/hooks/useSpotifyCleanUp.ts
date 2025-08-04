import { useSpotifyStore } from '@/store/useSpotifyStore';
import { useEffect } from 'react';

export default function useSpotifyCleanUp() {
  const setIsPlayerOpen = useSpotifyStore((state) => state.setIsPlayerOpen);
  const setIsPlaying = useSpotifyStore((state) => state.setIsPlaying);
  const player = useSpotifyStore((state) => state.player);

  useEffect(() => {
    return () => {
      setIsPlayerOpen(false);
      setIsPlaying(false);
      player?.pause();
      player?.seek(0);
    };
  }, [setIsPlayerOpen, setIsPlaying, player]);
}
