import QuizHeader from '@/features/quiz/components/QuizHeader';
import QuizLayout from '@/features/quiz/components/QuizLayout';
import QuizPlayer from '@/features/quiz/components/QuizPlayer';
import useQuiz from '@/features/quiz/hooks/useQuiz';
import { parseListeningText } from '@/features/quiz/utils/parseListeningText';
import useSpotifyCleanUp from '@/features/spotify/hooks/useSpotifyCleanUp';
import { useQuizStore } from '@/store/useQuizStore';
import { useTrackStore } from '@/store/useTrackStore';
import { useState, useMemo } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useParams } from 'react-router-dom';

export default function ListeningQuizPage() {
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [currentFocus, setCurrentFocus] = useState<number | null>(null);
  const quiz = useQuizStore((state) => state.listeningQuiz);

  const { id } = useParams();
  const track = useTrackStore((state) => state.track);

  const { submitListening } = useQuiz(id || '');
  useSpotifyCleanUp();
  const parsedText = useMemo(() => {
    return parseListeningText({
      blankedText: quiz?.blankedText,
      answerList: quiz?.answerList ?? [],
    });
  }, [quiz]);

  const blanks = parsedText.filter((item) => item.type === 'blank');

  const handleInputChange = (blankId: number, value: string) => {
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
      toast.error('모든 빈칸을 채워주세요.');
      return;
    }

    submitListening(Object.values(answers));
  };

  const { pathname } = useLocation();

  if (!quiz || !track) {
    return (
      <QuizLayout>
        <div className='text-center text-white'>
          <p>퀴즈 데이터를 불러오는 중...</p>
        </div>
      </QuizLayout>
    );
  }
  return (
    <QuizLayout>
      <QuizHeader isSolving pathname={pathname} title='Listening' />

      <div className='mb-8'>
        <div className='flex justify-between items-center mb-2'>
          <span className='text-white/80 text-sm'>완성도</span>
          <span className='text-white/80 text-sm'>
            {
              Object.keys(answers).filter((key) =>
                answers[parseInt(key)]?.trim()
              ).length
            }{' '}
            / {blanks.length}
          </span>
        </div>
        <div className='w-full bg-white/10 rounded-full h-2'>
          <div
            className='bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-500'
            style={{
              width: `${
                (Object.keys(answers).filter((key) =>
                  answers[parseInt(key)]?.trim()
                ).length /
                  blanks.length) *
                100
              }%`,
            }}
          />
        </div>
      </div>

      <QuizPlayer track={track} />

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

        {/* 텍스트 표시 */}
        <div className='bg-white/5 rounded-xl p-6 border border-white/10 mb-6'>
          <div className='space-y-3 leading-relaxed text-lg'>
            {parsedText.map((item, idx) => (
              <span key={idx} className='inline'>
                {item.type === 'blank' ? (
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
                  <span className='text-white/90'>{item.content}</span>
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
            Object.keys(answers).filter((key) => answers[parseInt(key)]?.trim())
              .length < blanks.length
          }
          className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
            Object.keys(answers).filter((key) => answers[parseInt(key)]?.trim())
              .length < blanks.length
              ? 'bg-white/5 text-white/30 cursor-not-allowed'
              : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white hover:scale-105 shadow-lg'
          }`}
        >
          제출하기
        </button>
      </div>
    </QuizLayout>
  );
}
