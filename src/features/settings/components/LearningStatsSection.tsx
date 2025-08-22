import { TrendingUp } from 'lucide-react';
import { LEVEL } from '../constants/member';
import type { Member } from '../types/member';

interface LearningStatsSectionProps {
  member: Member;
}

export default function LearningStatsSection({ member }: LearningStatsSectionProps) {
  const currentLevel = LEVEL[member.level as keyof typeof LEVEL] || LEVEL['Beginner'];
  const nextLevelKey = Object.keys(LEVEL)[Object.keys(LEVEL).indexOf(member.level) + 1];
  const nextLevel = nextLevelKey ? LEVEL[nextLevelKey as keyof typeof LEVEL] : null;

  const progressPercentage = nextLevel
    ? ((member.levelPoint - currentLevel.min) / (nextLevel.min - currentLevel.min)) * 100
    : 100;

  return (
    <div className='bg-white/5 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-white/20 transition-all duration-300 group'>
      <div className='flex items-center space-x-3 mb-6'>
        <div className='w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center'>
          <TrendingUp className='w-6 h-6 text-white' />
        </div>
        <div>
          <h2 className='text-2xl font-bold text-white'>학습 통계</h2>
          <p className='text-gray-400'>나의 학습 현황을 확인하세요</p>
        </div>
      </div>
      
      <div className='p-6 rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-400/30 backdrop-blur-sm'>
        <div className='flex items-center justify-between mb-4'>
          <span className='text-white font-bold text-xl'>{member.level}</span>
          <span className='text-gray-300 text-base'>{member.levelPoint} P</span>
        </div>

        {nextLevel && (
          <>
            <div className='w-full bg-white/20 rounded-full h-3 mb-3'>
              <div
                className='h-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 transition-all duration-500 shadow-lg'
                style={{
                  width: `${progressPercentage}%`,
                }}
              />
            </div>
            <div className='flex justify-between text-sm text-gray-300'>
              <span>
                다음: {nextLevelKey} ({nextLevel.min - member.levelPoint}P)
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
