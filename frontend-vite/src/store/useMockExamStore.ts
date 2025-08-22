import type { MockExam } from '@/features/mock-exam/types/mockExam';
import type {
  Comment,
  ListeningComment,
  SpeakingComment,
} from '@/features/quiz/types/quiz';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface MockExamProgress {
  completed: boolean;
  answers?: number[] | string[];
}

interface MockExamState {
  mockExam: MockExam | null;
  setMockExam: (mockExam: MockExam) => void;

  mockExamProgress: {
    grammar: MockExamProgress;
    reading: MockExamProgress;
    vocabulary: MockExamProgress;
    listening: MockExamProgress;
  };
  speaking: Blob | null;
  setSpeaking: (speaking: Blob) => void;
  setMockExamProgress: (category: string, progress: MockExamProgress) => void;

  mockExamResult: {
    grammarSubmit: Comment | null;
    readingSubmit: Comment | null;
    vocabularySubmit: Comment | null;
    listeningSubmit: ListeningComment | null;
    speakingSubmit: SpeakingComment | null;
  };

  setMockExamResult: (mockExamResult: MockExamState['mockExamResult']) => void;
}

export const useMockExamStore = create(
  persist<MockExamState>(
    (set) => ({
      mockExam: null,
      setMockExam: (mockExam) => set({ mockExam }),
      mockExamProgress: {
        grammar: { completed: false, answers: [] },
        reading: { completed: false, answers: [] },
        vocabulary: { completed: false, answers: [] },
        listening: { completed: false, answers: [] },
      },
      setMockExamProgress: (category, progress) =>
        set((state) => ({
          mockExamProgress: {
            ...state.mockExamProgress,
            [category]: progress,
          },
        })),
      speaking: null,
      setSpeaking: (speaking) => set({ speaking }),
      mockExamResult: {
        grammarSubmit: null,
        readingSubmit: null,
        vocabularySubmit: null,
        listeningSubmit: null,
        speakingSubmit: null,
      },
      setMockExamResult: (mockExamResult) => set({ mockExamResult }),
    }),
    {
      name: 'mock-exam',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) =>
        ({
          mockExam: state.mockExam,
          mockExamProgress: state.mockExamProgress,
          mockExamResult: state.mockExamResult,
        } as MockExamState),
    }
  )
);
