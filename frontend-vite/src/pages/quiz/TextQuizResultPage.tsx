import { CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  getCategoryColor,
  getCategoryFromPath,
} from '@/features/quiz/utils/quiz';
import QuizHeader from '@/features/quiz/components/QuizHeader';
import QuizLayout from '@/features/quiz/components/QuizLayout';
import Comment from '@/features/quiz/components/Comment';
import ResultActionButton from '@/features/quiz/components/ResultActionButton';
import ScoreBoard from '@/features/quiz/components/ScoreBoard';
import ToggleButton from '@/features/quiz/components/ToggleButton';
import { useQuizStore } from '@/store/useQuizStore';

export default function TextQuizResultPage() {
  const [showDetails, setShowDetails] = useState(false);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams();

  const comment = useQuizStore((state) => state.comment);
  const category = getCategoryFromPath(pathname);
  const categoryColor = getCategoryColor(category);

  if (!comment) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center'>
        <div className='text-white text-xl'>결과를 불러오는 중...</div>
      </div>
    );
  }

  const { quizList, submitAnswerList, score } = comment;

  const { quizzes } = quizList;

  const correctCount = quizzes.filter(
    (quiz, idx) => quiz.answer === submitAnswerList[idx]
  ).length;
  const totalCount = quizzes.length;

  return (
    <QuizLayout>
      <QuizHeader
        isSolving={false}
        pathname={pathname}
        // level={level}
        title='퀴즈 결과'
      />

      <ScoreBoard
        score={score}
        correctCount={correctCount}
        totalCount={totalCount}
      />

      <ToggleButton
        onToggle={() => setShowDetails(!showDetails)}
        label={showDetails ? '상세 결과 숨기기' : '상세 결과 보기'}
        color={categoryColor}
      />

      {/* 상세 결과 */}
      {showDetails && (
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
                {/* 문제 헤더 */}
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

                {/* 선택지 */}
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

                <Comment comment={quiz.comment} />
              </div>
            );
          })}
        </div>
      )}
      <ResultActionButton
        onRetry={() => navigate(`/quiz/${category}/${id}`)}
        onGoHome={() => navigate('/')}
        color={categoryColor}
      />
    </QuizLayout>
  );
}
