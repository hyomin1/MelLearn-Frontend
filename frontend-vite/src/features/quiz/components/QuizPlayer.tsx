import AudioPlayer from '@/components/AudioPlayer';
import MusicProgressBar from '@/components/MusicProgressBar';
import type { Track } from '@/features/home/types/home';

interface Props {
  track: Track;
}

export default function QuizPlayer({ track }: Props) {
  const artistNames = track?.artists.map((artist) => artist.name).join(', ');

  return (
    <div className='bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 mb-8'>
      <div className='text-center'>
        <h2 className='text-3xl font-bold text-white mb-2 truncate'>
          {track.name}
        </h2>
        <p className='text-xl text-white/70 mb-4 truncate'>{artistNames}</p>

        <AudioPlayer />
        <MusicProgressBar />
      </div>
    </div>
  );
}
