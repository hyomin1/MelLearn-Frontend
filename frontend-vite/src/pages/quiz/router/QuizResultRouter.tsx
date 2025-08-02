import { useParams } from 'react-router-dom';
import TextQuizResultPage from '../TextQuizResultPage';
import ListeningQuizResultPage from '../ListeningQuizResultPage';
import SpeakingQuizResultPage from '../SpeakingQuizResultPage';

export default function QuizResultRouter() {
  const { category } = useParams<{ category: string }>();

  switch (category) {
    case 'grammar':
    case 'reading':
    case 'voca':
      return <TextQuizResultPage />;
    case 'listening':
      return <ListeningQuizResultPage />;

    case 'speaking':
      return <SpeakingQuizResultPage />;
      return null;
    default:
      return <div>존재하지 않는 결과 페이지입니다.</div>;
  }
}
