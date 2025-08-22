import type { Comment } from '@/features/quiz/types/quiz';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';
interface Props {
  comment: Comment;
}

export default function TextHistory({ comment }: Props) {
  const { quizList, submitAnswerList } = comment;
  return (
    <div className='space-y-6'>
      {quizList.quizzes.map((quiz, index) => {
        const userAnswerIndex = submitAnswerList[index];
        const isCorrect = userAnswerIndex === quiz.answer;

        return (
          <div
            key={quiz.id}
            className='bg-white/5 rounded-xl p-4 border border-white/10'
          >
            <div className='flex items-start justify-between mb-3'>
              <div className='flex items-center space-x-3'>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isCorrect ? 'bg-green-500/20' : 'bg-red-500/20'
                  }`}
                >
                  {isCorrect ? (
                    <CheckCircle className='w-5 h-5 text-green-400' />
                  ) : (
                    <XCircle className='w-5 h-5 text-red-400' />
                  )}
                </div>
                <span className='text-white font-medium'>문제 {index + 1}</span>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  isCorrect
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-red-500/20 text-red-400'
                }`}
              >
                {isCorrect ? '정답' : '오답'}
              </span>
            </div>

            <div className='mb-4'>
              <h3 className='text-white font-medium mb-3'>{quiz.question}</h3>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-2 mb-3'>
                {quiz.optionList.map((option, optionIndex) => {
                  const isUserAnswer = optionIndex === userAnswerIndex;
                  const isCorrectAnswer = optionIndex === quiz.answer;

                  let optionClass = 'bg-white/5 text-purple-200';
                  if (isCorrectAnswer) {
                    optionClass =
                      'bg-green-500/20 text-green-400 border border-green-400/50';
                  } else if (isUserAnswer && !isCorrect) {
                    optionClass =
                      'bg-red-500/20 text-red-400 border border-red-400/50';
                  }

                  return (
                    <div
                      key={optionIndex}
                      className={`p-3 rounded-lg ${optionClass}`}
                    >
                      <div className='flex items-center space-x-2'>
                        <span className='text-sm font-medium'>
                          {String.fromCharCode(65 + optionIndex)}.
                        </span>
                        <span className='flex-1'>{option}</span>
                        {isCorrectAnswer && (
                          <CheckCircle className='w-4 h-4 text-green-400' />
                        )}
                        {isUserAnswer && !isCorrect && (
                          <XCircle className='w-4 h-4 text-red-400' />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 해설 */}
            {quiz.comment && (
              <div className='bg-blue-500/10 rounded-lg p-3 border border-blue-400/30'>
                <div className='flex items-start space-x-2'>
                  <AlertCircle className='w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0' />
                  <div>
                    <span className='text-blue-400 text-sm font-medium'>
                      해설:{' '}
                    </span>
                    <span className='text-purple-200 text-sm'>
                      {quiz.comment}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* 정답률 표시 */}
            <div className='mt-3 text-right'>
              <span className='text-purple-300 text-xs'>
                정답률: {quiz.correctRate.toFixed(0)}%
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
