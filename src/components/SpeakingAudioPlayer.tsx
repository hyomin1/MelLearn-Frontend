interface Props {
  handlePlay?: () => void;
  isRecording?: boolean;
}

export default function SpeakingAudioPlayer({
  handlePlay,
  isRecording,
}: Props) {
  return (
    <div className='flex justify-center mb-6'>
      <button
        disabled={isRecording}
        onClick={handlePlay}
        className='
        flex items-center 
        bg-gradient-to-r from-pink-500 to-violet-500
        text-white transition-all py-2 px-4 rounded-full
        hover:from-pink-600 hover:to-violet-600 hover:scale-105
        disabled:opacity-50 disabled:cursor-not-allowed
        disabled:hover:from-pink-500 disabled:hover:to-violet-500 disabled:hover:scale-100
      '
      >
        녹음 시작
      </button>
    </div>
  );
}
