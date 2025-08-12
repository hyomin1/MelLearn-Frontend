import type { Lyric } from '@/features/track/types/track';
import { useEffect, useRef, useState } from 'react';
import useQuiz from './useQuiz';
import toast from 'react-hot-toast';

export default function useAudioRecorder(id: string, lyrics: Lyric[]) {
  const [isRecording, setIsRecording] = useState(false);
  const { submitSpeaking } = useQuiz(id || '');

  const mediaStream = useRef<MediaStream | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);

  const cleanupRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state !== 'inactive') {
      mediaRecorder.current.stop();
    }
    if (mediaStream.current) {
      mediaStream.current.getTracks().forEach((track) => track.stop());
      mediaStream.current = null;
    }
    mediaRecorder.current = null;
    chunks.current = [];
    setIsRecording(false);
  };

  const startRecording = async () => {
    if (!id || !lyrics) {
      toast.error('트랙 정보 또는 가사 정보가 없습니다.');
      return;
    }
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
      setIsRecording(false);
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
        new Blob([id], { type: 'text/plain' }),
        'musicId.json'
      );
      submitSpeaking(form);
    };

    mediaRecorder.current.onerror = (error) => {
      console.error('녹음 중 오류:', error);
    };

    mediaRecorder.current.start();
    setIsRecording(true);
  };

  const stopRecording = async () => {
    if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
      mediaRecorder.current.stop();
    }
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      cleanupRecording();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      cleanupRecording();
    };
  }, []);

  return { isRecording, startRecording, stopRecording, cleanupRecording };
}
