import ListeningResult from '@/components/ListeningResult';
import SpeakingResult from '@/components/SpeakingResult';
import TextResult from '@/components/TextResult';
import QuizLayout from '@/features/quiz/components/QuizLayout';
import ResultActionButton from '@/features/quiz/components/ResultActionButton';
import { useMockExamStore } from '@/store/useMockExamStore';
import { useParams, useNavigate } from 'react-router-dom';

export default function MockExamResultPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const mockExamResult = useMockExamStore((state) => state.mockExamResult);
  const {
    grammarSubmit,
    vocabularySubmit,
    readingSubmit,
    listeningSubmit,
    speakingSubmit,
  } = mockExamResult;
  return (
    <div>
      {grammarSubmit && <TextResult comment={grammarSubmit} type='grammar' />}
      {vocabularySubmit && (
        <TextResult comment={vocabularySubmit} type='vocabulary' />
      )}
      {readingSubmit && <TextResult comment={readingSubmit} type='reading' />}
      {listeningSubmit && (
        <ListeningResult listeningComment={listeningSubmit} />
      )}
      {speakingSubmit ? (
        <SpeakingResult speakingComment={speakingSubmit} />
      ) : (
        <QuizLayout>결과가 존재하지 않습니다.</QuizLayout>
      )}

      <ResultActionButton
        onRetry={() => navigate(`/quiz/mock-exam/${id}/result`)}
        onGoHome={() => navigate('/')}
        color={'grammar'}
      />
    </div>
  );
}
