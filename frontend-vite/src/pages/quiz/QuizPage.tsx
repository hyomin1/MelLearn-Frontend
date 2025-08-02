import CategoryCard from '@/features/quiz/components/CategoryCard';
import { useParams } from 'react-router-dom';
import useTrack from '@/features/track/hooks/useTrack';
import useLyric from '@/features/track/hooks/useLyric';
import useQuiz from '@/features/quiz/hooks/useQuiz';
import QuizLayout from '@/features/quiz/components/QuizLayout';
import WelcomeQuiz from '@/features/quiz/components/WelcomeQuiz';
import { CATEGORIES } from '@/features/quiz/constants/quiz';

export default function QuizPage() {
  const { id } = useParams();
  const {
    track,
    isLoading: trackLoading,
    error: trackError,
  } = useTrack(id || '');
  const { plainLyrics } = useLyric(track);
  const { categories, create, quizLoading, categoryLoading, categoryError } =
    useQuiz(id || '', plainLyrics);

  if (trackLoading || categoryLoading) return <div> 로딩중...</div>;

  if (quizLoading)
    return <div>인공지능이 퀴즈를 만들고있어요 잠시만 기다려주세요</div>;

  return (
    <QuizLayout>
      <WelcomeQuiz />
      <div className='grid lg:grid-cols-2 xl:grid-cols-3 gap-8'>
        {CATEGORIES.map((category) => (
          <CategoryCard
            key={category}
            category={category}
            onClick={() => create(category)}
          />
        ))}
      </div>
    </QuizLayout>
  );
}
