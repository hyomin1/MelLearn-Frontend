import { useEffect, useRef } from 'react';
import { useSpotifyStore } from '@/store/useSpotifyStore';

export default function useSyncTest() {
  const player = useSpotifyStore((state) => state.player);

  const pollingRef = useRef(0); //  polling 값
  const lastPositionRef = useRef(0); //  보간 계산용
  const lastFetchedRef = useRef(performance.now()); //  보간 계산용
  const isPausedRef = useRef(false);
  const intervalSimulatedRef = useRef(0); //  setInterval 방식 시간

  // 보간 시간 계산 함수
  const getInterpolatedTime = () => {
    if (isPausedRef.current) return lastPositionRef.current;
    return (
      lastPositionRef.current +
      (performance.now() - lastFetchedRef.current) / 1000
    );
  };

  // 1초마다 polling + 비교 출력
  useEffect(() => {
    if (!player) return;

    const interval = setInterval(() => {
      player.getCurrentState().then((state) => {
        if (!state) return;

        const actual = state.position / 1000; //  실제
        const naive = pollingRef.current;
        const interpolated = getInterpolatedTime();
        const intervalBased = intervalSimulatedRef.current;

        const naiveDiff = Math.abs(actual - naive);
        const interpDiff = Math.abs(actual - interpolated);
        const intervalDiff = Math.abs(actual - intervalBased);

        console.log(
          ` 실제: ${actual.toFixed(3)}초 |  polling: ${naive.toFixed(
            3
          )}초 (오차: ${naiveDiff.toFixed(
            3
          )}초) |  보간: ${interpolated.toFixed(
            3
          )}초 (오차: ${interpDiff.toFixed(
            3
          )}초) | 인터벌: ${intervalBased.toFixed(
            3
          )}초 (오차: ${intervalDiff.toFixed(3)}초)`
        );

        pollingRef.current = actual;
        lastPositionRef.current = actual;
        lastFetchedRef.current = performance.now();
        isPausedRef.current = state.paused;
        intervalSimulatedRef.current = actual;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [player]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPausedRef.current) {
        intervalSimulatedRef.current += 1.0;
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);
}
