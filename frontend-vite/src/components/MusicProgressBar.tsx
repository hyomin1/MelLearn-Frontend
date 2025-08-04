import useSpotifyPlayer from '@/features/spotify/hooks/useSpotifyPlayer';
import { formatDuration } from '@/features/track/utils/format';
import { useSpotifyStore } from '@/store/useSpotifyStore';
import { useTrackStore } from '@/store/useTrackStore';
import React from 'react';

export default function MusicProgressBar() {
  const { currentTime, isReady } = useSpotifyPlayer();
  const track = useTrackStore((state) => state.track);
  const player = useSpotifyStore((state) => state.player);

  const progress = (currentTime / (track?.duration_ms || 0)) * 100;

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!player || !track) return;

    const bar = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - bar.left;
    const ratio = clickX / bar.width;
    const seekMs = ratio * track.duration_ms;

    player.seek(seekMs);
  };

  if (!track) return null;
  return (
    <div className='space-y-2'>
      <div
        onClick={handleSeek}
        className='w-full bg-white/20 rounded-full h-2 cursor-pointer'
      >
        <div
          className={`bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full ${
            isReady ? 'transition-all duration-300' : ''
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className='flex justify-between text-sm text-white/60'>
        <span>{formatDuration(currentTime)}</span>
        <span>{formatDuration(track?.duration_ms)}</span>
      </div>
    </div>
  );
}
