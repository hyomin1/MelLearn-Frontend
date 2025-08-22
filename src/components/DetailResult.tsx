import CommentComponent from '@/features/quiz/components/Comment';
import type { Comment } from '@/features/quiz/types/quiz';
import { CheckCircle, XCircle } from 'lucide-react';
interface Props {
  comment: Comment;
  categoryColor: string;
}

export default function DetailResult({ comment, categoryColor }: Props) {
  const { quizList, submitAnswerList } = comment;
  const { quizzes } = quizList;
  return (
    <div className='space-y-6 mb-8'>
      {quizzes.map((quiz, idx) => {
        const userAnswer = submitAnswerList[idx];
        const correctAnswer = quiz.answer;
        const isCorrect = userAnswer === correctAnswer;

        return (
          <div
            key={quiz.id}
            className='bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10'
          >
            <div className='flex items-start gap-4 mb-6'>
              <div
                className={`flex-shrink-0 p-2 rounded-lg ${
                  isCorrect ? 'bg-green-500/20' : 'bg-red-500/20'
                }`}
              >
                {isCorrect ? (
                  <CheckCircle className='w-6 h-6 text-green-400' />
                ) : (
                  <XCircle className='w-6 h-6 text-red-400' />
                )}
              </div>
              <div className='flex-1'>
                <div className='flex items-center gap-2 mb-2'>
                  <span
                    className={`text-xl font-bold bg-gradient-to-r ${categoryColor} bg-clip-text text-transparent`}
                  >
                    Q{idx + 1}.
                  </span>
                  <span
                    className={`text-sm font-semibold px-2 py-1 rounded ${
                      isCorrect
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {isCorrect ? '정답' : '오답'}
                  </span>
                </div>
                <h3 className='text-lg font-semibold text-white mb-4'>
                  {quiz.question}
                </h3>
              </div>
            </div>

            <div className='space-y-3 mb-6'>
              {quiz.optionList.map((option, optionIdx) => {
                const optionNumber = optionIdx + 1;
                const isUserChoice = userAnswer === optionNumber;
                const isCorrectChoice = correctAnswer === optionNumber;

                let optionStyle = 'bg-white/5 border-white/10';
                if (isCorrectChoice) {
                  optionStyle = 'bg-green-500/20 border-green-400/50';
                } else if (isUserChoice && !isCorrect) {
                  optionStyle = 'bg-red-500/20 border-red-400/50';
                }

                return (
                  <div
                    key={optionIdx}
                    className={`flex items-center gap-3 p-4 rounded-lg border ${optionStyle}`}
                  >
                    <span className='text-white/70 font-semibold'>
                      {optionNumber}.
                    </span>
                    <span className='text-white flex-1'>{option}</span>
                    {isCorrectChoice && (
                      <CheckCircle className='w-5 h-5 text-green-400' />
                    )}
                    {isUserChoice && !isCorrect && (
                      <XCircle className='w-5 h-5 text-red-400' />
                    )}
                  </div>
                );
              })}
            </div>

            <CommentComponent comment={quiz.comment} />
          </div>
        );
      })}
    </div>
  );
}
