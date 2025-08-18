import { useParams, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/services/router';
import useSpotifyCleanUp from '@/features/spotify/hooks/useSpotifyCleanUp';
import useSpotifyPlayer from '@/features/spotify/hooks/useSpotifyPlayer';
import useTrack from '@/features/track/hooks/useTrack';
import useLyric from '@/features/track/hooks/useLyric';
import { useMockExamStore } from '@/store/useMockExamStore';
import QuizLayout from '@/features/quiz/components/QuizLayout';
import QuizPlayer from '@/features/quiz/components/QuizPlayer';
import SpeakingSyncedLyrics from '@/features/quiz/components/SpeakingSyncedLyrics';
import useAudioRecorder from '@/features/quiz/hooks/useAudioRecorder';

export default function MockExamSpeakingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  useSpotifyCleanUp();

  const { track } = useTrack(id || '');
  const { currentTimeRef } = useSpotifyPlayer();

  const { lyrics } = useLyric(track);
  const mockExam = useMockExamStore((state) => state.mockExam);
  const setMockExamProgress = useMockExamStore(
    (state) => state.setMockExamProgress
  );
  const { isRecording, stopRecording, startRecording } = useAudioRecorder(
    id || '',
    lyrics || []
  );

  if (!mockExam || !track || !lyrics) {
    return (
      <QuizLayout>
        <div className='text-center text-white'>
          <p>모의고사 데이터를 찾을 수 없습니다.</p>
          <button
            onClick={() => navigate(ROUTES.MOCK_EXAM(id || ''))}
            className='mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl'
          >
            돌아가기
          </button>
        </div>
      </QuizLayout>
    );
  }

  const handleComplete = (submitText: string) => {
    // setMockExamProgress('speaking', { completed: true, submitText });
    navigate(ROUTES.MOCK_EXAM(id || ''));
  };

  return (
    <QuizLayout>
      <QuizPlayer track={track} />
      <button
        className='px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl mr-4'
        onClick={startRecording}
        disabled={isRecording}
      >
        녹음 시작
      </button>

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
