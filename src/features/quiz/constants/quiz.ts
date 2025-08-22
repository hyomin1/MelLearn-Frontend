import { BookOpen, FileText, Headphones, PenTool, Mic } from 'lucide-react';

// mockQuiz와 매칭되는 퀴즈 데이터 (5개 문제)
export const mockQuiz = {
  id: 1,
  level: 2,
  musicId: 'track123',
  quizzes: [
    {
      id: 1,
      correctRate: 75,
      question: '다음 문장에서 올바른 문법 형태를 선택하세요:',
      answer: 2,
      comment: '현재완료 시제는 have/has + 과거분사 형태로 사용됩니다.',
      optionList: [
        'I have went to the store yesterday.',
        'I have gone to the store already.',
        'I have go to the store now.',
        'I have going to the store.',
      ],
    },
    {
      id: 2,
      correctRate: 75,
      question: '빈칸에 들어갈 가장 적절한 전치사는?',
      answer: 1,
      comment: "시간을 나타낼 때는 'at'을 사용합니다.",
      optionList: ['at', 'on', 'in', 'by'],
    },
    {
      id: 3,
      correctRate: 75,
      question: '다음 중 복수형이 올바른 것은?',
      answer: 3,
      comment: 'child의 복수형은 children입니다.',
      optionList: ['childs', 'childes', 'children', 'child'],
    },
    {
      id: 4,
      correctRate: 75,
      question: '다음 문장에서 틀린 부분은?',
      answer: 2,
      comment:
        '"He don\'t like apples"에서 주어가 3인칭 단수이므로 "doesn\'t"를 사용해야 합니다.',
      optionList: [
        'She likes apples.',
        "He don't like apples.",
        'They like apples.',
        'We like apples.',
      ],
    },
    {
      id: 5,
      question:
        '빈칸에 들어갈 적절한 단어는? "I am looking forward ___ hearing from you."',
      correctRate: 75,
      answer: 4,

      comment:
        '"look forward to"는 전치사 to를 사용하는 숙어입니다. to 다음에는 동명사(-ing)가 옵니다.',
      optionList: ['for', 'at', 'in', 'to'],
    },
  ],
};

// Comment 인터페이스에 맞는 mock 데이터 (위 퀴즈와 매칭)
export const mockComment = {
  id: 1,
  quizList: {
    id: 1,
    level: 2,
    musicId: 'track123',
    score: 80,
    quizzes: [
      {
        id: 1,
        question: '다음 문장에서 올바른 문법 형태를 선택하세요:',
        answer: 2,
        comment: '현재완료 시제는 have/has + 과거분사 형태로 사용됩니다.',
        optionList: [
          'I have went to the store yesterday.',
          'I have gone to the store already.',
          'I have go to the store now.',
          'I have going to the store.',
        ],
      },
      {
        id: 2,
        question: '빈칸에 들어갈 가장 적절한 전치사는?',
        answer: 1,
        comment: "시간을 나타낼 때는 'at'을 사용합니다.",
        optionList: ['at', 'on', 'in', 'by'],
      },
      {
        id: 3,
        question: '다음 중 복수형이 올바른 것은?',
        answer: 3,
        comment: 'child의 복수형은 children입니다.',
        optionList: ['childs', 'childes', 'children', 'child'],
      },
      {
        id: 4,
        question: '다음 문장에서 틀린 부분은?',
        answer: 2,
        comment:
          '"He don\'t like apples"에서 주어가 3인칭 단수이므로 "doesn\'t"를 사용해야 합니다.',
        optionList: [
          'She likes apples.',
          "He don't like apples.",
          'They like apples.',
          'We like apples.',
        ],
      },
      {
        id: 5,
        question:
          '빈칸에 들어갈 적절한 단어는? "I am looking forward ___ hearing from you."',
        answer: 4,
        comment:
          '"look forward to"는 전치사 to를 사용하는 숙어입니다. to 다음에는 동명사(-ing)가 옵니다.',
        optionList: ['for', 'at', 'in', 'to'],
      },
    ],
  },
  submitAnswerList: [2, 1, 2, 2, 4], // 사용자가 선택한 답 (정답: [2, 1, 3, 2, 4])
};

// 다른 점수대의 mock 데이터들
export const mockCommentHighScore = {
  id: 2,
  quizList: {
    id: 2,
    level: 3,
    musicId: 'track456',
    score: 95,
    quizzes: [
      {
        id: 1,
        question: 'Choose the correct conditional sentence:',
        answer: 1,
        comment:
          'Second conditional uses "would + base verb" in the main clause and simple past in the if-clause.',
        optionList: [
          'If I had money, I would buy a car.',
          'If I have money, I will bought a car.',
          'If I had money, I will buy a car.',
          'If I have money, I would buy a car.',
        ],
      },
      {
        id: 2,
        question: 'Select the passive voice form:',
        answer: 3,
        comment:
          'Passive voice in present perfect: has/have + been + past participle.',
        optionList: [
          'The book has written by him.',
          'The book has been writing by him.',
          'The book has been written by him.',
          'The book been written by him.',
        ],
      },
    ],
  },
  submitAnswerList: [1, 3],
};

export const mockCommentLowScore = {
  id: 3,
  quizList: {
    id: 3,
    level: 1,
    musicId: 'track789',
    score: 40,
    quizzes: [
      {
        id: 1,
        question: 'What is the plural of "cat"?',
        answer: 2,
        comment: '일반적인 명사의 복수형은 끝에 -s를 붙입니다.',
        optionList: ['cat', 'cats', 'cates', 'catses'],
      },
      {
        id: 2,
        question: 'Choose the correct verb form: "She ___ every day."',
        answer: 1,
        comment: '3인칭 단수 현재형에서는 동사 끝에 -s를 붙입니다.',
        optionList: ['runs', 'run', 'running', 'ran'],
      },
      {
        id: 3,
        question: 'What is the past tense of "go"?',
        answer: 3,
        comment: '"go"의 과거형은 불규칙 변화로 "went"입니다.',
        optionList: ['goed', 'goes', 'went', 'going'],
      },
    ],
  },
  submitAnswerList: [1, 2, 1], // 많이 틀린 경우 (정답: [2, 1, 3])
};

// 카테고리별 mock 데이터
export const mockCommentByCategory = {
  listening: {
    id: 4,
    quizList: {
      id: 4,
      level: 2,
      musicId: 'audio123',
      score: 75,
      quizzes: [
        {
          id: 1,
          question: 'What did the speaker say about the weather?',
          answer: 2,
          comment: '화자는 "It\'s going to rain tomorrow"라고 말했습니다.',
          optionList: [
            'It will be sunny.',
            'It will rain tomorrow.',
            'It is snowing now.',
            'The weather is perfect.',
          ],
        },
      ],
    },
    submitAnswerList: [1],
  },
  reading: {
    id: 5,
    quizList: {
      id: 5,
      level: 2,
      musicId: 'text456',
      score: 85,
      quizzes: [
        {
          id: 1,
          question: 'What is the main idea of the passage?',
          answer: 3,
          comment: '지문의 주요 내용은 환경 보호의 중요성에 관한 것입니다.',
          optionList: [
            'Technology advancement',
            'Economic growth',
            'Environmental protection',
            'Social media impact',
          ],
        },
      ],
    },
    submitAnswerList: [3],
  },
  writing: {
    id: 6,
    quizList: {
      id: 6,
      level: 3,
      musicId: 'essay789',
      score: 70,
      quizzes: [
        {
          id: 1,
          question: 'Choose the best topic sentence for this paragraph:',
          answer: 1,
          comment: '단락의 주제문은 전체 내용을 포괄하면서 명확해야 합니다.',
          optionList: [
            'Online learning has many advantages.',
            'Students like computers.',
            'Education is important.',
            'Schools are changing.',
          ],
        },
      ],
    },
    submitAnswerList: [2],
  },
  speaking: {
    id: 7,
    quizList: {
      id: 7,
      level: 1,
      musicId: 'speech101',
      score: 90,
      quizzes: [
        {
          id: 1,
          question: 'Which pronunciation is correct for "though"?',
          answer: 2,
          comment:
            '"though"는 /ðoʊ/로 발음됩니다. "th"는 유성음 /ð/로 발음해야 합니다.',
          optionList: ['/toʊ/', '/ðoʊ/', '/θoʊ/', '/doʊ/'],
        },
      ],
    },
    submitAnswerList: [2],
  },
};

export const CATEGORIES = [
  'grammar',
  'listening',
  'reading',
  'vocabulary',
  'speaking',
];

export const CATEGORY_ICONS = {
  listening: Headphones,
  grammar: BookOpen,
  reading: FileText,
  writing: PenTool,
  speaking: Mic,
};

export const CATEGORY_COLORS = {
  listening: 'from-blue-500 to-cyan-500',
  grammar: 'from-green-500 to-emerald-500',
  reading: 'from-purple-500 to-violet-500',
  writing: 'from-orange-500 to-red-500',
  speaking: 'from-pink-500 to-rose-500',
};
