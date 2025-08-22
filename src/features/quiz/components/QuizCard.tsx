import type { Quiz } from '../types/quiz';
import QuizQuestionHeader from './QuizQuestionHeader';
import QuizOptionItem from './QuizOptionItem';

interface Props {
  color: string;
  index: number;
  quiz: Quiz;
  selected: number;
  onClick: (index: number) => void;
}
export default function QuizCard({
  color,
  index,
  quiz,
  selected,
  onClick,
}: Props) {
  const { question, optionList, correctRate } = quiz;
  return (
    <div className='bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 mb-8'>
      <QuizQuestionHeader
        index={index}
        question={question}
        color={color}
        correctRate={correctRate}
      />

      <div className='space-y-4'>
        {optionList.map((option, idx) => (
          <QuizOptionItem
            key={idx}
            index={idx}
            label={option.replace(/^\d+\.\s*/, '')}
            isSelected={selected === idx + 1}
            color={color}
            onClick={() => onClick(idx + 1)}
          />
        ))}
      </div>
    </div>
  );
}
