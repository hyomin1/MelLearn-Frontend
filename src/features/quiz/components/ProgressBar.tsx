interface Props {
  index: number;
  length: number;
  progress: number;
  color: string;
}

export default function ProgressBar({ index, length, progress, color }: Props) {
  return (
    <div className='bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 mb-8'>
      <div className='flex items-center justify-between mb-4'>
        <span className='text-white/70 text-sm font-medium'>진행률</span>
        <span className='text-white font-semibold'>
          {index + 1} / {length}
        </span>
      </div>
      <div className='w-full bg-white/20 rounded-full h-2'>
        <div
          className={`bg-gradient-to-r ${color} h-2 rounded-full transition-all duration-500 shadow-lg`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
