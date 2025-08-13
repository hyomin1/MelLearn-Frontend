import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}: PaginationProps) {
  // 페이지 번호 계산 로직
  const getPageNumbers = () => {
    const delta = 2; // 현재 페이지 주변에 보여줄 페이지 수
    const range = [];
    const rangeWithDots = [];

    // 시작과 끝 페이지 계산
    const start = Math.max(1, currentPage - delta);
    const end = Math.min(totalPages, currentPage + delta);

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    // 첫 페이지와 마지막 페이지 처리
    if (start > 1) {
      rangeWithDots.push(1);
      if (start > 2) {
        rangeWithDots.push('...');
      }
    }

    rangeWithDots.push(...range);

    if (end < totalPages) {
      if (end < totalPages - 1) {
        rangeWithDots.push('...');
      }
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers();

  return (
    <div className={`flex items-center justify-center space-x-1 ${className}`}>
      {/* 이전 페이지 버튼 */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`
          flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200
          ${
            currentPage === 1
              ? 'bg-white/5 text-purple-300 cursor-not-allowed'
              : 'bg-white/10 text-white hover:bg-white/20 hover:scale-105'
          }
        `}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* 페이지 번호들 */}
      {pageNumbers.map((pageNumber, index) => {
        if (pageNumber === '...') {
          return (
            <div
              key={`dots-${index}`}
              className="flex items-center justify-center w-10 h-10 text-purple-300"
            >
              <MoreHorizontal className="w-5 h-5" />
            </div>
          );
        }

        const isCurrentPage = pageNumber === currentPage;
        
        return (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber as number)}
            className={`
              flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 font-medium
              ${
                isCurrentPage
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg scale-105'
                  : 'bg-white/10 text-purple-200 hover:bg-white/20 hover:text-white hover:scale-105'
              }
            `}
          >
            {pageNumber}
          </button>
        );
      })}

      {/* 다음 페이지 버튼 */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`
          flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200
          ${
            currentPage === totalPages
              ? 'bg-white/5 text-purple-300 cursor-not-allowed'
              : 'bg-white/10 text-white hover:bg-white/20 hover:scale-105'
          }
        `}
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
