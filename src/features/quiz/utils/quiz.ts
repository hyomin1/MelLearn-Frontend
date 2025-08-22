import { BookOpen } from 'lucide-react';
import { CATEGORY_COLORS, CATEGORY_ICONS } from '../constants/quiz';

export const getLevel = (level: number) => {
  switch (level) {
    case 1:
      return '초급';
    case 2:
      return '중급';
    case 3:
      return '고급';
    default:
      return '초급';
  }
};
export const getLevelColor = (level: number) => {
  switch (level) {
    case 1:
      return 'text-green-400';
    case 2:
      return 'text-yellow-400';
    case 3:
      return 'text-red-400';
    default:
      return 'text-green-400';
  }
};
export const getScoreColor = (score: number) => {
  if (score >= 80) return 'text-emerald-500';
  if (score >= 60) return 'text-yellow-500';
  return 'text-red-500';
};

export const getScoreMessage = (score: number) => {
  if (score >= 90) return '완벽해요! 🎉';
  if (score >= 80) return '잘했어요! 👏';
  if (score >= 60) return '좋아요! 💪';
  return '다시 도전해보세요! 📚';
};
export function getCategoryFromPath(pathname: string): string {
  return pathname.split('/')[2] || '';
}

export function getCategoryIcon(category: string) {
  return CATEGORY_ICONS[category as keyof typeof CATEGORY_ICONS] || BookOpen;
}

export function getCategoryColor(category: string) {
  return (
    CATEGORY_COLORS[category as keyof typeof CATEGORY_COLORS] ||
    'from-green-500 to-emerald-500'
  );
}
