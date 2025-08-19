import type { MockExam } from '@/features/mock-exam/types/mockExam';
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
    }),
    {
      name: 'mock-exam',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) =>
        ({
          mockExam: state.mockExam,
          mockExamProgress: state.mockExamProgress,
        } as MockExamState),
    }
  )
);
