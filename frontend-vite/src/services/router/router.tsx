import { ROUTES } from './routes';

import HomePage from '@/pages/HomePage';
import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '@/pages/auth/LoginPage';
import SignupPage from '@/pages/auth/SignupPage';
import SpotifyLoginPage from '@/features/spotify/SpotifyLoginPage';
import SpotifyCallbackPage from '@/features/spotify/SpotifyCallbackPage';
import ArtistListPage from '@/pages/artist/ArtistListPage';
import ArtistDetailPage from '@/pages/artist/ArtistDetailPage';
import TrackListPage from '@/pages/track/TrackListPage';
import TrackDetailPage from '@/pages/track/TrackDetailPage';
import QuizRouter from '@/pages/quiz/router/QuizRouter';
import QuizResultRouter from '@/pages/quiz/router/QuizResultRouter';
import NotFound from '@/pages/NotFound';
import App from '@/App';
import QuizPage from '@/pages/quiz/QuizPage';
import SettingPage from '@/pages/SettingPage';
import HistoryPage from '@/pages/history/HistoryPage';
import HistoryDetailPage from '@/pages/history/HistoryDetailPage';
import MockExamPage from '@/pages/mock-exam/MockExamPage';
import MockExamGrammarPage from '@/pages/mock-exam/MockExamGrammarPage';
import MockExamReadingPage from '@/pages/mock-exam/MockExamReadingPage';
import MockExamVocabularyPage from '@/pages/mock-exam/MockExamVocabularyPage';
import MockExamListeningPage from '@/pages/mock-exam/MockExamListeningPage';
import MockExamSpeakingPage from '@/pages/mock-exam/MockExamSpeakingPage';
import MockExamResultPage from '@/pages/mock-exam/MockExamResultPage';

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <App />,
    children: [
      { path: ROUTES.HOME, element: <HomePage /> },
      { path: ROUTES.LOGIN, element: <LoginPage /> },
      { path: ROUTES.SIGNUP, element: <SignupPage /> },
      { path: ROUTES.SPOTIFY_LOGIN, element: <SpotifyLoginPage /> },
      { path: ROUTES.SPOTIFY_CALLBACK, element: <SpotifyCallbackPage /> },
      { path: ROUTES.ARTISTS, element: <ArtistListPage /> },
      { path: ROUTES.ARTIST_DETAIL(':id'), element: <ArtistDetailPage /> },
      { path: ROUTES.TRACKS, element: <TrackListPage /> },
      { path: ROUTES.TRACK_DETAIL(':id'), element: <TrackDetailPage /> },
      {
        path: ROUTES.QUIZ(':id'),
        element: <QuizPage />,
      },
      { path: ROUTES.QUIZ_SOLVE(':category', ':id'), element: <QuizRouter /> },
      {
        path: ROUTES.QUIZ_RESULT(':category', ':id'),
        element: <QuizResultRouter />,
      },
      {
        path: ROUTES.SETTING,
        element: <SettingPage />,
      },
      {
        path: ROUTES.HISTORY,
        element: <HistoryPage />,
      },
      {
        path: ROUTES.HISTORY_DETAIL(':quizType', ':id'),
        element: <HistoryDetailPage />,
      },
      {
        path: ROUTES.MOCK_EXAM(':id'),
        element: <MockExamPage />,
      },
      {
        path: ROUTES.MOCK_EXAM_GRAMMAR(':id'),
        element: <MockExamGrammarPage />,
      },
      {
        path: ROUTES.MOCK_EXAM_READING(':id'),
        element: <MockExamReadingPage />,
      },
      {
        path: ROUTES.MOCK_EXAM_VOCABULARY(':id'),
        element: <MockExamVocabularyPage />,
      },
      {
        path: ROUTES.MOCK_EXAM_LISTENING(':id'),
        element: <MockExamListeningPage />,
      },
      {
        path: ROUTES.MOCK_EXAM_SPEAKING(':id'),
        element: <MockExamSpeakingPage />,
      },
      {
        path: ROUTES.MOCK_EXAM_RESULT(':id'),
        element: <MockExamResultPage />,
      },

      { path: '*', element: <NotFound /> },
    ],
  },
]);
