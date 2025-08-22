import { useEffect, useRef } from 'react';

export default function LyricCompare() {
  // 시작 시간 기준점
  const startRef = useRef(performance.now());
  const getRealTime = () => (performance.now() - startRef.current) / 1000;

  // setInterval 방식
  const intervalTimeRef = useRef(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      intervalTimeRef.current += 1; // 1초씩 증가
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // requestAnimationFrame 방식
  const rafTimeRef = useRef(0);
  useEffect(() => {
    let rafId: number;
    const loop = () => {
      rafTimeRef.current = getRealTime();
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // 실제 시간과의 오차 측정
  useEffect(() => {
    const id = setInterval(() => {
      const realTime = getRealTime();
      const rafDiff = Math.abs(realTime - rafTimeRef.current);
      const intervalDiff = Math.abs(realTime - intervalTimeRef.current);

      console.log(
        `실제 시간: ${realTime.toFixed(3)}s`,
        `RAF 시간: ${rafTimeRef.current.toFixed(3)}s`,
        `오차: ${rafDiff.toFixed(3)}s`,
        `Interval 시간: ${intervalTimeRef.current.toFixed(3)}s`,
        `오차: ${intervalDiff.toFixed(3)}s`
      );
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return <div></div>;
}
