import React from 'react';
import type { QuizType } from '../types/history';
import { getScoreColor } from '@/features/quiz/utils/quiz';
interface Props {
  score: number;
  stats: {
    accuracy: number;
    correctAnswers: number;
    totalQuestions: number;
  };
  quizType?: QuizType;
}

export default function SummaryCard({ score, stats, quizType }: Props) {
  return (
    <div className='bg-white/5 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/10'>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        <div className='text-center'>
          <div className={`text-3xl font-bold  ${getScoreColor(score)}`}>
            {score}점
          </div>
          <div className='text-purple-200 text-sm'>총 점수</div>
        </div>
        <div className='text-center'>
          <div className='text-3xl font-bold text-white'>{stats.accuracy}%</div>
          <div className='text-purple-200 text-sm'>정답률</div>
        </div>
        <div className='text-center'>
          <div className='text-3xl font-bold text-white'>
            {stats.correctAnswers}/{stats.totalQuestions}
          </div>
          <div className='text-purple-200 text-sm'>정답/총 문제</div>
        </div>
        <div className='text-center'>
          <div className='text-3xl font-bold text-white'>{quizType}</div>
          <div className='text-purple-200 text-sm'>학습 유형</div>
        </div>
      </div>
    </div>
  );
}
