import useSpotifyPlayer from '@/features/spotify/hooks/useSpotifyPlayer';
import TrackActionButton from '@/features/track/components/TrackActionButton';
import { useSpotifyStore } from '@/store/useSpotifyStore';
import { useTrackStore } from '@/store/useTrackStore';
import { Pause, Play } from 'lucide-react';

export default function AudioPlayer() {
  const track = useTrackStore((state) => state.track);
  const { play, pause } = useSpotifyPlayer();
  const isPlaying = useSpotifyStore((state) => state.isPlaying);
  const currentTrackId = useSpotifyStore((state) => state.currentTrackId);

  const isThisPlaying = currentTrackId === track?.id && isPlaying;
  if (!track) return null;
  return (
    <div className='flex justify-center mb-6'>
      {isThisPlaying ? (
        <TrackActionButton
          onClick={pause}
          Icon={Pause}
          buttonClass='p-4 rounded-full'
          iconClass='w-8 h-8'
        />
      ) : (
        <TrackActionButton
          onClick={() => play(track.id)}
          Icon={Play}
          buttonClass='p-4 rounded-full'
          iconClass='w-8 h-8'
        />
      )}
    </div>
  );
}
