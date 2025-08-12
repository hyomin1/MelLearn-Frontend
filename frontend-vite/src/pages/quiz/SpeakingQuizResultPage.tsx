import QuizLayout from '@/features/quiz/components/QuizLayout';
import useRank from '@/features/quiz/hooks/useRank';
import { useQuizStore } from '@/store/useQuizStore';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Trophy, Star, Users, Music } from 'lucide-react';
import QuizHeader from '@/features/quiz/components/QuizHeader';
import { getCategoryColor, getScoreColor } from '@/features/quiz/utils/quiz';
import ResultActionButton from '@/features/quiz/components/ResultActionButton';

const mockRanks = {
  id: 1,
  musicId: 'track123',
  score_list: {
    user1: 95,
    user2: 87,
    user3: 82,
    currentUser: 78,
    user4: 65,
  },
};

const mockSpeakingComment = {
  id: 1,
  musicId: 'track123',
  submit: '사용자가 제출한 음성 텍스트입니다',
  markedText: '사용자가 제출한 **음성** 텍스트입니다',
  score: 78,
  createdTime: '2025-08-12T06:10:24.765Z',
};

export default function SpeakingQuizResultPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { ranks, isLoading, error } = useRank(id || '');
  const speakingComment = useQuizStore((state) => state.speakingComment);
  const { pathname } = useLocation();
  const categoryColor = getCategoryColor('speaking');

  const sortedRanks = Object.entries(mockRanks.score_list)
    .sort(([, a], [, b]) => b - a)
    .map(([username, score], index) => ({
      rank: index + 1,
      username,
      score,
      isCurrentUser: username === 'currentUser',
    }));

  const currentUserRank = sortedRanks.find((item) => item.isCurrentUser);

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
        <div className='text-center text-white'>
          <p>결과를 불러올 수 없습니다.</p>
        </div>
      </QuizLayout>
    );
  }

  return (
    <QuizLayout>
      <QuizHeader isSolving={false} pathname={pathname} title='Speaking' />

      {/* 내 점수 카드 */}
      <div className='bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 mb-6'>
        <div className='text-center space-y-6'>
          <div className='flex items-center justify-center gap-4'>
            <Star className='text-yellow-400 w-8 h-8' />
            <h2 className='text-2xl font-bold text-white'>내 점수</h2>
            <Star className='text-yellow-400 w-8 h-8' />
          </div>

          <div
            className={`text-6xl font-bold bg-gradient-to-r ${getScoreColor(
              mockSpeakingComment.score
            )} bg-clip-text text-transparent`}
          >
            {mockSpeakingComment.score}점
          </div>

          <div className='flex items-center justify-center  text-white/80'>
            <Trophy className='w-5 h-5 text-yellow-400' />
            <span>순위: {currentUserRank?.rank}등</span>
          </div>
        </div>
      </div>

      <div className='grid lg:grid-cols-2 gap-8 mb-6'>
        <div className='bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20'>
          <h3 className='text-xl font-bold text-white mb-4 flex items-center gap-2'>
            <Music className='text-purple-400' />
            제출한 내용
          </h3>

          <div className='space-y-4'>
            <div className='bg-white/5 rounded-lg p-4'>
              <h4 className='text-purple-300 font-medium mb-2'>원본 텍스트</h4>
              <p className='text-white/90 leading-relaxed'>
                {mockSpeakingComment.submit}
              </p>
            </div>

            <div className='bg-white/5 rounded-lg p-4'>
              <h4 className='text-purple-300 font-medium mb-2'>분석 결과</h4>
              <div
                className='text-white/90 leading-relaxed'
                dangerouslySetInnerHTML={{
                  __html: mockSpeakingComment.markedText.replace(
                    /\*\*(.*?)\*\*/g,
                    '<span class="bg-yellow-500/30 text-yellow-200 px-1 rounded">$1</span>'
                  ),
                }}
              />
            </div>
          </div>
        </div>

        <div className='bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20'>
          <h3 className='text-xl font-bold text-white mb-4 flex items-center gap-2'>
            <Users className='text-purple-400' />
            전체 랭킹
          </h3>

          <div className='space-y-3'>
            {sortedRanks.map((item) => (
              <div
                key={item.username}
                className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                  item.isCurrentUser
                    ? 'bg-purple-500/30 border border-purple-400/50'
                    : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                <div className='flex items-center gap-3'>
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full font-bold ${
                      item.rank === 1
                        ? 'bg-yellow-500 text-yellow-900'
                        : item.rank === 2
                        ? 'bg-gray-400 text-gray-900'
                        : item.rank === 3
                        ? 'bg-orange-600 text-orange-100'
                        : 'bg-white/20 text-white'
                    }`}
                  >
                    {item.rank}
                  </div>
                  <span
                    className={`font-medium ${
                      item.isCurrentUser ? 'text-purple-200' : 'text-white'
                    }`}
                  >
                    {item.isCurrentUser ? '나' : `사용자${item.rank}`}
                  </span>
                </div>

                <p
                  className={`font-bold bg-gradient-to-r ${getScoreColor(
                    item.score
                  )} bg-clip-text text-transparent`}
                >
                  {item.score}점
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ResultActionButton
        onRetry={() => navigate(`/quiz/speaking/${id}`)}
        onGoHome={() => navigate('/')}
        color={categoryColor}
      />
    </QuizLayout>
  );
}
