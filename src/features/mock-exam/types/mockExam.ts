import type {
  ListeningQuiz,
  Quiz,
  SpeakingComment,
} from '@/features/quiz/types/quiz';

export interface MockExam {
  grammarQuiz: TextMockExam;
  readingQuiz: TextMockExam;
  vocaQuiz: TextMockExam;
  listeningQuizDto: ListeningQuiz;
  speakingQuiz: SpeakingComment;
}

interface TextMockExam {
  id: number;
  level: number;
  musicId: string;
  quizzes: Quiz[];
}
