import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useHistory from '@/features/history/hooks/useHistory';
import Pagination from '@/components/Pagination';
import { ROUTES } from '@/services/router/routes';

import type { CommentData } from '@/features/quiz/types/quiz';
import {
  calculateHistoryStats,
  sortHistoryData,
} from '@/features/history/utils/history';
import type {
  QuizType,
  SortOption,
  SortOrder,
} from '@/features/history/types/history';
import StatSection from '@/features/history/components/StatSection';
import HistoryItem from '@/features/history/components/HistoryItem';
import SortBar from '@/features/history/components/SortBar';
import FilterSection from '@/features/history/components/FilterSection';

export default function HistoryPage() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<QuizType>('GRAMMAR');
  const [page, setPage] = useState(0);
  const [sortOption, setSortOption] = useState<SortOption>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const { history, isLoading, error } = useHistory(page, selectedType);

  useEffect(() => {
    setPage(0);
  }, [selectedType]);

  const handleHistoryItemClick = (comment: CommentData) => {
    const commentId = comment.id?.toString() || '1';
    navigate(ROUTES.HISTORY_DETAIL(selectedType.toLowerCase(), commentId), {
      state: { page },
    });
  };

  const stats = useMemo(() => calculateHistoryStats(history), [history]);
  const sortedHistory = useMemo(
    () => sortHistoryData(sortOption, sortOrder, history),
    [history, sortOption, sortOrder]
  );

  const handleSortChange = (newSortOption: SortOption) => {
    if (sortOption === newSortOption) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortOption(newSortOption);
      setSortOrder('desc');
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900'>
      <div className='relative z-10 md:ml-0 lg:ml-20 xl:ml-64 transition-all duration-300'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8'>
          <StatSection stats={stats} />
          <FilterSection
            selectedType={selectedType}
            onClick={setSelectedType}
          />

          <div className='bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10'>
            <div className='flex items-center justify-between mb-6'>
              <h2 className='text-xl font-semibold text-white'>
                {selectedType} 학습 기록
              </h2>
              <SortBar
                sortOption={sortOption}
                sortOrder={sortOrder}
                onChange={handleSortChange}
              />
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
                {sortedHistory.map((history) => (
                  <HistoryItem
                    key={history.id}
                    history={history}
                    handleClick={handleHistoryItemClick}
                  />
                ))}
              </div>
            )}

            {history && history.totalPages > 1 && (
              <div className='mt-8 pt-6 border-t border-white/10'>
                <Pagination
                  currentPage={page + 1}
                  totalPages={history.totalPages}
                  onPageChange={(newPage) => setPage(newPage - 1)}
                  className='justify-center'
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
