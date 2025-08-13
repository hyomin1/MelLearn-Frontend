import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  ArrowLeft,
  BookOpen,
  Volume2,
  Headphones,
  Mic,
  PenTool,
  CheckCircle,
  XCircle,
  AlertCircle,
  Music,
} from 'lucide-react';
import useHistory from '@/features/history/hooks/useHistory';
import type { QuizType } from '@/features/history/types/history';
import type {
  Comment,
  ListeningComment,
  SpeakingComment,
} from '@/features/quiz/types/quiz';

const learningTypeConfig = {
  GRAMMAR: {
    icon: PenTool,
    label: '문법',
    color: 'from-green-500 to-emerald-500',
  },
  VOCABULARY: {
    icon: BookOpen,
    label: '어휘',
    color: 'from-blue-500 to-cyan-500',
  },
  LISTENING: {
    icon: Headphones,
    label: '듣기',
    color: 'from-yellow-500 to-orange-500',
  },
  READING: {
    icon: Volume2,
    label: '읽기',
    color: 'from-pink-500 to-rose-500',
  },
  SPEAKING: {
    icon: Mic,
    label: '말하기',
    color: 'from-red-500 to-pink-500',
  },
};

// URL의 quizType을 QuizType으로 변환하는 함수
const mapUrlTypeToQuizType = (urlType: string): QuizType | null => {
  const typeMap: Record<string, QuizType> = {
    grammar: 'GRAMMAR',
    vocabulary: 'VOCABULARY',
    listening: 'LISTENING',
    reading: 'READING',
    speaking: 'SPEAKING',
  };
  return typeMap[urlType.toLowerCase()] || null;
};

export default function HistoryDetailPage() {
  const { quizType: urlQuizType, id } = useParams<{
    quizType: string;
    id: string;
  }>();
  const navigate = useNavigate();
  const [historyItem, setHistoryItem] = useState<
    Comment | ListeningComment | SpeakingComment | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quizType, setQuizType] = useState<QuizType | null>(null);

  // 첫 번째 페이지 데이터를 가져와서 검색
  const { history, isLoading: historyLoading } = useHistory(
    0,
    quizType || 'GRAMMAR'
  );

  useEffect(() => {
    if (!urlQuizType || !id) {
      setError('필요한 매개변수가 없습니다.');
      setIsLoading(false);
      return;
    }

    const mappedQuizType = mapUrlTypeToQuizType(urlQuizType);
    if (!mappedQuizType) {
      setError('유효하지 않은 퀴즈 타입입니다.');
      setIsLoading(false);
      return;
    }

    setQuizType(mappedQuizType);
  }, [urlQuizType, id]);

  useEffect(() => {
    if (!quizType || !id || historyLoading) return;

    // 히스토리 데이터에서 해당 ID의 아이템 찾기
    const searchForItem = async () => {
      try {
        // 여러 페이지에 걸쳐 검색해야 할 수도 있지만,
        // 일단 현재 로드된 데이터에서 먼저 찾아보자
        if (history && history.content) {
          const foundItem = history.content.find(
            (item: any) => item.id?.toString() === id
          );

          if (foundItem) {
            setHistoryItem(foundItem);
            setIsLoading(false);
            return;
          }
        }

        // 첫 페이지에서 찾지 못했다면 에러 처리
        // 실제로는 여러 페이지를 검색해야 하지만, 복잡성을 위해 간단화
        setError(
          '해당 학습 기록을 찾을 수 없습니다. 히스토리 목록에서 다시 선택해주세요.'
        );
        setIsLoading(false);
      } catch (error) {
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
        setIsLoading(false);
      }
    };

    searchForItem();
  }, [quizType, id, history, historyLoading]);

  if (isLoading || historyLoading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4'></div>
          <div className='text-white text-lg'>학습 기록을 불러오는 중...</div>
        </div>
      </div>
    );
  }

  if (error || !historyItem || !quizType) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center'>
        <div className='text-center'>
          <div className='text-red-400 text-lg mb-4'>
            {error || '학습 기록을 찾을 수 없습니다'}
          </div>
          <button
            onClick={() => navigate('/history')}
            className='px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors'
          >
            히스토리로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  const typeConfig = learningTypeConfig[quizType];
  const TypeIcon = typeConfig.icon;

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 75) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return 'bg-green-500/20';
    if (score >= 75) return 'bg-yellow-500/20';
    return 'bg-red-500/20';
  };

  // 퀴즈 타입별 렌더링 함수
  const renderQuizDetails = () => {
    if (quizType === 'LISTENING') {
      const listeningItem = historyItem as ListeningComment;
      return (
        <div className='space-y-6'>
          <div className='bg-white/5 rounded-xl p-4 border border-white/10'>
            <div className='flex items-start justify-between mb-3'>
              <div className='flex items-center space-x-3'>
                <div className='w-8 h-8 rounded-full flex items-center justify-center bg-blue-500/20'>
                  <Headphones className='w-5 h-5 text-blue-400' />
                </div>
                <span className='text-white font-medium'>듣기 문제</span>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreBg(
                  listeningItem.score
                )} ${getScoreColor(listeningItem.score)}`}
              >
                {listeningItem.score}점
              </span>
            </div>

            <div className='mb-4'>
              <h3 className='text-white font-medium mb-3'>빈칸 채우기</h3>

              <div className='bg-purple-500/10 rounded-lg p-4 border border-purple-400/30 mb-4'>
                <p className='text-purple-200 text-sm mb-2'>🎵 듣기 지문:</p>
                <div className='text-white whitespace-pre-wrap'>
                  {listeningItem.listeningQuiz.blankedText}
                </div>
              </div>

              <div className='space-y-2'>
                <h4 className='text-purple-300 text-sm font-medium'>
                  제출한 답안:
                </h4>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                  {listeningItem.submitAnswerList.map((answer, index) => (
                    <div key={index} className='p-3 bg-white/5 rounded-lg'>
                      <span className='text-purple-300 text-sm'>
                        빈칸 {index + 1}:{' '}
                      </span>
                      <span className='text-white font-medium'>{answer}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className='mt-4 space-y-2'>
                <h4 className='text-green-300 text-sm font-medium'>정답:</h4>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                  {listeningItem.listeningQuiz.answerList.map(
                    (answer, index) => (
                      <div
                        key={index}
                        className='p-3 bg-green-500/10 rounded-lg border border-green-400/30'
                      >
                        <span className='text-green-300 text-sm'>
                          빈칸 {index + 1}:{' '}
                        </span>
                        <span className='text-green-400 font-medium'>
                          {answer}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (quizType === 'SPEAKING') {
      const speakingItem = historyItem as SpeakingComment;
      return (
        <div className='space-y-6'>
          <div className='bg-white/5 rounded-xl p-4 border border-white/10'>
            <div className='flex items-start justify-between mb-3'>
              <div className='flex items-center space-x-3'>
                <div className='w-8 h-8 rounded-full flex items-center justify-center bg-red-500/20'>
                  <Mic className='w-5 h-5 text-red-400' />
                </div>
                <span className='text-white font-medium'>말하기 연습</span>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreBg(
                  speakingItem.score
                )} ${getScoreColor(speakingItem.score)}`}
              >
                {speakingItem.score}점
              </span>
            </div>

            <div className='mb-4'>
              <div className='mb-4'>
                <h4 className='text-purple-300 text-sm font-medium mb-2'>
                  제출한 음성:
                </h4>
                <div className='p-3 bg-white/5 rounded-lg'>
                  <p className='text-white'>{speakingItem.submit}</p>
                </div>
              </div>

              <div className='mb-4'>
                <h4 className='text-blue-300 text-sm font-medium mb-2'>
                  분석 결과:
                </h4>
                <div className='p-3 bg-blue-500/10 rounded-lg border border-blue-400/30'>
                  <p className='text-blue-200 whitespace-pre-wrap'>
                    {speakingItem.markedText}
                  </p>
                </div>
              </div>

              <div className='flex items-center space-x-2 text-purple-300 text-sm'>
                <Music className='w-4 h-4' />
                <span>Music ID: {speakingItem.musicId}</span>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      // TEXT 기반 퀴즈 (GRAMMAR, VOCABULARY, READING)
      const textItem = historyItem as Comment;
      if (!textItem.quizList?.quizzes) return null;

      return (
        <div className='space-y-6'>
          {textItem.quizList.quizzes.map((quiz, index) => {
            const userAnswerIndex = textItem.submitAnswerList[index];
            const isCorrect = userAnswerIndex === quiz.answer;

            return (
              <div
                key={quiz.id}
                className='bg-white/5 rounded-xl p-4 border border-white/10'
              >
                <div className='flex items-start justify-between mb-3'>
                  <div className='flex items-center space-x-3'>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isCorrect ? 'bg-green-500/20' : 'bg-red-500/20'
                      }`}
                    >
                      {isCorrect ? (
                        <CheckCircle className='w-5 h-5 text-green-400' />
                      ) : (
                        <XCircle className='w-5 h-5 text-red-400' />
                      )}
                    </div>
                    <span className='text-white font-medium'>
                      문제 {index + 1}
                    </span>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      isCorrect
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {isCorrect ? '정답' : '오답'}
                  </span>
                </div>

                <div className='mb-4'>
                  <h3 className='text-white font-medium mb-3'>
                    {quiz.question}
                  </h3>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-2 mb-3'>
                    {quiz.optionList.map((option, optionIndex) => {
                      const isUserAnswer = optionIndex === userAnswerIndex;
                      const isCorrectAnswer = optionIndex === quiz.answer;

                      let optionClass = 'bg-white/5 text-purple-200';
                      if (isCorrectAnswer) {
                        optionClass =
                          'bg-green-500/20 text-green-400 border border-green-400/50';
                      } else if (isUserAnswer && !isCorrect) {
                        optionClass =
                          'bg-red-500/20 text-red-400 border border-red-400/50';
                      }

                      return (
                        <div
                          key={optionIndex}
                          className={`p-3 rounded-lg ${optionClass}`}
                        >
                          <div className='flex items-center space-x-2'>
                            <span className='text-sm font-medium'>
                              {String.fromCharCode(65 + optionIndex)}.
                            </span>
                            <span className='flex-1'>{option}</span>
                            {isCorrectAnswer && (
                              <CheckCircle className='w-4 h-4 text-green-400' />
                            )}
                            {isUserAnswer && !isCorrect && (
                              <XCircle className='w-4 h-4 text-red-400' />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 해설 */}
                {quiz.comment && (
                  <div className='bg-blue-500/10 rounded-lg p-3 border border-blue-400/30'>
                    <div className='flex items-start space-x-2'>
                      <AlertCircle className='w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0' />
                      <div>
                        <span className='text-blue-400 text-sm font-medium'>
                          해설:{' '}
                        </span>
                        <span className='text-purple-200 text-sm'>
                          {quiz.comment}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 정답률 표시 */}
                <div className='mt-3 text-right'>
                  <span className='text-purple-300 text-xs'>
                    정답률: {quiz.correctRate}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      );
    }
  };

  // 통계 계산
  const getStats = () => {
    if (quizType === 'LISTENING') {
      const listeningItem = historyItem as ListeningComment;
      const totalQuestions = listeningItem.listeningQuiz.answerList.length;
      const correctAnswers = listeningItem.submitAnswerList.filter(
        (answer, index) =>
          answer === listeningItem.listeningQuiz.answerList[index]
      ).length;
      const accuracy = Math.round((correctAnswers / totalQuestions) * 100);

      return { totalQuestions, correctAnswers, accuracy };
    } else if (quizType === 'SPEAKING') {
      return {
        totalQuestions: 1,
        correctAnswers: 1,
        accuracy: historyItem.score,
      };
    } else {
      const textItem = historyItem as Comment;
      const totalQuestions = textItem.quizList?.quizzes?.length || 0;
      const correctAnswers = textItem.submitAnswerList.filter(
        (answer, index) => answer === textItem.quizList.quizzes[index]?.answer
      ).length;
      const accuracy =
        totalQuestions > 0
          ? Math.round((correctAnswers / totalQuestions) * 100)
          : 0;

      return { totalQuestions, correctAnswers, accuracy };
    }
  };

  const stats = getStats();

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900'>
      <div className='relative z-10 md:ml-0 lg:ml-20 xl:ml-64 transition-all duration-300'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-8'>
          {/* 헤더 */}
          <div className='mb-8'>
            <button
              onClick={() => navigate('/history')}
              className='flex items-center space-x-2 text-purple-200 hover:text-white transition-colors mb-4'
            >
              <ArrowLeft className='w-5 h-5' />
              <span>히스토리로 돌아가기</span>
            </button>

            <div className='flex items-center space-x-3'>
              <div
                className={`p-3 bg-gradient-to-r ${typeConfig.color} rounded-xl`}
              >
                <TypeIcon className='w-6 h-6 text-white' />
              </div>
              <div>
                <h1 className='text-3xl font-bold text-white'>
                  {typeConfig.label} 학습 상세 기록
                </h1>
                <p className='text-purple-200'>
                  {new Date(historyItem.createdTime).toLocaleDateString(
                    'ko-KR',
                    {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    }
                  )}{' '}
                  학습 결과
                </p>
              </div>
            </div>
          </div>

          {/* 요약 카드 */}
          <div className='bg-white/5 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/10'>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
              <div className='text-center'>
                <div
                  className={`text-3xl font-bold ${getScoreColor(
                    historyItem.score
                  )}`}
                >
                  {historyItem.score}점
                </div>
                <div className='text-purple-200 text-sm'>총 점수</div>
              </div>
              <div className='text-center'>
                <div className='text-3xl font-bold text-white'>
                  {stats.accuracy}%
                </div>
                <div className='text-purple-200 text-sm'>정답률</div>
              </div>
              <div className='text-center'>
                <div className='text-3xl font-bold text-white'>
                  {stats.correctAnswers}/{stats.totalQuestions}
                </div>
                <div className='text-purple-200 text-sm'>정답/총 문제</div>
              </div>
              <div className='text-center'>
                <div className='text-3xl font-bold text-white'>
                  {typeConfig.label}
                </div>
                <div className='text-purple-200 text-sm'>학습 유형</div>
              </div>
            </div>
          </div>

          {/* 음악 정보 (TEXT 기반 퀴즈만) */}
          {quizType !== 'LISTENING' &&
            quizType !== 'SPEAKING' &&
            (historyItem as Comment).quizList && (
              <div className='bg-white/5 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/10'>
                <h2 className='text-xl font-semibold text-white mb-4'>
                  학습 정보
                </h2>
                <div className='flex items-center space-x-4'>
                  <div className='p-3 bg-purple-500/20 rounded-lg'>
                    <Music className='w-8 h-8 text-purple-400' />
                  </div>
                  <div>
                    <div className='text-white font-semibold'>
                      Level {(historyItem as Comment).quizList.level}
                    </div>
                    <div className='text-purple-200'>
                      Music ID: {(historyItem as Comment).quizList.musicId}
                    </div>
                  </div>
                </div>
              </div>
            )}

          {/* 문제별 상세 결과 */}
          <div className='bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10'>
            <h2 className='text-xl font-semibold text-white mb-6'>
              {quizType === 'SPEAKING'
                ? '말하기 연습 결과'
                : '문제별 상세 결과'}
            </h2>

            {renderQuizDetails()}
          </div>
        </div>
      </div>
    </div>
  );
}
