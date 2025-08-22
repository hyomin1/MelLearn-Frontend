import { QUIZ_TYPE } from '../constants/history';
import type { QuizType } from '../types/history';
interface Props {
  selectedType: QuizType;
  onClick: (type: QuizType) => void;
}

export default function FilterSection({ selectedType, onClick }: Props) {
  return (
    <div className='bg-white/5 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/10'>
      <div className='flex flex-wrap gap-3'>
        {QUIZ_TYPE.map(({ type, Icon, color }) => (
          <button
            key={type}
            onClick={() => onClick(type as QuizType)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
              selectedType === type
                ? `bg-gradient-to-r ${color} text-white shadow-lg scale-105`
                : 'bg-white/10 text-purple-200 hover:bg-white/20 hover:text-white'
            }`}
          >
            <Icon className='w-4 h-4' />
            <span className='font-medium'>{type}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
