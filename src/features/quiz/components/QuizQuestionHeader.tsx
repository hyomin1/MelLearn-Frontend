interface Props {
  index: number;
  question: string;
  color: string;
  correctRate: number;
}

export default function QuizQuestionHeader({
  index,
  question,
  color,
  correctRate,
}: Props) {
  const displayRate =
    !isNaN(correctRate) && isFinite(correctRate)
      ? `${correctRate.toFixed(0)}%`
      : '정답률 없음';
  return (
    <div className='mb-8'>
      <div className='flex justify-between items-center gap-3 mb-4'>
        <span
          className={`text-4xl font-extrabold bg-gradient-to-r ${color} bg-clip-text text-transparent`}
        >
          Q{index + 1}.
        </span>
        <span className='text-white/70 bg-white/10 px-3 py-1 rounded-full text-sm font-medium'>
          {displayRate}
        </span>
      </div>
      <h2 className='text-2xl sm:text-3xl font-bold text-white leading-relaxed'>
        {question}
      </h2>
    </div>
  );
}
