import { getScoreMessage } from '../utils/quiz';
interface Props {
  score: number;
  correctCount: number;
  totalCount: number;
  color: string;
}

export default function Score({
  score,
  correctCount,
  totalCount,
  color,
}: Props) {
  return (
    <div className='mb-4'>
      <div
        className={`text-6xl font-extrabold bg-gradient-to-r ${color} bg-clip-text text-transparent mb-2`}
      >
        {score}점
      </div>
      <div className='text-2xl font-bold text-white mb-2'>
        {getScoreMessage(score)}
      </div>
      <div className='text-white/70 text-lg'>
        {correctCount}개 / {totalCount}개 정답
      </div>
    </div>
  );
}
