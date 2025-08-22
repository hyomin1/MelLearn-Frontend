import React from 'react';
import { Brain, Sparkles, Zap, BookOpen } from 'lucide-react';

export default function QuizLoading() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4 relative overflow-hidden'>
      <div className='absolute inset-0'>
        {[...Array(15)].map((_, i) => (
          <Sparkles
            key={i}
            className='absolute text-white/20 animate-pulse'
            size={16}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className='relative bg-white/10 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/20 max-w-lg w-full text-center'>
        <div className='relative mb-8'>
          <div className='w-28 h-28 mx-auto relative'>
            <div
              className='absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-spin opacity-20'
              style={{ animationDuration: '8s' }}
            ></div>

            <div className='relative w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-xl flex items-center justify-center animate-pulse'>
              <Brain className='w-14 h-14 text-white animate-bounce' />

              <div className='absolute -top-3 -right-3'>
                <Zap className='w-6 h-6 text-yellow-300 animate-ping' />
              </div>
              <div className='absolute -bottom-2 -left-2'>
                <Sparkles className='w-5 h-5 text-pink-300 animate-pulse' />
              </div>
            </div>
          </div>
        </div>

        <h1 className='text-4xl font-bold text-white mb-4 bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent'>
          AI가 퀴즈를 만들고 있어요
        </h1>

        <p className='text-white/80 text-lg mb-8 leading-relaxed'>
          잠시만 기다려주세요
          <br />
          <span className='text-sm text-white/60'>
            맞춤형 퀴즈를 생성하고 있습니다
          </span>
        </p>

        <div className='flex justify-center space-x-2 mb-8'>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className='w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-bounce'
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1s',
              }}
            />
          ))}
        </div>

        <div className='w-full bg-white/20 rounded-full h-2 mb-6 overflow-hidden'>
          <div
            className='h-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full animate-pulse'
            style={{
              width: '70%',
              animation: 'progressFlow 3s ease-in-out infinite',
            }}
          />
        </div>

        <div className='flex justify-center space-x-6 text-white/60'>
          <div className='flex items-center space-x-2'>
            <BookOpen className='w-4 h-4 animate-pulse' />
            <span className='text-sm'>문제 생성</span>
          </div>
          <div className='flex items-center space-x-2'>
            <Brain className='w-4 h-4 animate-pulse' />
            <span className='text-sm'>AI 분석</span>
          </div>
          <div className='flex items-center space-x-2'>
            <Sparkles className='w-4 h-4 animate-pulse' />
            <span className='text-sm'>최적화</span>
          </div>
        </div>
      </div>
    </div>
  );
}
