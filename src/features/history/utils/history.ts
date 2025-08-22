import type {
  Comment,
  CommentData,
  ListeningComment,
} from '@/features/quiz/types/quiz';
import type { HistoryData, QuizType } from '../types/history';

type SortOption = 'date' | 'score';
type SortOrder = 'asc' | 'desc';

export const calculateHistoryStats = (history?: HistoryData) => {
  if (!history || !history.content || history.content.length === 0) {
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
};

export const sortHistoryData = (
  sortBy: SortOption,
  sortOrder: SortOrder,
  history?: HistoryData
) => {
  if (!history || !history.content || history.content.length === 0) return [];

  return [...history.content].sort((a, b) => {
    if (sortBy === 'score') {
      return sortOrder === 'asc' ? a.score - b.score : b.score - a.score;
    }
    const dateA = new Date(a.createdTime).getTime();
    const dateB = new Date(b.createdTime).getTime();
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });
};

export const getStats = (quizType: QuizType, comment: CommentData) => {
  if (quizType === 'LISTENING') {
    const listeningItem = comment as ListeningComment;
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
      accuracy: comment.score,
    };
  } else {
    const textItem = comment as Comment;
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
