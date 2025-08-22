import DetailResult from '@/components/DetailResult';
import QuizHeader from '@/features/quiz/components/QuizHeader';
import QuizLayout from '@/features/quiz/components/QuizLayout';
import ResultActionButton from '@/features/quiz/components/ResultActionButton';
import ScoreBoard from '@/features/quiz/components/ScoreBoard';
import ToggleButton from '@/features/quiz/components/ToggleButton';
import type { Comment } from '@/features/quiz/types/quiz';
import { getCategoryColor } from '@/features/quiz/utils/quiz';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
interface Props {
  comment: Comment;
  type: 'grammar' | 'vocabulary' | 'reading';
  isNotMockExam?: boolean;
}

export default function TextResult({ comment, type, isNotMockExam }: Props) {
  const [showDetails, setShowDetails] = useState(false);

  const categoryColor = getCategoryColor(type);
  const navigate = useNavigate();
  const { id } = useParams();

  const { quizList, submitAnswerList, score } = comment;
  const { quizzes } = quizList;
  const correctCount = quizzes.filter(
    (quiz, idx) => quiz.answer === submitAnswerList[idx]
  ).length;
  const totalCount = quizzes.length;
  const title = type.charAt(0).toUpperCase() + type.slice(1);
  return (
    <QuizLayout>
      <QuizHeader isSolving={false} pathname={type} title={title} />
      <ScoreBoard
        score={score}
        correctCount={correctCount}
        totalCount={totalCount}
      />
      <ToggleButton
        onToggle={() => setShowDetails(!showDetails)}
        label={showDetails ? '상세 결과 숨기기' : '상세 결과 보기'}
        color={categoryColor}
      />

      {showDetails && (
        <DetailResult comment={comment} categoryColor={categoryColor} />
      )}

      {isNotMockExam && (
        <ResultActionButton
          onRetry={() => navigate(`/quiz/${type}/${id}`)}
          onGoHome={() => navigate('/')}
          color={categoryColor}
        />
      )}
    </QuizLayout>
  );
}
