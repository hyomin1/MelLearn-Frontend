import { useParams, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/services/router';
import type { MockExam } from '@/features/mock-exam/types/mockExam';
import { useState } from 'react';
import QuizLayout from '@/features/quiz/components/QuizLayout';
import ProgressBar from '@/features/quiz/components/ProgressBar';
import { getCategoryColor } from '@/features/quiz/utils/quiz';
import QuizCard from '@/features/quiz/components/QuizCard';
import { useMockExamStore } from '@/store/useMockExamStore';

export default function MockExamGrammarPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const mockExam = useMockExamStore((state) => state.mockExam);
  const { grammarQuiz } = mockExam as MockExam;
  const quizLen = grammarQuiz.quizzes.length;
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const mockExamProgress = useMockExamStore((state) => state.mockExamProgress);
  const answers = mockExamProgress.grammar.answers as number[];
  const [isLast, setIsLast] = useState(false);
  const categoryColor = getCategoryColor('grammar');

  const setMockExamProgress = useMockExamStore(
    (state) => state.setMockExamProgress
  );

  const onChangeAnswer = (answer: number) => {
    if (answer === undefined) {
      return;
    }
    const newArr = [...answers];
    newArr[index] = answer;
    setMockExamProgress('grammar', { completed: true, answers: newArr });
  };

  const handleNextProblem = () => {
    if (index <= quizLen - 2) {
      setIndex(index + 1);
      setProgress(((index + 1) / quizLen) * 100);
    }
    if (index === quizLen - 1) {
      setIsLast(true);
    }
  };
  const handleComplete = () => {
    setMockExamProgress('grammar', { completed: true, answers });
    navigate(ROUTES.MOCK_EXAM(id || ''));
  };
  const currentQuiz = grammarQuiz.quizzes[index];
  if (!mockExam) {
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

  return (
    <QuizLayout>
      <ProgressBar
        index={index}
        length={quizLen}
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

      <div className='flex justify-center'>
        <button
          onClick={isLast ? handleComplete : handleNextProblem}
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
          {grammarQuiz.quizzes.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setIndex(idx);
                setProgress((idx / quizLen) * 100);
                setIsLast(idx === quizLen - 1);
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
