import ProgressBar from '@/features/quiz/components/ProgressBar';
import QuizCard from '@/features/quiz/components/QuizCard';
import QuizHeader from '@/features/quiz/components/QuizHeader';
import QuizLayout from '@/features/quiz/components/QuizLayout';
import { mockQuiz } from '@/features/quiz/constants/quiz';
import useQuiz from '@/features/quiz/hooks/useQuiz';
import {
  getCategoryColor,
  getCategoryFromPath,
} from '@/features/quiz/utils/quiz';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useParams } from 'react-router-dom';

export default function TextQuizPage() {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [answers, setAnswers] = useState(
    new Array(mockQuiz.quizzes.length).fill(0)
  );
  const [isLast, setIsLast] = useState(false);

  const { pathname } = useLocation();
  const { id } = useParams();

  const { submit, quiz } = useQuiz(id || '');

  const category = getCategoryFromPath(pathname);
  const categoryColor = getCategoryColor(category);

  const onChangeAnswer = (answer: number) => {
    if (answer === undefined) {
      return;
    }
    const newArr = [...answers];
    newArr[index] = answer;
    setAnswers(newArr);
  };

  const handleNextProblem = () => {
    if (index <= mockQuiz.quizzes.length - 2) {
      setIndex(index + 1);
      setProgress(((index + 1) / mockQuiz.quizzes.length) * 100);
    }
    if (index === mockQuiz.quizzes.length - 1) {
      setIsLast(true);
    }
  };

  const submitProblem = async () => {
    const hasZeroAnswer = answers.some((answer) => answer === 0);
    if (hasZeroAnswer) {
      toast.error('풀지 않은 문제가 있습니다.');
    } else {
      submit({ category, answers });
    }
  };

  const move = () => {
    if (index === 0) {
      return;
    }
    setIndex(index - 1);
    setProgress((index / mockQuiz.quizzes.length) * 100);
    setIsLast(false);
  };

  const currentQuiz = mockQuiz.quizzes[index];

  return (
    <QuizLayout>
      <QuizHeader
        isSolving
        move={move}
        pathname={pathname}
        level={mockQuiz.level}
        title={category.charAt(0).toUpperCase() + category.slice(1)}
      />

      <ProgressBar
        index={index}
        length={mockQuiz.quizzes.length}
        progress={progress}
        color={categoryColor}
      />
      <QuizCard
        color={categoryColor}
        index={index}
        quiz={currentQuiz}
        selected={answers[index]}
        onClick={onChangeAnswer}
      />

      {/* 하단 버튼 */}
      <div className='flex justify-center'>
        <button
          onClick={isLast ? submitProblem : handleNextProblem}
          disabled={answers[index] === 0}
          className={`px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 ${
            answers[index] === 0
              ? 'bg-white/10 text-white/50 cursor-not-allowed'
              : `bg-gradient-to-r ${categoryColor} text-white hover:shadow-2xl hover:scale-105 active:scale-95`
          }`}
        >
          {isLast ? '결과 확인' : '다음 문제'}
        </button>
      </div>

      <div className='mt-8 flex justify-center'>
        <div className='flex gap-2'>
          {mockQuiz.quizzes.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setIndex(idx);
                setProgress((idx / mockQuiz.quizzes.length) * 100);
                setIsLast(idx === mockQuiz.quizzes.length - 1);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                idx === index
                  ? `bg-gradient-to-r ${categoryColor} shadow-lg`
                  : answers[idx] === 0
                  ? 'bg-white/20 hover:bg-white/40'
                  : 'bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>
    </QuizLayout>
  );
}
