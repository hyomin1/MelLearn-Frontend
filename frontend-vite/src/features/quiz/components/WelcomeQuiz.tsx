import { TrendingUp } from 'lucide-react';

export default function WelcomeQuiz() {
  return (
    <div className='text-center mb-12'>
      <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6'>
        <TrendingUp className='w-4 h-4 text-pink-400' />
        <span className='text-white/80 text-sm font-medium'>
          English Learning
        </span>
      </div>

      <h1 className='text-4xl sm:text-6xl font-bold text-white mb-6'>
        어떤 영역을
        <span className='bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent'>
          학습
        </span>
        하시겠어요?
      </h1>

      <p className='text-xl text-white/70 mb-4 max-w-3xl mx-auto leading-relaxed'>
        5가지 핵심 영역으로 나누어진 체계적인 학습 프로그램으로
        <br />
        여러분의 영어 실력을 한 단계 업그레이드해보세요
      </p>

      {/* 통계 정보 */}
      <div className='flex items-center justify-center gap-8 mt-8'>
        <div className='text-center'>
          <div className='text-2xl font-bold text-white'>256+</div>
          <div className='text-white/60 text-sm'>총 레슨</div>
        </div>
        <div className='w-px h-12 bg-white/20' />
        <div className='text-center'>
          <div className='text-2xl font-bold text-white'>50K+</div>
          <div className='text-white/60 text-sm'>학습자</div>
        </div>
        <div className='w-px h-12 bg-white/20' />
        <div className='text-center'>
          <div className='text-2xl font-bold text-white'>4.8★</div>
          <div className='text-white/60 text-sm'>평점</div>
        </div>
      </div>
    </div>
  );
}
