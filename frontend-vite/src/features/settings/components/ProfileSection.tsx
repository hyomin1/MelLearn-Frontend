import { useState, useEffect } from 'react';
import { User, Edit2, Save, X } from 'lucide-react';
import { LANGUAGES } from '../constants/member';
import type { Member } from '../types/member';

interface ProfileSectionProps {
  member: Member;
  onUpdate: (updatedMember: Member) => void;
}

export default function ProfileSection({
  member,
  onUpdate,
}: ProfileSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(member.name);
  const [tempLang, setTempLang] = useState(member.langType);

  useEffect(() => {
    setTempName(member.name);
    setTempLang(member.langType);
  }, [member]);

  const label = LANGUAGES.find((l) => l.langType === member.langType)?.label;

  const handleSave = () => {
    const updatedMember: Member = {
      ...member,
      name: tempName,
      langType: tempLang,
    };
    onUpdate(updatedMember);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempName(member.name);
    setTempLang(member.langType);
    setIsEditing(false);
  };

  const handleEditStart = () => {
    setIsEditing(true);
  };

  return (
    <div className='bg-white/5 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-white/20 transition-all duration-300 mb-6 group'>
      <div className='flex items-center justify-between mb-6'>
        <div className='flex items-center space-x-3'>
          <div className='w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center'>
            <User className='w-6 h-6 text-white' />
          </div>
          <div>
            <h2 className='text-2xl font-bold text-white'>프로필 정보</h2>
            <p className='text-gray-400'>개인 정보를 관리하세요</p>
          </div>
        </div>
        {isEditing ? (
          <div className='flex gap-2'>
            <button
              onClick={handleSave}
              className='flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300'
            >
              <Save className='w-4 h-4' />
              저장
            </button>
            <button
              onClick={handleCancel}
              className='flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-lg border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all duration-300'
            >
              <X className='w-4 h-4' />
              취소
            </button>
          </div>
        ) : (
          <button
            onClick={handleEditStart}
            className='px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 opacity-0 group-hover:opacity-100'
          >
            <div className='flex items-center gap-2'>
              <Edit2 className='w-4 h-4' />
              편집
            </div>
          </button>
        )}
      </div>

      <div className='space-y-6'>
        <div>
          <label className='block text-gray-300 text-base font-medium mb-3'>
            사용자 이름
          </label>
          {isEditing ? (
            <input
              type='text'
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              className='w-full px-4 py-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-pink-400 focus:bg-white/15 transition-all duration-300 outline-none'
              placeholder='이름을 입력하세요'
            />
          ) : (
            <div className='px-4 py-3 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10'>
              <span className='text-white text-lg font-medium'>
                {member.name}
              </span>
            </div>
          )}
        </div>

        <div>
          <label className='block text-gray-300 text-base font-medium mb-3'>
            멤버 ID
          </label>
          <div className='px-4 py-3 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10'>
            <span className='text-gray-300 text-lg'>{member.memberId}</span>
          </div>
        </div>

        <div>
          <label className='block text-gray-300 text-base font-medium mb-3'>
            언어 설정
          </label>
          {isEditing ? (
            <div className='grid grid-cols-2 gap-3'>
              {LANGUAGES.map(({ langType, label }) => (
                <button
                  key={langType}
                  onClick={() => setTempLang(langType)}
                  className={`flex items-center gap-3 p-4 rounded-xl border transition-all duration-300 ${
                    tempLang === langType
                      ? 'bg-gradient-to-r from-pink-500/20 to-violet-500/20 border-pink-400'
                      : 'bg-white/5 backdrop-blur-lg border-white/20 hover:bg-white/10 hover:border-white/30'
                  }`}
                >
                  <span className='text-white font-medium'>{label}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className='px-4 py-3 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10'>
              <div className='flex items-center gap-3'>
                <span className='text-white font-medium text-lg'>{label}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
