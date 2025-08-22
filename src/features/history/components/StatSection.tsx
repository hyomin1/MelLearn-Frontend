interface Props {
  stats: {
    totalQuizzes: number;
    averageScore: number;
    bestScore: number;
  };
}

export default function StatSection({ stats }: Props) {
  const { totalQuizzes, averageScore, bestScore } = stats;
  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8'>
      <div className='bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20'>
        <div className='text-2xl font-bold text-white'>{totalQuizzes}</div>
        <div className='text-purple-200 text-sm'>총 퀴즈</div>
      </div>
      <div className='bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20'>
        <div className='text-2xl font-bold text-white'>
          {averageScore.toFixed(0)}점
        </div>
        <div className='text-purple-200 text-sm'>평균 점수</div>
      </div>
      <div className='bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20'>
        <div className='text-2xl font-bold text-white'>
          {bestScore.toFixed(0)}점
        </div>
        <div className='text-purple-200 text-sm'>최고 점수</div>
      </div>
    </div>
  );
}
