import { useRef, useState } from 'react';
import QuizLayout from '@/features/quiz/components/QuizLayout';
import { useLocation } from 'react-router-dom';
import useLyric from '@/features/track/hooks/useLyric';
import QuizHeader from '@/features/quiz/components/QuizHeader';
import { useTrackStore } from '@/store/useTrackStore';
import useSpotifyCleanUp from '@/features/spotify/hooks/useSpotifyCleanUp';
import QuizPlayer from '@/features/quiz/components/QuizPlayer';
import SpeakingSyncedLyrics from '@/features/quiz/components/SpeakingSyncedLyrics';
import useSpotifyPlayer from '@/features/spotify/hooks/useSpotifyPlayer';
import { apiClient } from '@/services/axios';

export default function SpeakingQuizPage() {
  const [isRecording, setIsRecording] = useState(false);

  const { pathname } = useLocation();
  const track = useTrackStore((state) => state.track);
  const { currentTimeRef } = useSpotifyPlayer();

  const { lyrics } = useLyric(track);

  useSpotifyCleanUp();

  const mediaStream = useRef<MediaStream | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);

  if (!track || !lyrics) return null;

  const handleRecord = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    if (!stream.active) return;

    mediaStream.current = stream;
    mediaRecorder.current = new MediaRecorder(stream);
    chunks.current = [];

    mediaRecorder.current.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunks.current.push(e.data);
      }
    };

    mediaRecorder.current.onstop = async () => {
      const recordedBlob = new Blob(chunks.current, { type: 'audio/wav' });
      const form = new FormData();
      form.append('file', recordedBlob);
      form.append(
        'lyricList',
        new Blob([JSON.stringify(lyrics)], { type: 'application/json' }),
        'lyricList.json'
      );
      form.append(
        'musicId',
        new Blob([track.id], { type: 'text/plain' }),
        'musicId.json'
      );

      try {
        const { data } = await apiClient.post(
          '/api/problem/speaking/transcription',
          form
        );
        console.log(data);
      } catch (err) {
        console.error('녹음 제출 실패', err);
      }
    };

    mediaRecorder.current.start();
  };

  return (
    <QuizLayout>
      <QuizHeader isSolving pathname={pathname} title='Speaking' />

      {/* <QuizPlayer track={track} /> */}
      <button
        className='px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl mr-4'
        onClick={async () => {
          setIsRecording(true);
          await handleRecord();
        }}
        disabled={isRecording}
      >
        녹음 시작
      </button>

      <SpeakingSyncedLyrics
        lyrics={lyrics}
        getCurrentTime={() => currentTimeRef.current}
      />

      {/* 제출 버튼 */}
      <div className='text-center mb-6'>
        <button
          className='px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed'
          disabled={!isRecording}
          onClick={() => {
            mediaRecorder.current?.stop(); // 녹음 종료
            setIsRecording(false);
          }}
        >
          녹음 완료 및 제출
        </button>
      </div>
    </QuizLayout>
  );
}
