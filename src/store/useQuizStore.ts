import { create } from 'zustand';
import type {
  Comment,
  ListeningComment,
  ListeningQuiz,
  Quiz,
  SpeakingComment,
} from '@/features/quiz/types/quiz';

interface QuizState {
  quiz: Quiz[];
  setQuiz: (quiz: Quiz[]) => void;
  comment: Comment | null;
  setComment: (result: Comment) => void;
  listeningQuiz: ListeningQuiz | null;
  setListeningQuiz: (quiz: ListeningQuiz) => void;
  listeningComment: ListeningComment | null;
  setListeningComment: (result: ListeningComment) => void;
  speakingComment: SpeakingComment | null;
  setSpeakingComment: (result: SpeakingComment) => void;
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
  speakingComment: null,
  setSpeakingComment: (speakingComment) => set({ speakingComment }),
}));
