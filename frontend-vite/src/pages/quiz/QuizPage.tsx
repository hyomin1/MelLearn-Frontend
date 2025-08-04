import CategoryCard from '@/features/quiz/components/CategoryCard';
import { useNavigate, useParams } from 'react-router-dom';
import useTrack from '@/features/track/hooks/useTrack';
import useLyric from '@/features/track/hooks/useLyric';
import useQuiz from '@/features/quiz/hooks/useQuiz';
import QuizLayout from '@/features/quiz/components/QuizLayout';
import WelcomeQuiz from '@/features/quiz/components/WelcomeQuiz';
import { CATEGORIES } from '@/features/quiz/constants/quiz';
import QuizLoading from '@/features/quiz/components/QuizLoading';
import useCategories from '@/features/quiz/hooks/useCategories';
import { extractEnabledCategories } from '@/features/quiz/utils/extractCategories';

export default function QuizPage() {
  const { id } = useParams();
  const {
    track,
    isLoading: trackLoading,
    error: trackError,
  } = useTrack(id || '');
  const { lyrics, plainLyrics } = useLyric(track);

  const navigate = useNavigate();
  const { categories, categoryLoading, categoryError } = useCategories(
    track,
    lyrics
  );
  const { create, quizLoading } = useQuiz(id || '', plainLyrics);
  if (trackLoading || categoryLoading) return <div> 로딩중...</div>;

  if (quizLoading) return <QuizLoading />;
  const handleClick = (category: string) => {
    if (category === 'speaking') {
      navigate(`/quiz/speaking/${id}`);
      return;
    }

    create(category);
  };
  console.log(categories);
  const filterdCategories = extractEnabledCategories(categories);

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
