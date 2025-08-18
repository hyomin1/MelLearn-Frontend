export const ROUTES = {
  ARTIST_DETAIL: (id: string) => `/artist/${id}`,
  TRACK_DETAIL: (id: string) => `/track/${id}`,
  QUIZ: (id: string) => `/quiz/${id}`,
  QUIZ_SOLVE: (category: string, id: string) => `/quiz/${category}/${id}`,
  QUIZ_RESULT: (category: string, id: string) =>
    `/quiz/${category}/result/${id}`,
  HISTORY_DETAIL: (quizType: string, id: string) =>
    `/history/${quizType}/${id}`,
  MOCK_EXAM: (id: string) => `/mock-exam/${id}`,
  MOCK_EXAM_GRAMMAR: (id: string) => `/mock-exam/${id}/grammar`,
  MOCK_EXAM_READING: (id: string) => `/mock-exam/${id}/reading`,
  MOCK_EXAM_VOCABULARY: (id: string) => `/mock-exam/${id}/vocabulary`,
  MOCK_EXAM_LISTENING: (id: string) => `/mock-exam/${id}/listening`,
  MOCK_EXAM_SPEAKING: (id: string) => `/mock-exam/${id}/speaking`,
  MOCK_EXAM_RESULT: (id: string) => `/mock-exam/${id}/result`,

  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  SPOTIFY_CALLBACK: '/callback',
  SPOTIFY_LOGIN: '/spotify-login',
  ARTISTS: '/artists',
  TRACKS: '/tracks',
  SETTING: '/setting',
  HISTORY: '/history',
};
