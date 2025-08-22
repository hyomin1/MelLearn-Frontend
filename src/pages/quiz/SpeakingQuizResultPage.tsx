import QuizLayout from '@/features/quiz/components/QuizLayout';
import useRank from '@/features/quiz/hooks/useRank';
import { useQuizStore } from '@/store/useQuizStore';
import { useNavigate, useParams } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

import SpeakingResult from '@/components/SpeakingResult';

const mockSpeakingComment = {
  createdTime: '2025-08-22T12:46:10.440197',
  id: 123,
  musicId: '1CPZ5BxNNd0n0nF4Orb9JS',
  submit:
    "I was a ghost I was alone in the darkness. Given the throne I don't know how to believe in myself anymore. I lived two lives, tried to play both sides but I couldn't find my own place in this world. Called a problem child cause I got too wild, but now that's how I'm getting paid. I'm done hiding now I'm shining like I'm born to be. We dreaming hard, we came so far, now I believe we're going up with our voices.",
  markedText: `I was a __ghost__ I was __alone__ in the __darkness__.
Given the __throne__ I don't know how to __believe__ in myself __anymore__.
I lived __two__ lives, tried to play both __sides__ but I couldn't find my own __place__ in this __world__.
Called a __problem__ child cause I got too __wild__, but now that's how I'm getting __paid__.
I'm done __hiding__ now I'm __shining__ like I'm __born__ to be.
We __dreaming__ hard, we came so __far__, now I __believe__ we're going __up__ with our __voices__.
영원히 깨질 수 없는 __golden__ moments that we'll __remember__ forever.
Together we're __glowing__, gonna be gonna be __golden__ in this __moment__.`,
  score: 68,
};

export default function SpeakingQuizResultPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { ranks, isLoading, error } = useRank(id || '');
  const speakingComment = useQuizStore((state) => state.speakingComment);

  if (isLoading) {
    return (
      <QuizLayout>
        <div className='flex items-center justify-center min-h-96'>
          <div className='text-white text-xl'>결과를 불러오는 중...</div>
        </div>
      </QuizLayout>
    );
  }

  if (error) {
    return (
      <QuizLayout>
        <div className='flex flex-col items-center justify-center min-h-96 text-center space-y-6'>
          <div className='bg-red-500/20 backdrop-blur-md rounded-2xl p-8 border border-red-400/30 max-w-md'>
            <AlertCircle className='w-16 h-16 text-red-400 mx-auto mb-4' />
            <h2 className='text-2xl font-bold text-white mb-3'>
              결과를 불러올 수 없습니다
            </h2>
            <p className='text-white/80 mb-6'>
              네트워크 연결을 확인하거나 잠시 후 다시 시도해주세요.
            </p>
            <div className='flex flex-col sm:flex-row gap-3 justify-center'>
              <button
                onClick={() => window.location.reload()}
                className='bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105'
              >
                다시 시도
              </button>
              <button
                onClick={() => navigate('/')}
                className='bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 border border-white/30'
              >
                홈으로 돌아가기
              </button>
            </div>
          </div>
        </div>
      </QuizLayout>
    );
  }

  return <SpeakingResult speakingComment={mockSpeakingComment} isNotMockExam />;
}
