import { create } from 'zustand';
import type {
  ListeningQuiz,
  ListeningQuizResult,
  Quiz,
  QuizResult,
} from '@/features/quiz/types/quiz';

interface QuizState {
  quiz: Quiz[];
  setQuiz: (quiz: Quiz[]) => void;
  comment: QuizResult | null;
  setComment: (result: QuizResult) => void;
  listeningQuiz: ListeningQuiz | null;
  setListeningQuiz: (quiz: ListeningQuiz) => void;
  listeningComment: ListeningQuizResult | null;
  setListeningComment: (result: ListeningQuizResult) => void;
}

export const useQuizStore = create<QuizState>((set) => ({
  quiz: [],
  setQuiz: (quiz) => set({ quiz }),
  comment: null,
  setComment: (comment) => set({ comment }),
  listeningQuiz: null,
  setListeningQuiz: (listeningQuiz) => set({ listeningQuiz }),
  listeningComment: null,
  setListeningComment: (listeningComment) => set({ listeningComment }),
}));
