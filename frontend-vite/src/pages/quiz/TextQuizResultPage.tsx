import { useLocation } from 'react-router-dom';
import { getCategoryFromPath } from '@/features/quiz/utils/quiz';
import { useQuizStore } from '@/store/useQuizStore';
import TextResult from '@/components/TextResult';

export default function TextQuizResultPage() {
  const { pathname } = useLocation();

  const comment = useQuizStore((state) => state.comment);
  const category = getCategoryFromPath(pathname);

  if (!comment) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center'>
        <div className='text-white text-xl'>결과를 불러오는 중...</div>
      </div>
    );
  }

  return (
    <TextResult
      comment={comment}
      type={category as 'grammar' | 'vocabulary' | 'reading'}
      isNotMockExam={true}
    />
  );
}
