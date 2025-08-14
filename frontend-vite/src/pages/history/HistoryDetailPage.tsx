import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Music } from 'lucide-react';
import useHistory from '@/features/history/hooks/useHistory';
import type { QuizType } from '@/features/history/types/history';
import type {
  Comment,
  ListeningComment,
  SpeakingComment,
} from '@/features/quiz/types/quiz';
import ListeningHistory from '@/features/history/components/ListeningHistory';
import SpeakingHistory from '@/features/history/components/SpeakingHistory';
import TextHistory from '@/features/history/components/TextHistory';
import SummaryCard from '@/features/history/components/SummaryCard';
import { getStats } from '@/features/history/utils/history';

export default function HistoryDetailPage() {
  const { quizType, id } = useParams();
  const {
    state: { page },
  } = useLocation();
  const navigate = useNavigate();

  const urlQuizType = quizType?.toUpperCase() as QuizType;
  const { history, isLoading, error } = useHistory(page, urlQuizType);
  const comment = history?.content.find((item) => item.id === Number(id));

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4' />
          <div className='text-white text-lg'>학습 기록을 불러오는 중...</div>
        </div>
      </div>
    );
  }

  if (!comment || error) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center'>
        <div className='text-center'>
          <div className='text-red-400 text-lg mb-4'>
            '학습 기록을 찾을 수 없습니다'
          </div>
          <button
            onClick={() => navigate('/history')}
            className='px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors'
          >
            히스토리로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  const stats = getStats(quizType?.toUpperCase() as QuizType, comment);

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900'>
      <div className='relative z-10 md:ml-0 lg:ml-20 xl:ml-64 transition-all duration-300'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-8'>
          <div className='mb-8'>
            <button
              onClick={() => navigate('/history')}
              className='flex items-center space-x-2 text-purple-200 hover:text-white transition-colors mb-4'
            >
              <ArrowLeft className='w-5 h-5' />
              <span>히스토리로 돌아가기</span>
            </button>
          </div>

          <SummaryCard
            score={comment.score}
            stats={stats}
            quizType={quizType?.toUpperCase() as QuizType}
          />

          {quizType !== 'LISTENING' &&
            quizType !== 'SPEAKING' &&
            (comment as Comment).quizList && (
              <div className='bg-white/5 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/10'>
                <h2 className='text-xl font-semibold text-white mb-4'>
                  학습 정보
                </h2>
                <div className='flex items-center space-x-4'>
                  <div className='p-3 bg-purple-500/20 rounded-lg'>
                    <Music className='w-8 h-8 text-purple-400' />
                  </div>
                  <div>
                    <div className='text-white font-semibold'>
                      Level {(comment as Comment).quizList.level}
                    </div>
                    <div className='text-purple-200'>
                      Music ID: {(comment as Comment).quizList.musicId}
                    </div>
                  </div>
                </div>
              </div>
            )}

          <div className='bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10'>
            <h2 className='text-xl font-semibold text-white mb-6'>
              문제별 상세 결과
            </h2>

            {quizType === 'LISTENING' ? (
              <ListeningHistory comment={comment as ListeningComment} />
            ) : quizType === 'SPEAKING' ? (
              <SpeakingHistory comment={comment as SpeakingComment} />
            ) : (
              <TextHistory comment={comment as Comment} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
