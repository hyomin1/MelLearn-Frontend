interface Props {
  index: number;
  question: string;
  color: string;
}

export default function QuizQuestionHeader({ index, question, color }: Props) {
  return (
    <div className='mb-8'>
      <div className='flex items-center gap-3 mb-4'>
        <span
          className={`text-4xl font-extrabold bg-gradient-to-r ${color} bg-clip-text text-transparent`}
        >
          Q{index + 1}.
        </span>
      </div>
      <h2 className='text-2xl sm:text-3xl font-bold text-white leading-relaxed'>
        {question}
      </h2>
    </div>
  );
}
