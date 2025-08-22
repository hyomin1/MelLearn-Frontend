import { BookOpen } from 'lucide-react';
interface Props {
  comment: string;
}

export default function Comment({ comment }: Props) {
  return (
    <div className='bg-white/10 rounded-lg p-4 border-l-4 border-blue-400'>
      <div className='flex items-center gap-2 mb-2'>
        <BookOpen className='w-5 h-5 text-blue-400' />
        <span className='font-semibold text-blue-400'>해설</span>
      </div>
      <p className='text-white/90 leading-relaxed'>{comment}</p>
    </div>
  );
}
