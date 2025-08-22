import ListeningResult from '@/components/ListeningResult';
import QuizLayout from '@/features/quiz/components/QuizLayout';
import { useQuizStore } from '@/store/useQuizStore';

export default function ListeningQuizResultPage() {
  const listeningComment = useQuizStore((state) => state.listeningComment);

  if (!listeningComment) {
    return (
      <QuizLayout>
        <div className='text-center text-white'>
          <p>결과 데이터를 불러오는 중...</p>
        </div>
      </QuizLayout>
    );
  }
  return <ListeningResult listeningComment={listeningComment} isNotMockExam />;
}
