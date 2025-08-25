import { Link } from 'react-router-dom';
import SpotifyLayout from './components/SpotifyLayout';
import SpotifyLoginButton from './components/SpotifyLoginButton';
import { ROUTES } from '@/services/router';
import { User } from 'lucide-react';

export default function SpotifyLoginPage() {
  const handleLoginWithoutSpotify = () => {
    // 여기에 Spotify 없이 로그인하는 로직 추가
  };

  return (
    <SpotifyLayout>
      <div className='flex flex-col gap-3 w-full max-w-sm'>
        <SpotifyLoginButton />

        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <div className='w-full border-t border-gray-300'></div>
          </div>
          <div className='relative flex justify-center text-sm'>
            <span className='px-2 bg-white text-gray-500'>또는</span>
          </div>
        </div>

        <Link
          to={ROUTES.HOME}
          className='flex items-center justify-center px-5 py-2 bg-white hover:bg-gray-50 border border-gray-300 hover:border-gray-400 rounded-full shadow-sm transition font-medium text-gray-700'
        >
          <User className='w-5 h-5 mr-3 text-gray-600' />
          <span className='text-base tracking-tight'>Spotify 없이 로그인</span>
        </Link>
      </div>
    </SpotifyLayout>
  );
}
