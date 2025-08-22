import ListeningDetailResult from '@/components/ListeningDetailResult';
import QuizHeader from '@/features/quiz/components/QuizHeader';
import QuizLayout from '@/features/quiz/components/QuizLayout';
import ResultActionButton from '@/features/quiz/components/ResultActionButton';
import ScoreBoard from '@/features/quiz/components/ScoreBoard';
import type { ListeningComment } from '@/features/quiz/types/quiz';
import { parseListeningText } from '@/features/quiz/utils/parseListeningText';
import { getCategoryColor } from '@/features/quiz/utils/quiz';
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
interface Props {
  listeningComment: ListeningComment;
  isNotMockExam?: boolean;
}

export default function ListeningResult({
  listeningComment,
  isNotMockExam,
}: Props) {
  const navigate = useNavigate();
  const { id } = useParams();
  const categoryColor = getCategoryColor('listening');

  const parsedText = useMemo(() => {
    return parseListeningText({
      blankedText: listeningComment?.listeningQuiz?.blankedText,
      answerList: listeningComment?.listeningQuiz?.answerList ?? [],
      userAnswerList: listeningComment?.submitAnswerList ?? [],
    });
  }, [listeningComment]);

  const isAnswerCorrect = (userAnswer?: string, correctAnswer?: string) => {
    return (
      userAnswer?.toLowerCase().trim() === correctAnswer?.toLowerCase().trim()
    );
  };

  const totalCount = listeningComment?.listeningQuiz?.answerList?.length || 0;
  const correctCount = listeningComment?.submitAnswerList?.filter(
    (answer, index) =>
      isAnswerCorrect(
        answer,
        listeningComment?.listeningQuiz?.answerList[index]
      )
  ).length;
  const score = Number(listeningComment?.score.toFixed(0));

  return (
    <QuizLayout>
      <QuizHeader isSolving={false} pathname='listening' title='Listening' />
      <ScoreBoard
        score={score}
        totalCount={totalCount}
        correctCount={correctCount || 0}
      />
      <ListeningDetailResult
        isAnswerCorrect={isAnswerCorrect}
        parsedText={parsedText}
      />
      {isNotMockExam && (
        <ResultActionButton
          onRetry={() => navigate(`/quiz/listening/${id}`)}
          onGoHome={() => navigate('/')}
          color={categoryColor}
        />
      )}
    </QuizLayout>
  );
}
