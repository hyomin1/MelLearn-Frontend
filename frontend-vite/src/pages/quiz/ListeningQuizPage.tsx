import QuizLayout from '@/features/quiz/components/QuizLayout';
import { getLevel, getLevelColor } from '@/features/quiz/utils/quiz';
import { useState } from 'react';

// Mock listening quiz data - 빈칸 채우기 방식
const mockListeningQuiz = {
  id: 1,
  level: 2,
  title: 'Weather Conversation',
  lyrics: [
    { text: "A: How's the weather today?", hasBlank: false },
    { text: "B: It's quite", hasBlank: false },
    { text: '____', hasBlank: true, answer: 'sunny', id: 1 },
    { text: 'outside. Perfect for a walk!', hasBlank: false },
    { text: 'A: That sounds great! What about tomorrow?', hasBlank: false },
    { text: 'B: The forecast says it will be', hasBlank: false },
    { text: '____', hasBlank: true, answer: 'rainy', id: 2 },
    { text: 'all day.', hasBlank: false },
    { text: 'A: Oh no! We planned to go to the', hasBlank: false },
    { text: '____', hasBlank: true, answer: 'park', id: 3 },
    { text: 'tomorrow.', hasBlank: false },
    { text: "B: Don't worry, we can go to the", hasBlank: false },
    { text: '____', hasBlank: true, answer: 'library', id: 4 },
    { text: 'instead and study for our exam.', hasBlank: false },
    { text: "A: That's a wonderful", hasBlank: false },
    { text: '____', hasBlank: true, answer: 'idea', id: 5 },
    { text: "! Let's meet at 3 o'clock.", hasBlank: false },
    { text: 'B: Perfect! See you then!', hasBlank: false },
  ],
};

export default function ListeningQuizPage() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [currentFocus, setCurrentFocus] = useState(null);

  const problem = mockListeningQuiz;
  const blanks = problem.lyrics.filter((item) => item.hasBlank);

  const handleInputChange = (blankId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [blankId]: value,
    }));
  };

  const handleSubmit = () => {
    const unanswered = blanks.filter(
      (blank) => !answers[blank.id] || answers[blank.id].trim() === ''
    );
    if (unanswered.length > 0) {
      alert('모든 빈칸을 채워주세요.');
      return;
    }
    setShowResults(true);
  };

  const calculateScore = () => {
    let correct = 0;
    blanks.forEach((blank) => {
      if (
        answers[blank.id]?.toLowerCase().trim() === blank.answer.toLowerCase()
      ) {
        correct++;
      }
    });
    return correct;
  };

  const isAnswerCorrect = (blankId, correctAnswer) => {
    return (
      answers[blankId]?.toLowerCase().trim() === correctAnswer.toLowerCase()
    );
  };

  // 결과 페이지
  if (showResults) {
    const score = calculateScore();
    const total = blanks.length;
    const percentage = Math.round((score / total) * 100);

    return (
      <div className='min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900'>
        <div className='max-w-4xl mx-auto px-4 py-8'>
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
        </div>
      </div>
    );
  }

  // 메인 퀴즈 페이지
  return (
    <QuizLayout>
      {/* 헤더 */}
      <div className='flex items-center justify-between mb-8'>
        <button className='p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-110'>
          <svg
            className='w-6 h-6 text-white'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M15 19l-7-7 7-7'
            />
          </svg>
        </button>

        <div className='text-center'>
          <div className='flex items-center justify-center gap-3 mb-2'>
            <div className='p-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500'>
              <svg
                className='w-6 h-6 text-white'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.464 15.536a5 5 0 010-7.072m-2.828 9.9a9 9 0 010-12.728'
                />
              </svg>
            </div>
            <h1 className='text-2xl sm:text-3xl font-bold text-white'>
              Listening
            </h1>
          </div>
          <div className='flex items-center justify-center gap-2'>
            <svg
              className={`w-4 h-4 ${getLevelColor(problem.level)}`}
              fill='currentColor'
              viewBox='0 0 20 20'
            >
              <path
                fillRule='evenodd'
                d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z'
                clipRule='evenodd'
              />
            </svg>
            <span
              className={`text-lg font-semibold ${getLevelColor(
                problem.level
              )}`}
            >
              {getLevel(problem.level)}
            </span>
          </div>
        </div>

        <div className='w-12'></div>
      </div>

      {/* 진행률 */}
      <div className='mb-8'>
        <div className='flex justify-between items-center mb-2'>
          <span className='text-white/80 text-sm'>완성도</span>
          <span className='text-white/80 text-sm'>
            {Object.keys(answers).filter((key) => answers[key]?.trim()).length}{' '}
            / {blanks.length}
          </span>
        </div>
        <div className='w-full bg-white/10 rounded-full h-2'>
          <div
            className='bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-500'
            style={{
              width: `${
                (Object.keys(answers).filter((key) => answers[key]?.trim())
                  .length /
                  blanks.length) *
                100
              }%`,
            }}
          />
        </div>
      </div>

      {/* 오디오 플레이어 영역 */}
      <div className='bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 mb-8'>
        <div className='text-center'>
          <div className='mb-4'>
            <h3 className='text-white/80 text-lg font-medium mb-2'>
              {problem.title}
            </h3>
            <p className='text-white/60 text-sm'>
              오디오를 들으며 빈칸을 채워보세요
            </p>
          </div>

          {/* 플레이어 컨트롤 모형 */}
          <div className='flex items-center justify-center gap-4 mb-6'>
            <button
              className='p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300'
              title='다시 듣기'
            >
              <svg
                className='w-6 h-6 text-white'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
                />
              </svg>
            </button>

            <button className='p-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:scale-110 transition-all duration-300 shadow-lg'>
              <svg
                className='w-8 h-8 text-white ml-1'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15a2 2 0 002-2V9a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293L10.293 4.293A1 1 0 009.586 4H8a2 2 0 00-2 2v5a2 2 0 002 2z'
                />
              </svg>
            </button>

            <button
              className='p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300'
              title='속도 조절'
            >
              <span className='text-white text-sm font-medium'>1.0x</span>
            </button>
          </div>

          {/* 진행바 모형 */}
          <div className='w-full max-w-md mx-auto'>
            <div className='flex justify-between text-white/60 text-sm mb-2'>
              <span>0:00</span>
              <span>1:45</span>
            </div>
            <div className='w-full bg-white/20 rounded-full h-2 cursor-pointer'>
              <div className='bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full w-2/5' />
            </div>
          </div>
        </div>
      </div>

      {/* 가사 및 빈칸 채우기 영역 */}
      <div className='bg-white/5 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-white/10 mb-8'>
        <div className='mb-6'>
          <h2 className='text-xl sm:text-2xl font-bold text-white mb-2'>
            빈칸 채우기
          </h2>
          <p className='text-white/70'>
            오디오를 들으며 빈칸에 알맞은 단어를 입력하세요
          </p>
        </div>

        {/* 가사 표시 */}
        <div className='bg-white/5 rounded-xl p-6 border border-white/10 mb-6'>
          <div className='space-y-3 leading-relaxed text-lg'>
            {problem.lyrics.map((item, idx) => (
              <span key={idx} className='inline'>
                {item.hasBlank ? (
                  <input
                    type='text'
                    value={answers[item.id] || ''}
                    onChange={(e) => handleInputChange(item.id, e.target.value)}
                    onFocus={() => setCurrentFocus(item.id)}
                    onBlur={() => setCurrentFocus(null)}
                    className={`inline-block mx-1 px-3 py-1 bg-white/10 border-2 rounded-lg text-white placeholder-white/40 transition-all duration-300 min-w-[100px] text-center ${
                      currentFocus === item.id
                        ? 'border-blue-400 bg-blue-500/20 scale-105'
                        : 'border-white/30 hover:border-white/50'
                    }`}
                    placeholder='____'
                    maxLength={20}
                  />
                ) : (
                  <span className='text-white/90'>{item.text} </span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* 빈칸 목록 */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          {blanks.map((blank, idx) => (
            <div
              key={blank.id}
              className='bg-white/5 rounded-lg p-4 border border-white/10'
            >
              <div className='flex items-center gap-3'>
                <div className='flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-semibold'>
                  {idx + 1}
                </div>
                <div className='flex-1'>
                  <input
                    type='text'
                    value={answers[blank.id] || ''}
                    onChange={(e) =>
                      handleInputChange(blank.id, e.target.value)
                    }
                    className='w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/40 focus:border-blue-400 focus:bg-blue-500/20 transition-all duration-300'
                    placeholder={`빈칸 ${idx + 1}`}
                    maxLength={20}
                  />
                </div>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    answers[blank.id]?.trim()
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-white/10 text-white/40'
                  }`}
                >
                  {answers[blank.id]?.trim() ? (
                    <svg
                      className='w-4 h-4'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path
                        fillRule='evenodd'
                        d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                        clipRule='evenodd'
                      />
                    </svg>
                  ) : (
                    <div className='w-2 h-2 rounded-full bg-current'></div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 제출 버튼 */}
      <div className='text-center'>
        <button
          onClick={handleSubmit}
          disabled={
            Object.keys(answers).filter((key) => answers[key]?.trim()).length <
            blanks.length
          }
          className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
            Object.keys(answers).filter((key) => answers[key]?.trim()).length <
            blanks.length
              ? 'bg-white/5 text-white/30 cursor-not-allowed'
              : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white hover:scale-105 shadow-lg'
          }`}
        >
          제출하기
        </button>
      </div>

      {/* 도움말 */}
      <div className='mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl'>
        <div className='flex items-start gap-3'>
          <svg
            className='w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path
              fillRule='evenodd'
              d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
              clipRule='evenodd'
            />
          </svg>
          <div>
            <p className='text-blue-300 font-medium mb-1'>💡 도움말</p>
            <p className='text-blue-200/80 text-sm'>
              오디오를 여러 번 들으며 빈칸에 들리는 단어를 정확히 입력하세요.
              대소문자는 구분하지 않습니다.
            </p>
          </div>
        </div>
      </div>
    </QuizLayout>
  );
}
