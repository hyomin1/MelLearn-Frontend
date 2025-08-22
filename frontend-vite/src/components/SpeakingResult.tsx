import QuizHeader from '@/features/quiz/components/QuizHeader';
import QuizLayout from '@/features/quiz/components/QuizLayout';
import ResultActionButton from '@/features/quiz/components/ResultActionButton';
import type { SpeakingComment } from '@/features/quiz/types/quiz';
import { getCategoryColor, getScoreColor } from '@/features/quiz/utils/quiz';
import {
  AlertCircle,
  CheckCircle,
  Music,
  Star,
  Trophy,
  Users,
  Volume2,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

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
interface Props {
  speakingComment: SpeakingComment;
  isNotMockExam?: boolean;
}

export default function SpeakingResult({
  speakingComment,
  isNotMockExam,
}: Props) {
  const { id } = useParams();
  const navigate = useNavigate();
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

  const totalWords = speakingComment.markedText.split(' ').length;
  const incorrectWords = (speakingComment.markedText.match(/__\w+__/g) || [])
    .length;
  const correctWords = totalWords - incorrectWords;
  const accuracy = Math.round((correctWords / totalWords) * 100);
  return (
    <QuizLayout>
      <QuizHeader isSolving={false} pathname='speaking' title='Speaking' />

      {/* 점수 및 랭킹 카드 */}
      <div className='bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-3xl p-8 border border-white/30 mb-8 shadow-2xl'>
        <div className='text-center space-y-6'>
          <div className='flex items-center justify-center gap-3'>
            <Volume2 className='text-purple-300 w-8 h-8' />
            <h2 className='text-3xl font-bold text-white'>결과</h2>
            <Volume2 className='text-purple-300 w-8 h-8' />
          </div>

          <div className='grid md:grid-cols-3 gap-6'>
            <div className='bg-white/10 rounded-2xl p-6 backdrop-blur-sm'>
              <div className='flex items-center justify-center mb-2'>
                <Star className='text-yellow-400 w-6 h-6 mr-2' />
                <h3 className='text-lg font-semibold text-white'>총점</h3>
              </div>
              <div
                className={`text-4xl font-bold bg-gradient-to-r ${getScoreColor(
                  speakingComment.score
                )} bg-clip-text text-transparent`}
              >
                {speakingComment.score}점
              </div>
            </div>

            <div className='bg-white/10 rounded-2xl p-6 backdrop-blur-sm'>
              <div className='flex items-center justify-center mb-2'>
                <Trophy className='text-yellow-400 w-6 h-6 mr-2' />
                <h3 className='text-lg font-semibold text-white'>순위</h3>
              </div>
              <div className='text-4xl font-bold text-yellow-400'>
                {currentUserRank?.rank}등
              </div>
            </div>

            <div className='bg-white/10 rounded-2xl p-6 backdrop-blur-sm'>
              <div className='flex items-center justify-center mb-2'>
                <CheckCircle className='text-green-400 w-6 h-6 mr-2' />
                <h3 className='text-lg font-semibold text-white'>정확도</h3>
              </div>
              <div className='text-4xl font-bold text-green-400'>
                {accuracy}%
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-8 mb-8'>
        {/* 발음 분석 결과 */}
        <div className='bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-xl'>
          <div className='flex items-center gap-3 mb-6'>
            <Music className='text-purple-400 w-6 h-6' />
            <h3 className='text-2xl font-bold text-white'>발음 분석</h3>
          </div>

          <div className='space-y-6'>
            {/* 통계 요약 */}
            <div className='bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl p-4 border border-purple-300/30'>
              <h4 className='text-purple-200 font-semibold mb-3 flex items-center gap-2'>
                <AlertCircle className='w-4 h-4' />
                발음 통계
              </h4>
              <div className='grid grid-cols-3 gap-4 text-sm'>
                <div className='text-center'>
                  <div className='text-green-400 font-bold text-lg'>
                    {correctWords}
                  </div>
                  <div className='text-white/70'>정확</div>
                </div>
                <div className='text-center'>
                  <div className='text-red-400 font-bold text-lg'>
                    {incorrectWords}
                  </div>
                  <div className='text-white/70'>부정확</div>
                </div>
                <div className='text-center'>
                  <div className='text-blue-400 font-bold text-lg'>
                    {totalWords}
                  </div>
                  <div className='text-white/70'>총 단어</div>
                </div>
              </div>
            </div>

            {/* 원본 텍스트 */}
            <div className='bg-white/5 rounded-xl p-4 border border-white/10'>
              <h4 className='text-purple-300 font-semibold mb-3 flex items-center gap-2'>
                <Volume2 className='w-4 h-4' />
                제출한 음성 내용
              </h4>
              <div className='text-white/90 leading-relaxed bg-gray-800/30 rounded-lg p-3'>
                {speakingComment.submit
                  .split('. ')
                  .map((sentence, index, array) => (
                    <div key={index} className='mb-2 last:mb-0'>
                      {sentence.trim()}
                      {index < array.length - 1 ? '.' : ''}
                    </div>
                  ))}
              </div>
            </div>

            {/* 분석 결과 */}
            <div className='bg-white/5 rounded-xl p-4 border border-white/10'>
              <h4 className='text-purple-300 font-semibold mb-3 flex items-center gap-2'>
                <CheckCircle className='w-4 h-4' />
                발음 정확도 분석
              </h4>
              <div className='leading-relaxed text-lg bg-gray-800/30 rounded-lg p-4'>
                {speakingComment.markedText
                  .split('\n')
                  .map((sentence: string, index: number) => (
                    <div key={index} className='sentence mb-3 last:mb-0'>
                      {sentence.split(/(\s+)/).map((part, wordIndex) => {
                        // 공백 처리
                        if (/\s/.test(part)) {
                          return <span key={wordIndex}>{part}</span>;
                        }

                        // __로 둘러싸인 단어 처리
                        if (part.includes('__')) {
                          const cleanWord = part.replace(/__/g, '');
                          if (cleanWord) {
                            return (
                              <span
                                key={wordIndex}
                                className='inline-flex items-center text-white bg-red-500 px-3 py-1 rounded-full mx-1 font-semibold text-sm shadow-lg transform hover:scale-105 transition-transform'
                                title='발음이 부정확한 단어'
                              >
                                {cleanWord}
                              </span>
                            );
                          }
                          return null;
                        }

                        // 일반 단어 처리
                        if (part.trim()) {
                          return (
                            <span key={wordIndex} className='text-white/90'>
                              {part}
                            </span>
                          );
                        }

                        return null;
                      })}
                    </div>
                  ))}
              </div>

              {/* 범례 */}
              <div className='mt-4 pt-4 border-t border-white/10'>
                <div className='flex items-center justify-center gap-6 text-sm'>
                  <div className='flex items-center gap-2'>
                    <span className='w-3 h-3 bg-white/90 rounded-full' />
                    <span className='text-white/70'>정확한 발음</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='w-3 h-3 bg-red-500 rounded-full'></span>
                    <span className='text-white/70'>부정확한 발음</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 랭킹 섹션 */}
        <div className='bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-xl'>
          <div className='flex items-center gap-3 mb-6'>
            <Users className='text-yellow-400 w-6 h-6' />
            <h3 className='text-2xl font-bold text-white'>전체 랭킹</h3>
          </div>

          <div className='space-y-4'>
            {sortedRanks.map((item) => (
              <div
                key={item.username}
                className={`group flex items-center justify-between p-4 rounded-2xl transition-all duration-300 ${
                  item.isCurrentUser
                    ? 'bg-gradient-to-r from-purple-500/40 to-pink-500/40 border-2 border-purple-400/60 shadow-lg transform scale-105'
                    : 'bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/30'
                }`}
              >
                <div className='flex items-center gap-4'>
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm shadow-lg ${
                      item.rank === 1
                        ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900'
                        : item.rank === 2
                        ? 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-900'
                        : item.rank === 3
                        ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-orange-900'
                        : 'bg-white/20 text-white border border-white/30'
                    }`}
                  >
                    {item.rank}
                  </div>
                  <div>
                    <span
                      className={`font-semibold text-lg ${
                        item.isCurrentUser ? 'text-purple-200' : 'text-white'
                      }`}
                    >
                      {item.isCurrentUser ? '나' : `사용자${item.rank}`}
                    </span>
                    {item.isCurrentUser && (
                      <div className='text-purple-300 text-sm'>현재 사용자</div>
                    )}
                  </div>
                </div>

                <div className='text-right'>
                  <div
                    className={`text-2xl font-bold bg-gradient-to-r ${getScoreColor(
                      item.score
                    )} bg-clip-text text-transparent`}
                  >
                    {item.score}점
                  </div>
                  {item.rank <= 3 && (
                    <div className='flex justify-end mt-1'>
                      {item.rank === 1 && (
                        <Trophy className='w-4 h-4 text-yellow-400' />
                      )}
                      {item.rank === 2 && (
                        <Trophy className='w-4 h-4 text-gray-400' />
                      )}
                      {item.rank === 3 && (
                        <Trophy className='w-4 h-4 text-orange-400' />
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {isNotMockExam && (
        <ResultActionButton
          onRetry={() => navigate(`/quiz/speaking/${id}`)}
          onGoHome={() => navigate('/')}
          color={categoryColor}
        />
      )}
    </QuizLayout>
  );
}
