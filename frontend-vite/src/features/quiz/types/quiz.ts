export interface Quiz {
  answer: number;
  comment: string;
  correctRate: number;
  id: number;
  optionList: string[];
  question: string;
}

export interface Comment {
  id: number;
  quizList: {
    id: number;
    level: number;
    musicId: string;
    score: number;
    quizzes: Quiz[];
  };
  submitAnswerList: number[];
}
