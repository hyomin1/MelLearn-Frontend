import useMember from '@/features/settings/hooks/useMember';
import ProfileSection from '@/features/settings/components/ProfileSection';
import LearningStatsSection from '@/features/settings/components/LearningStatsSection';
import type { Member } from '@/features/settings/types/member';

export default function SettingPage() {
  const { member, isLoading, error, update } = useMember();

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
              <ProfileSection
                member={member}
                onUpdate={handleProfileUpdate}
              />
              
              <LearningStatsSection member={member} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
