export interface Quiz {
  id: number;
  question: string;
  optionList: string[];
  answer: number;
  correctRate: number;
  comment: string;
}

export interface ListeningQuiz {
  id: number;
  blankedText: string;
  answerList: string[];
}

export interface QuizResult {
  id: number;
  quizList: {
    id: number;
    level: number;
    musicId: string;
    quizzes: Quiz[];
  };
  score: number;
  submitAnswerList: number[];
}

export interface ListeningQuizResult {
  id: number;
  listeningQuiz: ListeningQuiz;
  level: string;
  submitAnswerList: string[];
  score: number;
}

export type SubmitQuizParams =
  | {
      category: 'reading' | 'writing' | 'grammar';
      answers: number[];
    }
  | {
      category: 'listening';
      submitWordList: string[];
    };
