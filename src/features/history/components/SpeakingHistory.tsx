import type { SpeakingComment } from '@/features/quiz/types/quiz';
import { Mic, Music } from 'lucide-react';
interface Props {
  comment: SpeakingComment;
}
const getScoreColor = (score: number) => {
  if (score >= 90) return 'text-green-400';
  if (score >= 75) return 'text-yellow-400';
  return 'text-red-400';
};

const getScoreBg = (score: number) => {
  if (score >= 90) return 'bg-green-500/20';
  if (score >= 75) return 'bg-yellow-500/20';
  return 'bg-red-500/20';
};
export default function SpeakingHistory({ comment }: Props) {
  const { score, submit, markedText, musicId } = comment;

  return (
    <div className='space-y-6'>
      <div className='bg-white/5 rounded-xl p-4 border border-white/10'>
        <div className='flex items-start justify-between mb-3'>
          <div className='flex items-center space-x-3'>
            <div className='w-8 h-8 rounded-full flex items-center justify-center bg-red-500/20'>
              <Mic className='w-5 h-5 text-red-400' />
            </div>
            <span className='text-white font-medium'>말하기 연습</span>
          </div>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreBg(
              score
            )} ${getScoreColor(score)}`}
          >
            {score}점
          </span>
        </div>

        <div className='mb-4'>
          <div className='mb-4'>
            <h4 className='text-purple-300 text-sm font-medium mb-2'>
              제출한 음성:
            </h4>
            <div className='p-3 bg-white/5 rounded-lg'>
              <p className='text-white'>{submit}</p>
            </div>
          </div>

          <div className='mb-4'>
            <h4 className='text-blue-300 text-sm font-medium mb-2'>
              분석 결과:
            </h4>
            <div className='p-3 bg-blue-500/10 rounded-lg border border-blue-400/30'>
              <p className='text-blue-200 whitespace-pre-wrap'>{markedText}</p>
            </div>
          </div>

          <div className='flex items-center space-x-2 text-purple-300 text-sm'>
            <Music className='w-4 h-4' />
            <span>Music ID: {musicId}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
