import { CheckCircle, Circle } from 'lucide-react';

interface Props {
  index: number;
  label: string;
  isSelected: boolean;
  color: string;
  onClick: () => void;
}

export default function QuizOptionItem({
  index,
  label,
  isSelected,
  color,
  onClick,
}: Props) {
  return (
    <div
      onClick={onClick}
      className={`group flex items-center gap-4 p-5 rounded-xl cursor-pointer transition-all duration-300 ${
        isSelected
          ? `bg-gradient-to-r ${color.replace(
              'to-',
              'to-opacity-20 '
            )} border border-white/30`
          : 'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20'
      }`}
    >
      <div className='flex-shrink-0'>
        {isSelected ? (
          <CheckCircle className='w-6 h-6 text-white' />
        ) : (
          <Circle className='w-6 h-6 text-white/40 group-hover:text-white/60' />
        )}
      </div>

      <div className='flex-1'>
        <div className='flex items-center gap-3'>
          <span
            className={`text-lg font-semibold ${
              isSelected ? 'text-white' : 'text-white/80 group-hover:text-white'
            }`}
          >
            {index + 1}.
          </span>
          <span
            className={`text-lg ${
              isSelected ? 'text-white' : 'text-white/80 group-hover:text-white'
            }`}
          >
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}
