import React, { useState } from 'react';
import QuizLayout from '@/features/quiz/components/QuizLayout';
import {
  ArrowLeft,
  Mic,
  MicOff,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Square,
  Volume2,
  Headphones,
} from 'lucide-react';

export default function SpeakingQuizPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(2);

  // 임시 가사 데이터 (나중에 실제 데이터로 교체)
  const lyrics = [
    { time: 0, text: 'I was a ghost, I was alone' },
    { time: 3, text: '어두워진 압길속에' },
    { time: 6, text: "Given the throne I don't know" },
    { time: 9, text: 'How to believe' },
    { time: 12, text: "I was the queen that I'm meant to be" },
    { time: 15, text: 'I lived two lives, tried to play both sides' },
    { time: 18, text: "But I couldn't find my own place" },
  ];

  const handleRecord = () => {
    setIsRecording(!isRecording);
  };

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <QuizLayout>
      {/* 헤더 */}
      <div className='flex items-center justify-between mb-8'>
        <button className='p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-110'>
          <ArrowLeft className='w-6 h-6 text-white' />
        </button>

        <div className='text-center'>
          <div className='flex items-center justify-center gap-3 mb-2'>
            <div className='p-2 rounded-lg bg-gradient-to-r from-pink-500 to-rose-500'>
              <Mic className='w-6 h-6 text-white' />
            </div>
            <h1 className='text-2xl sm:text-3xl font-bold text-white'>
              Speaking Quiz
            </h1>
          </div>
          <p className='text-white/70'>노래를 따라 불러보세요</p>
        </div>

        <div className='w-12'></div>
      </div>

      {/* 오디오 플레이어 */}
      <div className='bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 mb-8'>
        <div className='text-center mb-6'>
          <h3 className='text-white text-xl font-semibold mb-2'>Born to Be</h3>
          <p className='text-white/60'>ITZY</p>
        </div>

        {/* 플레이어 컨트롤 */}
        <div className='flex items-center justify-center gap-4 mb-6'>
          <button className='p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300'>
            <SkipBack className='w-5 h-5 text-white' />
          </button>

          <button
            onClick={handlePlay}
            className='p-4 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 hover:scale-110 transition-all duration-300 shadow-lg'
          >
            {isPlaying ? (
              <Pause className='w-8 h-8 text-white' />
            ) : (
              <Play className='w-8 h-8 text-white ml-1' />
            )}
          </button>

          <button className='p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300'>
            <SkipForward className='w-5 h-5 text-white' />
          </button>
        </div>

        {/* 진행바 */}
        <div className='w-full max-w-md mx-auto'>
          <div className='flex justify-between text-white/60 text-sm mb-2'>
            <span>0:00</span>
            <span>2:45</span>
          </div>
          <div className='w-full bg-white/20 rounded-full h-2 cursor-pointer'>
            <div className='bg-gradient-to-r from-pink-500 to-rose-500 h-2 rounded-full w-1/3 transition-all duration-300' />
          </div>
        </div>
      </div>

      {/* 가사 표시 영역 */}
      <div className='bg-white/5 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-white/10 mb-8'>
        <h2 className='text-xl font-bold text-white mb-6 text-center'>가사</h2>

        <div className='max-h-80 overflow-y-auto'>
          <div className='space-y-4'>
            {lyrics.map((lyric, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl transition-all duration-500 ${
                  index === currentLyricIndex
                    ? 'bg-gradient-to-r from-pink-500/20 to-rose-500/20 border-2 border-pink-500/50 scale-105'
                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                }`}
              >
                <div className='flex items-center gap-3'>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      index === currentLyricIndex
                        ? 'bg-pink-500 text-white'
                        : 'bg-white/10 text-white/70'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <p
                    className={`text-lg leading-relaxed ${
                      index === currentLyricIndex
                        ? 'text-white font-semibold'
                        : 'text-white/80'
                    }`}
                  >
                    {lyric.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 녹음 컨트롤 */}
      <div className='bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 mb-8'>
        <h2 className='text-xl font-bold text-white mb-6 text-center'>
          녹음하기
        </h2>

        <div className='text-center'>
          {/* 녹음 버튼 */}
          <div className='mb-6'>
            <button
              onClick={handleRecord}
              className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                isRecording
                  ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                  : 'bg-gradient-to-r from-pink-500 to-rose-500 hover:scale-110'
              } shadow-lg`}
            >
              {isRecording ? (
                <Square className='w-8 h-8 text-white fill-current' />
              ) : (
                <Mic className='w-8 h-8 text-white' />
              )}
            </button>
          </div>

          {/* 녹음 상태 */}
          <div className='mb-6'>
            <p
              className={`text-lg font-semibold mb-2 ${
                isRecording ? 'text-red-400' : 'text-white/80'
              }`}
            >
              {isRecording ? '녹음 중...' : '녹음 준비'}
            </p>
            {isRecording && (
              <div className='text-2xl font-mono text-red-400'>
                {Math.floor(recordingTime / 60)}:
                {(recordingTime % 60).toString().padStart(2, '0')}
              </div>
            )}
          </div>

          {/* 녹음 파형 (시각적 효과) */}
          {isRecording && (
            <div className='flex items-center justify-center gap-1 mb-6'>
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className='bg-pink-500 rounded-full animate-pulse'
                  style={{
                    width: '3px',
                    height: `${Math.random() * 30 + 10}px`,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: '0.5s',
                  }}
                />
              ))}
            </div>
          )}

          {/* 추가 컨트롤 */}
          <div className='flex justify-center gap-4 mb-6'>
            <button
              className='flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300'
              disabled={isRecording}
            >
              <Volume2 className='w-4 h-4 text-white' />
              <span className='text-white text-sm'>재생음량</span>
            </button>
            <button
              className='flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300'
              disabled={isRecording}
            >
              <Headphones className='w-4 h-4 text-white' />
              <span className='text-white text-sm'>헤드폰 권장</span>
            </button>
          </div>

          {/* 가이드 텍스트 */}
          <p className='text-white/60 text-sm'>
            {isRecording
              ? '노래에 맞춰 따라 불러보세요!'
              : '마이크 버튼을 눌러 녹음을 시작하세요'}
          </p>
        </div>
      </div>

      {/* 제출 버튼 */}
      <div className='text-center mb-6'>
        <button
          className='px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed'
          disabled={isRecording}
        >
          녹음 완료 및 제출
        </button>
      </div>

      {/* 도움말 */}
      <div className='p-4 bg-pink-500/10 border border-pink-500/20 rounded-xl'>
        <div className='flex items-start gap-3'>
          <Mic className='w-5 h-5 text-pink-400 mt-0.5 flex-shrink-0' />
          <div>
            <p className='text-pink-300 font-medium mb-1'>Speaking 팁</p>
            <p className='text-pink-200/80 text-sm'>
              원곡을 들으면서 발음과 리듬에 맞춰 따라 불러보세요. 완벽하지
              않아도 괜찮으니 자신 있게 노래해보세요!
            </p>
          </div>
        </div>
      </div>
    </QuizLayout>
  );
}
