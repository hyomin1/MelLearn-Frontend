import type { CommentData } from '@/features/quiz/types/quiz';
import { getScoreColor } from '@/features/quiz/utils/quiz';
import { Calendar } from 'lucide-react';

interface Props {
  history: CommentData;
  handleClick: (history: CommentData) => void;
}
export default function HistoryItem({ history, handleClick }: Props) {
  return (
    <button
      key={history.id}
      onClick={() => handleClick(history)}
      className='w-full bg-white/5 rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10 cursor-pointer text-left'
    >
      <div className='flex items-start justify-between'>
        <div className='flex items-start space-x-4'>
          <div className='flex-1 min-w-0'>
            <div className='flex items-center space-x-2 mb-1'>
              <h3 className='text-lg font-semibold text-white truncate'>
                {'트랙제목'}
              </h3>
              <span
                className={`px-2 py-1 rounded-full text-xs bg-gradient-to-r font-medium  ${getScoreColor(
                  history.score
                )}`}
              >
                {history.score.toFixed(0)}점
              </span>
            </div>

            <div className='flex items-center space-x-4 text-purple-300 text-xs'>
              <div className='flex items-center space-x-1'>
                <Calendar className='w-3 h-3' />
                <span>
                  {new Date(history.createdTime).toLocaleDateString('ko-KR')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
