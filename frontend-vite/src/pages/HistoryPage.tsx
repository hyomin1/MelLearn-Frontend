import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Clock,
  BookOpen,
  Volume2,
  Headphones,
  Mic,
  PenTool,
  Calendar,
  Trophy,
  Target,
  Music,
  ArrowUp,
  ArrowDown,
  ChevronRight,
} from 'lucide-react';
import useHistory from '@/features/history/hooks/useHistory';
import Pagination from '@/components/Pagination';
import { ROUTES } from '@/services/router/routes';

import type {
  Comment,
  ListeningComment,
  SpeakingComment,
} from '@/features/quiz/types/quiz';
import type { QuizType } from '@/features/history/types/history';

// 학습 유형 정의 (QuizType과 동일)
type LearningType = QuizType;

// 정렬 옵션 정의
type SortOption = 'date' | 'score';
type SortOrder = 'asc' | 'desc';

// 학습 유형별 설정
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
  READING: { icon: Volume2, label: '읽기', color: 'from-pink-500 to-rose-500' },
  SPEAKING: { icon: Mic, label: '말하기', color: 'from-red-500 to-pink-500' },
};

export default function HistoryPage() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<LearningType>('GRAMMAR');
  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState<SortOption>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const { history, isLoading, error } = useHistory(page, selectedType);

  // 학습 유형이 변경되면 페이지를 1로 리셋
  useEffect(() => {
    setPage(0);
  }, [selectedType]);

  // 히스토리 아이템 클릭 핸들러
  const handleHistoryItemClick = (item: Comment | ListeningComment | SpeakingComment) => {
    const itemId = item.id?.toString() || '1'; // ID가 없는 경우 기본값 사용
    navigate(ROUTES.HISTORY_DETAIL(selectedType.toLowerCase(), itemId));
  };

  // 페이지 변경 핸들러
  const handlePageChange = (newPage: number) => {
    setPage(newPage - 1); // API는 0-based index를 사용
  };

  // 통계 계산
  const stats = useMemo(() => {
    if (!history || !history.content) {
      return {
        totalQuizzes: 0,
        averageScore: 0,
        bestScore: 0,
        totalStudyTime: 0,
      };
    }

    const scores = history.content.map((item) => item.score);
    return {
      totalQuizzes: history.totalElements || 0,
      averageScore:
        scores.length > 0
          ? Math.round(
              scores.reduce((sum, score) => sum + score, 0) / scores.length
            )
          : 0,
      bestScore: scores.length > 0 ? Math.max(...scores) : 0,
      totalStudyTime: history.content.length * 10,
    };
  }, [history]);

  const sortedHistory = useMemo(() => {
    if (!history || !history.content) return [];

    return [...history.content].sort((a, b) => {
      if (sortBy === 'score') {
        return sortOrder === 'asc' ? a.score - b.score : b.score - a.score;
      } else {
        const dateA = new Date(a.createdTime).getTime();
        const dateB = new Date(b.createdTime).getTime();

        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      }
    });
  }, [history, sortBy, sortOrder]);

  const handleSortChange = (newSortBy: SortOption) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('desc');
    }
  };

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

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900'>
      <div className='relative z-10 md:ml-0 lg:ml-20 xl:ml-64 transition-all duration-300'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8'>
          {/* 헤더 섹션 */}
          <div className='mb-8'>
            <div className='flex items-center space-x-3 mb-4'>
              <div className='p-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl'>
                <Clock className='w-6 h-6 text-white' />
              </div>
              <div>
                <h1 className='text-3xl font-bold text-white'>학습 히스토리</h1>
                <p className='text-purple-200'>
                  당신의 학습 기록을 확인해보세요
                </p>
              </div>
            </div>
          </div>

          {/* 통계 카드 섹션 */}
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8'>
            <div className='bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20'>
              <div className='text-2xl font-bold text-white'>
                {stats.totalQuizzes}
              </div>
              <div className='text-purple-200 text-sm'>총 퀴즈</div>
            </div>
            <div className='bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20'>
              <div className='text-2xl font-bold text-white'>
                {stats.averageScore}점
              </div>
              <div className='text-purple-200 text-sm'>평균 점수</div>
            </div>
            <div className='bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20'>
              <div className='text-2xl font-bold text-white'>
                {stats.bestScore}점
              </div>
              <div className='text-purple-200 text-sm'>최고 점수</div>
            </div>
          </div>

          {/* 필터 섹션 */}
          <div className='bg-white/5 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/10'>
            <h2 className='text-xl font-semibold text-white mb-4'>
              학습 유형 선택
            </h2>
            <div className='flex flex-wrap gap-3'>
              {(
                Object.entries(learningTypeConfig) as [
                  LearningType,
                  typeof learningTypeConfig.GRAMMAR
                ][]
              ).map(([type, config]) => {
                const IconComponent = config.icon;
                const isSelected = selectedType === type;

                return (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                      isSelected
                        ? `bg-gradient-to-r ${config.color} text-white shadow-lg scale-105`
                        : 'bg-white/10 text-purple-200 hover:bg-white/20 hover:text-white'
                    }`}
                  >
                    <IconComponent className='w-4 h-4' />
                    <span className='font-medium'>{config.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 히스토리 리스트 섹션 */}
          <div className='bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10'>
            <div className='flex items-center justify-between mb-6'>
              <h2 className='text-xl font-semibold text-white'>
                {learningTypeConfig[selectedType].label} 학습 기록
              </h2>
              <div className='flex items-center space-x-4'>
                {/* 정렬 옵션 */}
                <div className='flex items-center space-x-2'>
                  <button
                    onClick={() => handleSortChange('date')}
                    className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm transition-all duration-300 ${
                      sortBy === 'date'
                        ? 'bg-purple-500/30 text-white border border-purple-400/50'
                        : 'bg-white/10 text-purple-200 hover:bg-white/20 hover:text-white'
                    }`}
                  >
                    <Calendar className='w-3 h-3' />
                    <span>날짜</span>
                    {sortBy === 'date' &&
                      (sortOrder === 'desc' ? (
                        <ArrowDown className='w-3 h-3' />
                      ) : (
                        <ArrowUp className='w-3 h-3' />
                      ))}
                  </button>

                  <button
                    onClick={() => handleSortChange('score')}
                    className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm transition-all duration-300 ${
                      sortBy === 'score'
                        ? 'bg-purple-500/30 text-white border border-purple-400/50'
                        : 'bg-white/10 text-purple-200 hover:bg-white/20 hover:text-white'
                    }`}
                  >
                    <Trophy className='w-3 h-3' />
                    <span>점수</span>
                    {sortBy === 'score' &&
                      (sortOrder === 'desc' ? (
                        <ArrowDown className='w-3 h-3' />
                      ) : (
                        <ArrowUp className='w-3 h-3' />
                      ))}
                  </button>
                </div>

                <div className='text-purple-200 text-sm'>
                  {history?.totalElements || 0}개의 기록
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className='text-center py-12'>
                <div className='text-purple-300 text-lg mb-2'>로딩 중...</div>
              </div>
            ) : error ? (
              <div className='text-center py-12'>
                <div className='text-red-400 text-lg mb-2'>
                  데이터를 불러오는 데 실패했습니다
                </div>
                <div className='text-purple-400 text-sm'>다시 시도해주세요</div>
              </div>
            ) : !history || !history.content || history.content.length === 0 ? (
              <div className='text-center py-12'>
                <div className='text-purple-300 text-lg mb-2'>
                  학습 기록이 없습니다
                </div>
                <div className='text-purple-400 text-sm'>
                  첫 번째 퀴즈를 시작해보세요!
                </div>
              </div>
            ) : (
              <div className='space-y-4'>
                {sortedHistory.map((item, index) => {
                  const typeConfig = learningTypeConfig[selectedType];
                  const TypeIcon = typeConfig.icon;

                  // 데이터 타입에 따른 정보 추출
                  let title = '';
                  let musicInfo = '';
                  let createdDate = '';

                  if (selectedType === 'LISTENING') {
                    const listeningItem = item as ListeningComment; // ListeningComment
                    title = `듣기 학습 - Level ${listeningItem.level}`;
                    musicInfo = `듣기 연습`;
                    createdDate = new Date(
                      listeningItem.createdTime
                    ).toLocaleDateString('ko-KR');
                  } else if (selectedType === 'SPEAKING') {
                    const speakingItem = item as SpeakingComment; // SpeakingComment
                    title = `말하기 학습`;
                    musicInfo = `Music ID: ${speakingItem.musicId}`;
                    createdDate = new Date(
                      speakingItem.createdTime
                    ).toLocaleDateString('ko-KR');
                  } else {
                    // TextHistory (READING, VOCABULARY, GRAMMAR)
                    const textItem = item as Comment; // Comment
                    const quizType =
                      selectedType === 'READING'
                        ? '읽기'
                        : selectedType === 'VOCABULARY'
                        ? '어휘'
                        : '문법';
                    title = `${quizType} 퀴즈 - Level ${
                      textItem.quizList?.level || 'N/A'
                    }`;
                    musicInfo = `Music ID: ${
                      textItem.quizList?.musicId || 'N/A'
                    }`;
                    createdDate = new Date(
                      textItem.createdTime
                    ).toLocaleDateString('ko-KR');
                  }

                  return (
                    <button
                      key={item.id || index}
                      onClick={() => handleHistoryItemClick(item)}
                      className='w-full bg-white/5 rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10 cursor-pointer text-left'
                    >
                      <div className='flex items-start justify-between'>
                        <div className='flex items-start space-x-4'>
                          <div
                            className={`p-2 bg-gradient-to-r ${typeConfig.color} rounded-lg flex-shrink-0`}
                          >
                            <TypeIcon className='w-5 h-5 text-white' />
                          </div>

                          <div className='flex-1 min-w-0'>
                            <div className='flex items-center space-x-2 mb-1'>
                              <h3 className='text-lg font-semibold text-white truncate'>
                                {title}
                              </h3>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreBg(
                                  item.score
                                )} ${getScoreColor(item.score)}`}
                              >
                                {item.score}점
                              </span>
                            </div>

                            <div className='text-purple-200 text-sm mb-2'>
                              <div className='flex items-center space-x-1'>
                                <Music className='w-3 h-3' />
                                <span>{musicInfo}</span>
                              </div>
                            </div>

                            <div className='flex items-center space-x-4 text-purple-300 text-xs'>
                              <div className='flex items-center space-x-1'>
                                <Calendar className='w-3 h-3' />
                                <span>{createdDate}</span>
                              </div>
                              <div className='flex items-center space-x-1'>
                                <Target className='w-3 h-3' />
                                <span>{typeConfig.label}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className='flex items-center space-x-2 flex-shrink-0 ml-4'>
                          {item.score >= 90 && (
                            <div className='p-1 bg-yellow-500/20 rounded-full'>
                              <Trophy className='w-4 h-4 text-yellow-400' />
                            </div>
                          )}
                          <ChevronRight className='w-5 h-5 text-purple-300' />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* 페이지네이션 */}
            {history && history.totalPages > 1 && (
              <div className='mt-8 pt-6 border-t border-white/10'>
                <Pagination
                  currentPage={page + 1} // UI는 1-based index 사용
                  totalPages={history.totalPages}
                  onPageChange={handlePageChange}
                  className='justify-center'
                />
                
                {/* 페이지 정보 */}
                <div className="text-center mt-4 text-purple-300 text-sm">
                  {history.totalElements > 0 && (
                    <span>
                      {page * 10 + 1}-{Math.min((page + 1) * 10, history.totalElements)}개 / 총 {history.totalElements}개
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
