import useMember from '@/features/settings/hooks/useMember';
import ProfileSection from '@/features/settings/components/ProfileSection';
import LearningStatsSection from '@/features/settings/components/LearningStatsSection';
import type { Member } from '@/features/settings/types/member';
import SpotifyLoginButton from '@/features/spotify/components/SpotifyLoginButton';
import { Music } from 'lucide-react';

export default function SettingPage() {
  const { member, isLoading, error, update } = useMember();
  const spotifyAccessToken = sessionStorage.getItem('spotify_access_token');

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center'>
        <div className='text-white text-xl'>로딩 중...</div>
      </div>
    );
  }

  if (error || !member) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center'>
        <div className='text-white text-xl'>데이터를 불러올 수 없습니다.</div>
      </div>
    );
  }

  const handleProfileUpdate = (updatedMember: Member) => {
    update(updatedMember);
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900'>
      <div className='relative z-10 md:ml-0 lg:ml-20 xl:ml-64 transition-all duration-300'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8'>
          <div className='pb-8'>
            <div>
              <ProfileSection member={member} onUpdate={handleProfileUpdate} />

              {!spotifyAccessToken && (
                <div className='my-6 p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center space-x-3'>
                      <div className='w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center'>
                        <Music className='w-6 h-6 text-white' />
                      </div>
                      <div>
                        <h3 className='text-white font-medium'>Spotify 연동</h3>
                        <p className='text-white/70 text-sm'>
                          계정을 연동하여 더욱 다양한 서비스를 이용해보세요
                        </p>
                      </div>
                    </div>
                    <SpotifyLoginButton />
                  </div>
                </div>
              )}

              <LearningStatsSection member={member} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
