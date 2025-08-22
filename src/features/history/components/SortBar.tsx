import type { SortOption, SortOrder } from '../types/history';
import { Calendar, Trophy, ArrowUp, ArrowDown } from 'lucide-react';

interface Props {
  sortOption: SortOption;
  sortOrder: SortOrder;
  onChange: (sortOption: SortOption) => void;
}

export default function SortBar({ sortOption, sortOrder, onChange }: Props) {
  return (
    <div className='flex items-center space-x-4'>
      <div className='flex items-center space-x-2'>
        <button
          onClick={() => onChange('date')}
          className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm transition-all duration-300 ${
            sortOption === 'date'
              ? 'bg-purple-500/30 text-white border border-purple-400/50'
              : 'bg-white/10 text-purple-200 hover:bg-white/20 hover:text-white'
          }`}
        >
          <Calendar className='w-3 h-3' />
          <span>날짜</span>
          {sortOption === 'date' &&
            (sortOrder === 'desc' ? (
              <ArrowDown className='w-3 h-3' />
            ) : (
              <ArrowUp className='w-3 h-3' />
            ))}
        </button>

        <button
          onClick={() => onChange('score')}
          className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm transition-all duration-300 ${
            sortOption === 'score'
              ? 'bg-purple-500/30 text-white border border-purple-400/50'
              : 'bg-white/10 text-purple-200 hover:bg-white/20 hover:text-white'
          }`}
        >
          <Trophy className='w-3 h-3' />
          <span>점수</span>
          {sortOption === 'score' &&
            (sortOrder === 'desc' ? (
              <ArrowDown className='w-3 h-3' />
            ) : (
              <ArrowUp className='w-3 h-3' />
            ))}
        </button>
      </div>
    </div>
  );
}
