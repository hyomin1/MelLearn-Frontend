import QuizLayout from '@/features/quiz/components/QuizLayout';
import React from 'react';

export default function ListeningQuizResultPage() {
  return (
    <QuizLayout>
      {/* 결과 헤더 */}
      <div className='text-center mb-8'>
        <div className='inline-block p-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 mb-4'>
          <svg
            className='w-12 h-12 text-white'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
        </div>
        <h1 className='text-3xl font-bold text-white mb-2'>퀴즈 완료!</h1>
        <p className='text-white/80'>수고하셨습니다</p>
      </div>

      {/* 점수 카드 */}
      <div className='bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 mb-8'>
        <div className='text-center mb-8'>
          <div className='text-5xl font-bold text-white mb-2'>
            {percentage}%
          </div>
          <div className='text-xl text-white/80'>
            {score} / {total} 정답
          </div>
        </div>

        {/* 가사 결과 표시 */}
        <div className='bg-white/5 rounded-xl p-6 border border-white/10'>
          <h3 className='text-white font-semibold mb-4 text-center'>
            결과 확인
          </h3>
          <div className='space-y-2 leading-relaxed'>
            {problem.lyrics.map((item, idx) => (
              <span key={idx} className='inline'>
                {item.hasBlank ? (
                  <span
                    className={`inline-block mx-1 px-2 py-1 rounded font-medium ${
                      isAnswerCorrect(item.id, item.answer)
                        ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                        : 'bg-red-500/20 text-red-300 border border-red-500/30'
                    }`}
                  >
                    {answers[item.id] || '___'}
                    {!isAnswerCorrect(item.id, item.answer) && (
                      <span className='text-green-300 ml-2'>
                        ({item.answer})
                      </span>
                    )}
                  </span>
                ) : (
                  <span className='text-white/80'>{item.text} </span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 재시도 버튼 */}
      <div className='text-center'>
        <button
          onClick={() => {
            setShowResults(false);
            setAnswers({});
          }}
          className='px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg'
        >
          다시 풀어보기
        </button>
      </div>
    </QuizLayout>
  );
}
