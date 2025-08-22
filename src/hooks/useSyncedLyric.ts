import type { Lyric } from '@/features/track/types/track';
import { useEffect, useRef, useState } from 'react';

interface Props {
  lyrics?: Lyric[];
  getCurrentTime: () => number;
}

export default function useSyncedLyric({ lyrics, getCurrentTime }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    if (!lyrics || lyrics.length === 0) return;

    let rafId: number;
    const update = () => {
      const currentTime = getCurrentTime();
      const index = lyrics.findIndex((line, i) => {
        const nextTime = lyrics[i + 1]?.time ?? Infinity;
        return currentTime >= line.time && currentTime < nextTime;
      });

      if (index !== -1 && index !== currentIndex) {
        setCurrentIndex(index);

        const el = lineRefs.current[index];
        if (el && containerRef.current) {
          const offsetTop = el.offsetTop;
          containerRef.current.scrollTo({
            top:
              offsetTop -
              containerRef.current.clientHeight / 2 +
              el.clientHeight / 2,
            behavior: 'smooth',
          });
        }
      }

      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);

    return () => cancelAnimationFrame(rafId);
  }, [lyrics, getCurrentTime, currentIndex]);

  return { containerRef, lineRefs, currentIndex };
}
