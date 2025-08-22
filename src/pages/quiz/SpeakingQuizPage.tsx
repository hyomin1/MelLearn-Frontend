import QuizLayout from '@/features/quiz/components/QuizLayout';
import { useLocation, useParams } from 'react-router-dom';
import useLyric from '@/features/track/hooks/useLyric';
import QuizHeader from '@/features/quiz/components/QuizHeader';
import useSpotifyCleanUp from '@/features/spotify/hooks/useSpotifyCleanUp';
import QuizPlayer from '@/features/quiz/components/QuizPlayer';
import SpeakingSyncedLyrics from '@/features/quiz/components/SpeakingSyncedLyrics';
import useSpotifyPlayer from '@/features/spotify/hooks/useSpotifyPlayer';
import useAudioRecorder from '@/features/quiz/hooks/useAudioRecorder';
import useTrack from '@/features/track/hooks/useTrack';

export default function SpeakingQuizPage() {
  const { pathname } = useLocation();
  const { id } = useParams();
  const { track } = useTrack(id || '');
  const { currentTimeRef, play } = useSpotifyPlayer();

  const { lyrics } = useLyric(track);

  useSpotifyCleanUp();

  const { isRecording, stopRecording, startRecording } = useAudioRecorder(
    id || '',
    lyrics || []
  );
  const startRecordAndPlay = () => {
    if (!id) {
      return;
    }
    startRecording();
    play(id);
  };
  if (!track || !lyrics) return null;
  return (
    <QuizLayout>
      <QuizHeader isSolving pathname={pathname} title='Speaking' />

      <QuizPlayer
        track={track}
        handlePlay={startRecordAndPlay}
        isRecording={isRecording}
        isSpeaking
      />

      <SpeakingSyncedLyrics
        lyrics={lyrics}
        getCurrentTime={() => currentTimeRef.current}
      />

      <div className='text-center mb-6'>
        <button
          className='px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed'
          disabled={!isRecording}
          onClick={stopRecording}
        >
          녹음 완료 및 제출
        </button>
      </div>
    </QuizLayout>
  );
}
