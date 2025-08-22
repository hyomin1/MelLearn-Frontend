import type { Lyric } from '../types/track';
import useSyncedLyric from '@/hooks/useSyncedLyric';

interface Props {
  lyrics?: Lyric[];
  getCurrentTime: () => number;
  onLyricClick: (time: number) => void;
}

export default function SyncedLyrics({
  lyrics = [],
  getCurrentTime,
  onLyricClick,
}: Props) {
  const { currentIndex, containerRef, lineRefs } = useSyncedLyric({
    lyrics,
    getCurrentTime,
  });
  return (
    <div
      ref={containerRef}
      className='flex-1 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 overflow-y-auto h-auto lg:h-80'
    >
      <h3 className='text-xl font-semibold text-white mb-4'>가사</h3>

      {lyrics.length === 0 ? (
        <div className='text-white/50 text-center py-8'>
          <p>가사 정보가 없습니다</p>
        </div>
      ) : (
        <div className='text-white/80 leading-relaxed whitespace-pre-line'>
          {lyrics.map((lyric, i) => (
            <p
              key={i}
              ref={(el) => {
                lineRefs.current[i] = el;
              }}
              onClick={() => onLyricClick(lyric.time)}
              className={`transition-all cursor-pointer ${
                i === currentIndex
                  ? 'text-blue-400 font-bold text-lg'
                  : 'text-white/50 hover:text-white/70'
              }`}
            >
              {lyric.text}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
