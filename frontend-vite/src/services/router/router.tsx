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
import HistoryPage from '@/pages/HistoryPage';
import HistoryDetailPage from '@/pages/HistoryDetailPage';

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

      { path: '*', element: <NotFound /> },
    ],
  },
]);
