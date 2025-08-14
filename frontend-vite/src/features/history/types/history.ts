import type {
  Comment,
  ListeningComment,
  SpeakingComment,
} from '@/features/quiz/types/quiz';

export type QuizType =
  | 'READING'
  | 'VOCABULARY'
  | 'GRAMMAR'
  | 'LISTENING'
  | 'SPEAKING';

export type SortOption = 'date' | 'score';
export type SortOrder = 'asc' | 'desc';

export type HistoryData = TextHistory | ListeningHistory | SpekaingHistory;

interface History {
  empty: boolean;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
}

export interface TextHistory extends History {
  // reading, vocabulary, grammar
  content: Comment[];
}

export interface ListeningHistory extends History {
  content: ListeningComment[];
}

export interface SpekaingHistory extends History {
  content: SpeakingComment[];
}
