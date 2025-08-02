import { ArrowLeft, Target } from 'lucide-react';
import React from 'react';
import {
  getCategoryColor,
  getCategoryFromPath,
  getCategoryIcon,
  getLevel,
  getLevelColor,
} from '../utils/quiz';

interface Props {
  isSolving: boolean;
  move?: () => void;
  pathname: string;
  level: number;
  title: string;
}

export default function QuizHeader({
  isSolving,
  move,
  pathname,
  level,
  title,
}: Props) {
  const category = getCategoryFromPath(pathname);
  const CategoryIcon = getCategoryIcon(category);
  const categoryColor = getCategoryColor(category);
  return (
    <div
      className={`flex items-center ${
        isSolving ? 'justify-between' : 'justify-center'
      } mb-8`}
    >
      {isSolving && (
        <button
          onClick={move}
          className='p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-110'
        >
          <ArrowLeft className='w-6 h-6 text-white' />
        </button>
      )}

      <div className='text-center'>
        <div className='flex items-center justify-center gap-3 mb-2'>
          <div className={`p-2 rounded-lg bg-gradient-to-r ${categoryColor}`}>
            <CategoryIcon className='w-6 h-6 text-white' />
          </div>
          <h1 className='text-2xl sm:text-3xl font-bold text-white'>{title}</h1>
        </div>
        <div className='flex items-center justify-center gap-2'>
          <Target className={`w-4 h-4 ${getLevelColor(level)}`} />
          <span className={`text-lg font-semibold ${getLevelColor(level)}`}>
            {getLevel(level)}
          </span>
        </div>
      </div>

      <div className='w-12' />
    </div>
  );
}
