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

export interface Comment {
  id: number;
  createdTime: string;

  quizList: {
    id: number;
    level: number;
    musicId: string;
    quizzes: Quiz[];
  };
  score: number;
  submitAnswerList: number[];
}

export interface ListeningComment {
  id: number;
  createdTime: string;

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

export interface SpeakingComment {
  createdTime: string;
  id: number;
  musicId: string;
  submit: string;
  markedText: string;
  score: number;
}
export type CommentData = SpeakingComment | ListeningComment | Comment;
export interface Rank {
  id: number;
  musicId: string;
  score_list: Record<string, number>;
}
