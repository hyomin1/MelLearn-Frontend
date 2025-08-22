import Score from './Score';
import { Trophy } from 'lucide-react';
import { getScoreColor } from '../utils/quiz';

interface Props {
  score: number;
  correctCount: number;
  totalCount: number;
}

export default function ScoreBoard({ score, correctCount, totalCount }: Props) {
  const color = getScoreColor(score);
  return (
    <div className='bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 mb-8'>
      <div className='text-center'>
        {/* 트로피 아이콘 */}
        <div
          className={`inline-flex p-4 rounded-full bg-gradient-to-r ${color} mb-6`}
        >
          <Trophy className='w-12 h-12 text-white' />
        </div>

        <Score
          score={score}
          correctCount={correctCount}
          totalCount={totalCount}
          color={color}
        />
      </div>
    </div>
  );
}
