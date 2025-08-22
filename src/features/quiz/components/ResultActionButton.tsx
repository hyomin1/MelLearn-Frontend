import { Home, RotateCcw } from 'lucide-react';
interface Props {
  onRetry: () => void;
  onGoHome: () => void;
  color: string;
}

export default function ResultActionButton({
  onRetry,
  onGoHome,
  color,
}: Props) {
  return (
    <div className='flex flex-col sm:flex-row gap-4 justify-center'>
      <button
        onClick={onRetry}
        className='flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold bg-white/10 text-white hover:bg-white/20 transition-all duration-300 hover:scale-105'
      >
        <RotateCcw className='w-5 h-5' />
        다시 풀기
      </button>
      <button
        onClick={onGoHome}
        className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold bg-gradient-to-r ${color} text-white hover:shadow-xl hover:scale-105 transition-all duration-300`}
      >
        <Home className='w-5 h-5' />
        홈으로
      </button>
    </div>
  );
}
