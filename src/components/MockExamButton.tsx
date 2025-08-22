import { Book } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useMockExam from '@/features/mock-exam/hooks/useMockExam';
import useLyric from '@/features/track/hooks/useLyric';
import useTrack from '@/features/track/hooks/useTrack';
import { ROUTES } from '@/services/router';

interface Props {
  trackId: string;
}

export default function MockExamButton({ trackId }: Props) {
  const navigate = useNavigate();
  const { track } = useTrack(trackId);
  const { plainLyrics } = useLyric(track);
  const { create } = useMockExam(plainLyrics, trackId);

  const handleMockExamClick = () => {
    create();

    navigate(ROUTES.MOCK_EXAM(trackId));
  };

  return (
    <button
      onClick={handleMockExamClick}
      className='flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 border border-white/20'
    >
      <Book className='w-5 h-5' />
      <span>모의고사</span>
    </button>
  );
}
