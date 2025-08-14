import type { ListeningComment } from '@/features/quiz/types/quiz';
import { Headphones } from 'lucide-react';
import React from 'react';
interface Props {
  comment: ListeningComment;
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
export default function ListeningHistory({ comment }: Props) {
  const { score, listeningQuiz, submitAnswerList } = comment;
  return (
    <div className='space-y-6'>
      <div className='bg-white/5 rounded-xl p-4 border border-white/10'>
        <div className='flex items-start justify-between mb-3'>
          <div className='flex items-center space-x-3'>
            <div className='w-8 h-8 rounded-full flex items-center justify-center bg-blue-500/20'>
              <Headphones className='w-5 h-5 text-blue-400' />
            </div>
            <span className='text-white font-medium'>듣기 문제</span>
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
          <h3 className='text-white font-medium mb-3'>빈칸 채우기</h3>

          <div className='bg-purple-500/10 rounded-lg p-4 border border-purple-400/30 mb-4'>
            <p className='text-purple-200 text-sm mb-2'>🎵 듣기 지문:</p>
            <div className='text-white whitespace-pre-wrap'>
              {listeningQuiz.blankedText}
            </div>
          </div>

          <div className='space-y-2'>
            <h4 className='text-purple-300 text-sm font-medium'>
              제출한 답안:
            </h4>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
              {submitAnswerList.map((answer, index) => (
                <div key={index} className='p-3 bg-white/5 rounded-lg'>
                  <span className='text-purple-300 text-sm'>
                    빈칸 {index + 1}:{' '}
                  </span>
                  <span className='text-white font-medium'>{answer}</span>
                </div>
              ))}
            </div>
          </div>

          <div className='mt-4 space-y-2'>
            <h4 className='text-green-300 text-sm font-medium'>정답:</h4>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
              {listeningQuiz.answerList.map((answer, index) => (
                <div
                  key={index}
                  className='p-3 bg-green-500/10 rounded-lg border border-green-400/30'
                >
                  <span className='text-green-300 text-sm'>
                    빈칸 {index + 1}:{' '}
                  </span>
                  <span className='text-green-400 font-medium'>{answer}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
