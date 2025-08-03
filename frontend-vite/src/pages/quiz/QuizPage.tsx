import CategoryCard from '@/features/quiz/components/CategoryCard';
import { useNavigate, useParams } from 'react-router-dom';
import useTrack from '@/features/track/hooks/useTrack';
import useLyric from '@/features/track/hooks/useLyric';
import useQuiz from '@/features/quiz/hooks/useQuiz';
import QuizLayout from '@/features/quiz/components/QuizLayout';
import WelcomeQuiz from '@/features/quiz/components/WelcomeQuiz';
import { CATEGORIES } from '@/features/quiz/constants/quiz';
import QuizLoading from '@/features/quiz/components/QuizLoading';

export default function QuizPage() {
  const { id } = useParams();
  const {
    track,
    isLoading: trackLoading,
    error: trackError,
  } = useTrack(id || '');
  const { plainLyrics } = useLyric(track);
  const navigate = useNavigate();

  const { categories, create, quizLoading, categoryLoading, categoryError } =
    useQuiz(id || '', plainLyrics);
  if (trackLoading || categoryLoading) return <div> 로딩중...</div>;

  if (quizLoading) return <QuizLoading />;
  const handleClick = (category: string) => {
    if (category === 'speaking') {
      navigate(`/quiz/speaking/${id}`);
      return;
    }

    create(category); // 그 외에는 mutate 실행
  };

  return (
    <QuizLayout>
      <WelcomeQuiz />
      <div className='grid lg:grid-cols-2 xl:grid-cols-3 gap-8'>
        {CATEGORIES.map((category) => (
          <CategoryCard
            key={category}
            category={category}
            onClick={handleClick}
          />
        ))}
      </div>
    </QuizLayout>
  );
}
