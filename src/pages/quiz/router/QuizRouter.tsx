import { useParams } from 'react-router-dom';
import TextQuizPage from '../TextQuizPage';
import ListeningQuizPage from '../ListeningQuizPage';
import SpeakingQuizPage from '../SpeakingQuizPage';

export default function QuizRouter() {
  const { category } = useParams<{ category: string }>();

  switch (category) {
    case 'grammar':
    case 'reading':
    case 'vocabulary':
      return <TextQuizPage />;
    case 'listening':
      return <ListeningQuizPage />;
    case 'speaking':
      return <SpeakingQuizPage />;
    default:
      return <div>존재하지 않는 퀴즈 유형입니다.</div>;
  }
}
