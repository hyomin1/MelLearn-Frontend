import type { Lyric } from '@/features/track/types/track';
import useSyncedLyric from '@/hooks/useSyncedLyric';

interface Props {
  lyrics: Lyric[];
  getCurrentTime: () => number;
}

export default function SpeakingSyncedLyrics({
  lyrics,
  getCurrentTime,
}: Props) {
  const { containerRef, lineRefs, currentIndex } = useSyncedLyric({
    lyrics,
    getCurrentTime,
  });
  return (
    <div className='bg-white/5 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-white/10 mb-8'>
      <div ref={containerRef} className='max-h-96 overflow-y-auto'>
        <div className='space-y-4'>
          {lyrics.map((lyric, index) => (
            <div
              key={index}
              ref={(el) => {
                lineRefs.current[index] = el;
              }}
              className={`p-4 rounded-xl transition-all duration-500 ${
                index === currentIndex
                  ? 'bg-gradient-to-r from-pink-500/20 to-rose-500/20 border-2 border-pink-500/50 '
                  : 'bg-white/5 border border-white/10 hover:bg-white/10'
              } ${lyric.text ? '' : 'hidden'}`}
            >
              <div className='flex items-center'>
                <p
                  className={`text-lg leading-relaxed ${
                    index === currentIndex
                      ? 'text-white font-semibold'
                      : 'text-white/80'
                  }`}
                >
                  {lyric.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
