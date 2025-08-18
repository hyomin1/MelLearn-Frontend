import { useParams, useNavigate } from 'react-router-dom';
import { useQuizStore } from '@/store/useQuizStore';
import ArrowBack from '@/components/ArrowBack';
import ArtistTrackLayout from '@/components/ArtistTrackLayout';
import { Trophy, CheckCircle } from 'lucide-react';
import { ROUTES } from '@/services/router';

export default function MockExamResultPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  // const mockExamProgress = useQuizStore((state) => state.mockExamProgress);

  return (
    <ArtistTrackLayout>
      <div className='mb-8'>
        <ArrowBack onClick={() => navigate(ROUTES.MOCK_EXAM(id || ''))} />
      </div>

      <div className='bg-white/5 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-white/10 mb-8'>
        <div className='text-center mb-8'>
          <Trophy className='w-16 h-16 text-yellow-400 mx-auto mb-4' />
          <h1 className='text-3xl font-bold text-white mb-2'>모의고사 결과</h1>
          <p className='text-white/70'>Mock Exam Results</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {/* Grammar Result */}
          <div className='bg-white/10 rounded-xl p-6 border border-white/20'>
            <div className='flex items-center mb-4'>
              <CheckCircle className='w-6 h-6 text-green-400 mr-2' />
              <h3 className='text-green-400 font-bold text-xl'>문법</h3>
            </div>
            <div className='text-white/80 mb-2'>Grammar Quiz</div>
            <div className='text-2xl font-bold text-white'>85점</div>
          </div>

          {/* Reading Result */}
          <div className='bg-white/10 rounded-xl p-6 border border-white/20'>
            <div className='flex items-center mb-4'>
              <CheckCircle className='w-6 h-6 text-blue-400 mr-2' />
              <h3 className='text-blue-400 font-bold text-xl'>읽기</h3>
            </div>
            <div className='text-white/80 mb-2'>Reading Quiz</div>
            <div className='text-2xl font-bold text-white'>92점</div>
          </div>

          {/* Vocabulary Result */}
          <div className='bg-white/10 rounded-xl p-6 border border-white/20'>
            <div className='flex items-center mb-4'>
              <CheckCircle className='w-6 h-6 text-purple-400 mr-2' />
              <h3 className='text-purple-400 font-bold text-xl'>어휘</h3>
            </div>
            <div className='text-white/80 mb-2'>Vocabulary Quiz</div>
            <div className='text-2xl font-bold text-white'>78점</div>
          </div>

          {/* Listening Result */}
          <div className='bg-white/10 rounded-xl p-6 border border-white/20'>
            <div className='flex items-center mb-4'>
              <CheckCircle className='w-6 h-6 text-orange-400 mr-2' />
              <h3 className='text-orange-400 font-bold text-xl'>듣기</h3>
            </div>
            <div className='text-white/80 mb-2'>Listening Quiz</div>
            <div className='text-2xl font-bold text-white'>88점</div>
          </div>

          {/* Speaking Result */}
          <div className='bg-white/10 rounded-xl p-6 border border-white/20'>
            <div className='flex items-center mb-4'>
              <CheckCircle className='w-6 h-6 text-red-400 mr-2' />
              <h3 className='text-red-400 font-bold text-xl'>말하기</h3>
            </div>
            <div className='text-white/80 mb-2'>Speaking Quiz</div>
            <div className='text-2xl font-bold text-white'>81점</div>
          </div>
        </div>

        {/* 종합 점수 */}
        <div className='mt-8 text-center'>
          <div className='bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 border border-white/20'>
            <h3 className='text-white font-bold text-xl mb-2'>종합 점수</h3>
            <div className='text-4xl font-bold text-white'>84.8점</div>
            <div className='text-white/80 mt-2'>총 5개 영역 평균</div>
          </div>
        </div>

        <div className='mt-8 text-center'>
          <button
            onClick={() => navigate(ROUTES.HOME)}
            className='bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300'
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    </ArtistTrackLayout>
  );
}
