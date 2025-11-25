import { Volume2, X, VolumeOff } from 'lucide-react';
import { useState } from 'react';
import type { Lyric } from '../types/track';
import type { Track } from '@/features/home/types/home';
import { useSpotifyStore } from '@/store/useSpotifyStore';
import useSpotifyPlayer from '@/features/spotify/hooks/useSpotifyPlayer';
import SyncedLyrics from './SyncedLyrics';
import HeroImage from '@/components/HeroImage';
import MusicProgressBar from '@/components/MusicProgressBar';
import AudioPlayer from '@/components/AudioPlayer';

interface Props {
  track: Track;
  onClose: () => void;
  lyrics?: Lyric[];
}

export default function MusicPlayer({ track, onClose, lyrics }: Props) {
  const [volume, setVolume] = useState(70);

  const player = useSpotifyStore((state) => state.player);
  const { getInterpolatedTime } = useSpotifyPlayer();

  const artistNames = track.artists.map((artist) => artist.name).join(', ');

  const handleLyricClick = (time: number) => {
    if (!player) return;
    player.seek(time * 1000);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    player?.setVolume(newVolume / 100);
  };

  return (
    <div className='space-y-10'>
      <div className='flex justify-end'>
        <button
          onClick={onClose}
          className='p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors'
        >
          <X className='w-6 h-6 text-white' />
        </button>
      </div>

      <div className='flex flex-col lg:flex-row gap-8'>
        <HeroImage src={track.album.images?.[0]?.url} alt={track.album.name} />

        <SyncedLyrics
          lyrics={lyrics}
          getCurrentTime={getInterpolatedTime}
          onLyricClick={handleLyricClick}
        />
      </div>
      <div className='space-y-6'>
        <div className='text-center'>
          <h2 className='text-3xl font-bold text-white mb-2 truncate'>
            {track.name}
          </h2>
          <p className='text-xl text-white/70 mb-4 truncate'>{artistNames}</p>
        </div>
        <MusicProgressBar />

        <AudioPlayer />

        <div className='flex justify-end'>
          <div className='flex items-center gap-3'>
            {volume === 0 ? (
              <VolumeOff className='w-5 h-5 text-white/70' />
            ) : (
              <Volume2 className='w-5 h-5 text-white/70' />
            )}

            <input
              type='range'
              min={0}
              max={100}
              step={1}
              value={volume}
              onChange={handleVolumeChange}
              className='w-24 accent-white/90 cursor-pointer'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
