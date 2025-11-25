import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Suspense } from 'react';
import NavBar from './components/NavBar';
import useSpotifySDKSetup from './features/spotify/hooks/useSpotifySDKSetup';
import useAuth from './features/auth/hooks/useAuth';
import { ROUTES } from './services/router';

export default function App() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const publicRoutes = [
    ROUTES.LOGIN,
    ROUTES.SIGNUP,
    ROUTES.SPOTIFY_CALLBACK,
    ROUTES.SPOTIFY_LOGIN,
  ];

  const isPublic = publicRoutes.includes(location.pathname);

  const token = sessionStorage.getItem('spotify_access_token');
  useSpotifySDKSetup(token, !isPublic);

  if (!isAuthenticated && !isPublic) {
    return <Navigate to='/login' replace />;
  }
  return (
    <>
      <Toaster position='top-right' toastOptions={{ duration: 3000 }} />
      <Suspense
        fallback={
          <div className='flex h-screen items-center justify-center text-white'>
            로딩 중...
          </div>
        }
      >
        <Outlet />
        {!isPublic && <NavBar />}
      </Suspense>
    </>
  );
}
