import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Play, BarChart3 } from 'lucide-react';

const AudioQualityComparison = () => {
  const [basicRecording, setBasicRecording] = useState(false);
  const [enhancedRecording, setEnhancedRecording] = useState(false);
  const [basicAudio, setBasicAudio] = useState<string | null>(null);
  const [enhancedAudio, setEnhancedAudio] = useState<string | null>(null);

  // 실시간 수치 데이터
  const [basicMetrics, setBasicMetrics] = useState({
    rms: '0.0',
    peak: '0.0',
    snr: '0.0',
  });
  const [enhancedMetrics, setEnhancedMetrics] = useState({
    rms: '0.0',
    peak: '0.0',
    snr: '0.0',
  });

  // 최종 분석 결과
  const [basicAnalysis, setBasicAnalysis] = useState<any>(null);
  const [enhancedAnalysis, setEnhancedAnalysis] = useState<any>(null);

  const basicRecorder = useRef<MediaRecorder | null>(null);
  const enhancedRecorder = useRef<MediaRecorder | null>(null);
  const basicAnalyser = useRef<AnalyserNode | null>(null);
  const enhancedAnalyser = useRef<AnalyserNode | null>(null);
  const basicContext = useRef<AudioContext | null>(null);
  const enhancedContext = useRef<AudioContext | null>(null);
  const basicActive = useRef(false);
  const enhancedActive = useRef(false);

  // 품질 계산 함수들
  const calculateRMS = (data: Uint8Array): number => {
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      const normalized = (data[i] - 128) / 128;
      sum += normalized * normalized;
    }
    return Math.sqrt(sum / data.length);
  };

  const calculatePeak = (data: Uint8Array): number => {
    let peak = 0;
    for (let i = 0; i < data.length; i++) {
      const normalized = Math.abs((data[i] - 128) / 128);
      if (normalized > peak) peak = normalized;
    }
    return peak;
  };

  const calculateSNR = (freqData: Uint8Array, timeData: Uint8Array): number => {
    const signal = calculateRMS(timeData);
    let noiseSum = 0;
    const noiseSamples = Math.min(10, freqData.length / 4);
    for (let i = 0; i < noiseSamples; i++) {
      noiseSum += freqData[i];
    }
    const noise = noiseSum / noiseSamples / 255;
    return noise === 0 ? 60 : Math.min(60, 20 * Math.log10(signal / noise));
  };

  // 오디오 파일 분석
  const analyzeAudio = async (
    audioUrl: string,
    type: 'basic' | 'enhanced'
  ): Promise<void> => {
    try {
      const response = await fetch(audioUrl);
      const arrayBuffer = await response.arrayBuffer();
      const audioContext = new AudioContext();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

      const channelData = audioBuffer.getChannelData(0);

      // RMS 계산
      let rmsSum = 0;
      for (let i = 0; i < channelData.length; i++) {
        rmsSum += channelData[i] * channelData[i];
      }
      const rms = Math.sqrt(rmsSum / channelData.length);
      const rmsDb = 20 * Math.log10(rms);

      // Peak 계산
      let peak = 0;
      for (let i = 0; i < channelData.length; i++) {
        const abs = Math.abs(channelData[i]);
        if (abs > peak) peak = abs;
      }
      const peakDb = 20 * Math.log10(peak);

      const analysis = {
        rms: rms,
        rmsDb: rmsDb,
        peak: peak,
        peakDb: peakDb,
        dynamicRange: peakDb - rmsDb,
        duration: audioBuffer.duration,
        fileSize: arrayBuffer.byteLength,
      };

      if (type === 'basic') {
        setBasicAnalysis(analysis);
      } else {
        setEnhancedAnalysis(analysis);
      }
    } catch (error) {
      console.error('분석 실패:', error);
    }
  };

  // 기본 녹음
  const startBasicRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 44100,
          echoCancellation: true,
          noiseSuppression: true,
        },
      });

      basicContext.current = new AudioContext();
      const source = basicContext.current.createMediaStreamSource(stream);
      basicAnalyser.current = basicContext.current.createAnalyser();
      basicAnalyser.current.fftSize = 256;
      source.connect(basicAnalyser.current);

      basicRecorder.current = new MediaRecorder(stream);
      const chunks = [];

      basicRecorder.current.ondataavailable = (e) => chunks.push(e.data);
      basicRecorder.current.onstop = async () => {
        const blob = new Blob(chunks);
        const url = URL.createObjectURL(blob);
        setBasicAudio(url);
        stream.getTracks().forEach((track) => track.stop());
        basicActive.current = false;
        await analyzeAudio(url, 'basic');
      };

      setBasicRecording(true);
      basicRecorder.current.start();
      basicActive.current = true;
      updateBasicMetrics();
    } catch (err) {
      console.error('기본 녹음 실패:', err);
    }
  };

  // 개선된 녹음
  const startEnhancedRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 44100,
          echoCancellation: false,
          noiseSuppression: false,
        },
      });

      enhancedContext.current = new AudioContext();
      const source = enhancedContext.current.createMediaStreamSource(stream);

      // 오디오 처리 체인
      const highpass = enhancedContext.current.createBiquadFilter();
      highpass.type = 'highpass';
      highpass.frequency.value = 85;

      const gain = enhancedContext.current.createGain();
      gain.gain.value = 1.5;

      const compressor = enhancedContext.current.createDynamicsCompressor();
      compressor.threshold.value = -24;
      compressor.ratio.value = 6;

      enhancedAnalyser.current = enhancedContext.current.createAnalyser();
      enhancedAnalyser.current.fftSize = 256;

      const destination =
        enhancedContext.current.createMediaStreamDestination();

      source
        .connect(highpass)
        .connect(gain)
        .connect(compressor)
        .connect(enhancedAnalyser.current);
      compressor.connect(destination);

      enhancedRecorder.current = new MediaRecorder(destination.stream);
      const chunks = [];

      enhancedRecorder.current.ondataavailable = (e) => chunks.push(e.data);
      enhancedRecorder.current.onstop = async () => {
        const blob = new Blob(chunks);
        const url = URL.createObjectURL(blob);
        setEnhancedAudio(url);
        stream.getTracks().forEach((track) => track.stop());
        enhancedActive.current = false;
        await analyzeAudio(url, 'enhanced');
      };

      setEnhancedRecording(true);
      enhancedRecorder.current.start();
      enhancedActive.current = true;
      updateEnhancedMetrics();
    } catch (err) {
      console.error('개선된 녹음 실패:', err);
    }
  };

  // 실시간 수치 업데이트
  const updateBasicMetrics = (): void => {
    if (!basicActive.current || !basicAnalyser.current) return;

    const freqData = new Uint8Array(basicAnalyser.current.frequencyBinCount);
    const timeData = new Uint8Array(basicAnalyser.current.frequencyBinCount);

    basicAnalyser.current.getByteFrequencyData(freqData);
    basicAnalyser.current.getByteTimeDomainData(timeData);

    setBasicMetrics({
      rms: (calculateRMS(timeData) * 100).toFixed(1),
      peak: (calculatePeak(timeData) * 100).toFixed(1),
      snr: calculateSNR(freqData, timeData).toFixed(1),
    });

    setTimeout(updateBasicMetrics, 100);
  };

  const updateEnhancedMetrics = (): void => {
    if (!enhancedActive.current || !enhancedAnalyser.current) return;

    const freqData = new Uint8Array(enhancedAnalyser.current.frequencyBinCount);
    const timeData = new Uint8Array(enhancedAnalyser.current.frequencyBinCount);

    enhancedAnalyser.current.getByteFrequencyData(freqData);
    enhancedAnalyser.current.getByteTimeDomainData(timeData);

    setEnhancedMetrics({
      rms: (calculateRMS(timeData) * 100).toFixed(1),
      peak: (calculatePeak(timeData) * 100).toFixed(1),
      snr: calculateSNR(freqData, timeData).toFixed(1),
    });

    setTimeout(updateEnhancedMetrics, 100);
  };

  const stopBasicRecording = () => {
    if (basicRecorder.current && basicRecording) {
      basicRecorder.current.stop();
      setBasicRecording(false);
    }
  };

  const stopEnhancedRecording = () => {
    if (enhancedRecorder.current && enhancedRecording) {
      enhancedRecorder.current.stop();
      setEnhancedRecording(false);
    }
  };

  return (
    <div className='max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen'>
      <h1 className='text-2xl font-bold text-center mb-6 text-gray-800'>
        🎙️ 오디오 품질 수치 비교
      </h1>

      <div className='grid md:grid-cols-2 gap-6'>
        {/* 기본 녹음 */}
        <div className='bg-white rounded-lg p-6 shadow-lg border-l-4 border-red-500'>
          <h2 className='text-lg font-semibold mb-4 text-gray-800'>
            🔴 기본 녹음
          </h2>

          {/* 실시간 수치 */}
          <div className='grid grid-cols-3 gap-4 mb-4 p-4 bg-red-50 rounded-lg'>
            <div className='text-center'>
              <div className='text-xl font-bold text-red-700'>
                {basicMetrics.rms}%
              </div>
              <div className='text-xs text-red-600'>RMS</div>
            </div>
            <div className='text-center'>
              <div className='text-xl font-bold text-red-700'>
                {basicMetrics.peak}%
              </div>
              <div className='text-xs text-red-600'>Peak</div>
            </div>
            <div className='text-center'>
              <div className='text-xl font-bold text-red-700'>
                {basicMetrics.snr} dB
              </div>
              <div className='text-xs text-red-600'>SNR</div>
            </div>
          </div>

          <div className='flex gap-3 mb-4'>
            <button
              onClick={
                basicRecording ? stopBasicRecording : startBasicRecording
              }
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${
                basicRecording
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'bg-red-400 hover:bg-red-500 text-white'
              }`}
            >
              {basicRecording ? (
                <Square className='w-4 h-4' />
              ) : (
                <Mic className='w-4 h-4' />
              )}
              {basicRecording ? '정지' : '녹음'}
            </button>

            {basicAudio && (
              <button
                onClick={() => new Audio(basicAudio).play()}
                className='flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg'
              >
                <Play className='w-4 h-4' />
                재생
              </button>
            )}
          </div>

          {/* 최종 분석 결과 */}
          {basicAnalysis && (
            <div className='bg-red-50 p-3 rounded-lg text-sm'>
              <h4 className='font-medium text-red-800 mb-2 flex items-center gap-2'>
                <BarChart3 className='w-4 h-4' />
                최종 분석
              </h4>
              <div className='space-y-1 text-red-700'>
                <div>RMS: {basicAnalysis.rmsDb.toFixed(1)} dBFS</div>
                <div>Peak: {basicAnalysis.peakDb.toFixed(1)} dBFS</div>
                <div>
                  다이나믹 레인지: {basicAnalysis.dynamicRange.toFixed(1)} dB
                </div>
                <div>길이: {basicAnalysis.duration.toFixed(1)}초</div>
                <div>크기: {(basicAnalysis.fileSize / 1024).toFixed(0)} KB</div>
              </div>
            </div>
          )}
        </div>

        {/* 개선된 녹음 */}
        <div className='bg-white rounded-lg p-6 shadow-lg border-l-4 border-green-500'>
          <h2 className='text-lg font-semibold mb-4 text-gray-800'>
            🟢 개선된 녹음
          </h2>

          {/* 실시간 수치 */}
          <div className='grid grid-cols-3 gap-4 mb-4 p-4 bg-green-50 rounded-lg'>
            <div className='text-center'>
              <div className='text-xl font-bold text-green-700'>
                {enhancedMetrics.rms}%
              </div>
              <div className='text-xs text-green-600'>RMS</div>
            </div>
            <div className='text-center'>
              <div className='text-xl font-bold text-green-700'>
                {enhancedMetrics.peak}%
              </div>
              <div className='text-xs text-green-600'>Peak</div>
            </div>
            <div className='text-center'>
              <div className='text-xl font-bold text-green-700'>
                {enhancedMetrics.snr} dB
              </div>
              <div className='text-xs text-green-600'>SNR</div>
            </div>
          </div>

          <div className='flex gap-3 mb-4'>
            <button
              onClick={
                enhancedRecording
                  ? stopEnhancedRecording
                  : startEnhancedRecording
              }
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${
                enhancedRecording
                  ? 'bg-green-500 text-white animate-pulse'
                  : 'bg-green-400 hover:bg-green-500 text-white'
              }`}
            >
              {enhancedRecording ? (
                <Square className='w-4 h-4' />
              ) : (
                <Mic className='w-4 h-4' />
              )}
              {enhancedRecording ? '정지' : '녹음'}
            </button>

            {enhancedAudio && (
              <button
                onClick={() => new Audio(enhancedAudio).play()}
                className='flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg'
              >
                <Play className='w-4 h-4' />
                재생
              </button>
            )}
          </div>

          {/* 최종 분석 결과 */}
          {enhancedAnalysis && (
            <div className='bg-green-50 p-3 rounded-lg text-sm'>
              <h4 className='font-medium text-green-800 mb-2 flex items-center gap-2'>
                <BarChart3 className='w-4 h-4' />
                최종 분석
              </h4>
              <div className='space-y-1 text-green-700'>
                <div>RMS: {enhancedAnalysis.rmsDb.toFixed(1)} dBFS</div>
                <div>Peak: {enhancedAnalysis.peakDb.toFixed(1)} dBFS</div>
                <div>
                  다이나믹 레인지: {enhancedAnalysis.dynamicRange.toFixed(1)} dB
                </div>
                <div>길이: {enhancedAnalysis.duration.toFixed(1)}초</div>
                <div>
                  크기: {(enhancedAnalysis.fileSize / 1024).toFixed(0)} KB
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 비교 결과 */}
      {basicAnalysis && enhancedAnalysis && (
        <div className='mt-6 bg-white rounded-lg p-6 shadow-lg'>
          <h3 className='text-lg font-semibold mb-4 text-gray-800'>
            📊 수치 비교
          </h3>

          <div className='grid grid-cols-3 gap-4'>
            <div className='text-center p-4 bg-blue-50 rounded-lg'>
              <div className='text-lg font-bold text-blue-700'>
                {(enhancedAnalysis.rmsDb - basicAnalysis.rmsDb).toFixed(1)} dB
              </div>
              <div className='text-sm text-blue-600'>RMS 차이</div>
              <div className='text-xs text-gray-500'>
                {enhancedAnalysis.rmsDb > basicAnalysis.rmsDb
                  ? '개선됨'
                  : '낮음'}
              </div>
            </div>

            <div className='text-center p-4 bg-purple-50 rounded-lg'>
              <div className='text-lg font-bold text-purple-700'>
                {(
                  enhancedAnalysis.dynamicRange - basicAnalysis.dynamicRange
                ).toFixed(1)}{' '}
                dB
              </div>
              <div className='text-sm text-purple-600'>
                다이나믹 레인지 차이
              </div>
              <div className='text-xs text-gray-500'>
                {enhancedAnalysis.dynamicRange > basicAnalysis.dynamicRange
                  ? '개선됨'
                  : '낮음'}
              </div>
            </div>

            <div className='text-center p-4 bg-orange-50 rounded-lg'>
              <div className='text-lg font-bold text-orange-700'>
                {(
                  (enhancedAnalysis.fileSize - basicAnalysis.fileSize) /
                  1024
                ).toFixed(0)}{' '}
                KB
              </div>
              <div className='text-sm text-orange-600'>파일 크기 차이</div>
              <div className='text-xs text-gray-500'>
                {enhancedAnalysis.fileSize > basicAnalysis.fileSize
                  ? '더 큼'
                  : '더 작음'}
              </div>
            </div>
          </div>

          <div className='mt-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-600'>
            <strong>해석:</strong> RMS는 평균 음량, Peak는 최대 음량, SNR은 신호
            대 잡음비, 다이나믹 레인지는 가장 큰 소리와 작은 소리의 차이를
            나타냅니다.
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioQualityComparison;
