import { ArrowLeft } from 'lucide-react';
import {
  getCategoryColor,
  getCategoryFromPath,
  getCategoryIcon,
} from '../utils/quiz';

interface Props {
  isSolving: boolean;
  move?: () => void;
  pathname: string;

  title: string;
}

export default function QuizHeader({
  isSolving,
  move,
  pathname,
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
      </div>

      <div className='w-12' />
    </div>
  );
}
