export const ROUTES = {
  ARTIST_DETAIL: (id: string) => `/artist/${id}`,
  TRACK_DETAIL: (id: string) => `/track/${id}`,
  QUIZ: (id: string) => `/quiz/${id}`,
  QUIZ_SOLVE: (category: string, id: string) => `/quiz/${category}/${id}`,
  QUIZ_RESULT: (category: string, id: string) =>
    `/quiz/${category}/result/${id}`,
  HISTORY_DETAIL: (quizType: string, id: string) => `/history/${quizType}/${id}`,

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
