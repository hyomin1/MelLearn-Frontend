import QuizHeader from '@/features/quiz/components/QuizHeader';
import QuizLayout from '@/features/quiz/components/QuizLayout';
import ResultActionButton from '@/features/quiz/components/ResultActionButton';
import ScoreBoard from '@/features/quiz/components/ScoreBoard';
import { parseListeningText } from '@/features/quiz/utils/parseListeningText';
import { getCategoryColor } from '@/features/quiz/utils/quiz';
import { useQuizStore } from '@/store/useQuizStore';
import { useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export default function ListeningQuizResultPage() {
  const listeningComment = useQuizStore((state) => state.listeningComment);

  const parsedText = useMemo(() => {
    return parseListeningText({
      blankedText: listeningComment?.listeningQuiz?.blankedText,
      answerList: listeningComment?.listeningQuiz?.answerList ?? [],
      userAnswerList: listeningComment?.submitAnswerList ?? [],
    });
  }, [listeningComment]);
  const categoryColor = getCategoryColor('listening');
  const navigate = useNavigate();
  const { id } = useParams();

  // 정답/오답 체크
  const isAnswerCorrect = (userAnswer?: string, correctAnswer?: string) => {
    return (
      userAnswer?.toLowerCase().trim() === correctAnswer?.toLowerCase().trim()
    );
  };

  const totalCount = listeningComment?.listeningQuiz?.answerList?.length || 0;
  const correctCount = listeningComment?.submitAnswerList?.filter(
    (answer, index) =>
      isAnswerCorrect(
        answer,
        listeningComment?.listeningQuiz?.answerList[index]
      )
  ).length;
  const { pathname } = useLocation();
  const score = Number(listeningComment?.score.toFixed(0));
  if (!listeningComment) {
    return (
      <QuizLayout>
        <div className='text-center text-white'>
          <p>결과 데이터를 불러오는 중...</p>
        </div>
      </QuizLayout>
    );
  }
  return (
    <QuizLayout>
      <QuizHeader isSolving={false} pathname={pathname} title='Listening' />

      <ScoreBoard
        score={score}
        totalCount={totalCount}
        correctCount={correctCount || 0}
      />

      {/* 상세 결과 */}
      <div className='bg-white/5 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-white/10 mb-8'>
        {/* 텍스트 결과 표시 */}
        <div className='bg-white/5 rounded-xl p-6 border border-white/10 mb-6'>
          <div className='space-y-3 leading-relaxed text-lg'>
            {parsedText.map((item, idx) => (
              <span key={idx} className='inline'>
                {item.type === 'blank' ? (
                  <span
                    className={`inline-block mx-1 px-3 py-2 rounded-lg font-medium border-2 ${
                      isAnswerCorrect(item.userAnswer, item.correctAnswer)
                        ? 'bg-green-500/20 text-green-300 border-green-500/50'
                        : 'bg-red-500/20 text-red-300 border-red-500/50'
                    }`}
                  >
                    {item.userAnswer || '(답안 없음)'}
                    {!isAnswerCorrect(item.userAnswer, item.correctAnswer) && (
                      <span className='text-green-300 ml-2 text-sm'>
                        → {item.correctAnswer}
                      </span>
                    )}
                  </span>
                ) : (
                  <span className='text-white/90'>{item.content}</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* 문제별 결과 */}
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold text-white mb-4'>문제별 결과</h3>
          {parsedText
            .filter((item) => item.type === 'blank')
            .map((blank, idx) => (
              <div
                key={blank.id}
                className={`p-4 rounded-lg border-2 ${
                  isAnswerCorrect(blank.userAnswer, blank.correctAnswer)
                    ? 'bg-green-500/10 border-green-500/30'
                    : 'bg-red-500/10 border-red-500/30'
                }`}
              >
                <div className='flex items-center justify-between mb-2'>
                  <span className='text-white font-medium'>문제 {idx + 1}</span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      isAnswerCorrect(blank.userAnswer, blank.correctAnswer)
                        ? 'bg-green-500/20 text-green-300'
                        : 'bg-red-500/20 text-red-300'
                    }`}
                  >
                    {isAnswerCorrect(blank.userAnswer, blank.correctAnswer)
                      ? '정답'
                      : '오답'}
                  </span>
                </div>

                <div className='space-y-2'>
                  <div className='flex gap-4'>
                    <span className='text-white/70 w-20'>내 답안:</span>
                    <span
                      className={`font-medium ${
                        isAnswerCorrect(blank.userAnswer, blank.correctAnswer)
                          ? 'text-green-300'
                          : 'text-red-300'
                      }`}
                    >
                      {blank.userAnswer || '(답안 없음)'}
                    </span>
                  </div>
                  {!isAnswerCorrect(blank.userAnswer, blank.correctAnswer) && (
                    <div className='flex gap-4'>
                      <span className='text-white/70 w-20'>정답:</span>
                      <span className='text-green-300 font-medium'>
                        {blank.correctAnswer}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>

      <ResultActionButton
        onRetry={() => navigate(`/quiz/listening/${id}`)}
        onGoHome={() => navigate('/')}
        color={categoryColor}
      />
    </QuizLayout>
  );
}
