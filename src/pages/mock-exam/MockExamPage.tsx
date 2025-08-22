import useTrack from '@/features/track/hooks/useTrack';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBack from '@/components/ArrowBack';
import ArtistTrackLayout from '@/components/ArtistTrackLayout';
import HeroImage from '@/components/HeroImage';
import { Music, BookOpen, CheckCircle, Clock } from 'lucide-react';
import { ROUTES } from '@/services/router';
import { useMockExamStore } from '@/store/useMockExamStore';
import useMockExam from '@/features/mock-exam/hooks/useMockExam';
import useLyric from '@/features/track/hooks/useLyric';

export default function MockExamPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { track, isLoading, error } = useTrack(id || '');
  const mockExam = useMockExamStore((state) => state.mockExam);
  const mockExamProgress = useMockExamStore((state) => state.mockExamProgress);
  const speaking = useMockExamStore((state) => state.speaking);
  const { plainLyrics: lrcLyricList } = useLyric();
  const { submit } = useMockExam(lrcLyricList, id);
  const { reading, vocabulary, grammar, listening } = mockExamProgress;
  const allCompleted =
    grammar.completed &&
    reading.completed &&
    vocabulary.completed &&
    listening.completed &&
    speaking;

  const handleSubmit = () => {
    const submitRequest = {
      readingSubmit: reading.answers as number[],
      musicId: id,
      lrcLyricList,
      vocabularySubmit: vocabulary.answers as number[],
      grammarSubmit: grammar.answers as number[],
      listeningSubmit: listening.answers as string[],
    };
    const form = new FormData();
    form.append('speakingSubmitFile', speaking as Blob);
    const submitBlob = new Blob([JSON.stringify(submitRequest)], {
      type: 'application/json',
    });
    form.append('submitRequest', submitBlob, 'submit.json');
    submit(form);
  };

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center'>
        <div className='text-white text-xl'>로딩 중...</div>
      </div>
    );
  }

  if (error || !track) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center'>
        <div className='text-center'>
          <Music className='w-16 h-16 text-white/30 mx-auto mb-4' />
          <p className='text-white/50 text-lg'>트랙을 찾을 수 없습니다</p>
        </div>
      </div>
    );
  }

  if (!mockExam) {
    return (
      <ArtistTrackLayout>
        <div className='mb-8'>
          <ArrowBack onClick={() => navigate(-1)} />
        </div>

        <div className='bg-white/5 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-white/10 mb-8'>
          <div className='text-center'>
            <Clock className='w-16 h-16 text-orange-400 mx-auto mb-4' />
            <h2 className='text-3xl font-bold text-white mb-4'>
              모의고사를 준비 중입니다
            </h2>
            <p className='text-white/70 text-lg mb-6'>
              트랙 상세 페이지에서 "모의고사" 버튼을 클릭해주세요.
            </p>
            <button
              onClick={() => navigate(-1)}
              className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300'
            >
              돌아가기
            </button>
          </div>
        </div>
      </ArtistTrackLayout>
    );
  }

  return (
    <ArtistTrackLayout>
      <div className='mb-8'>
        <ArrowBack onClick={() => navigate(-1)} />
      </div>

      <div className='bg-white/5 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-white/10 mb-8'>
        <div className='flex flex-col lg:flex-row gap-8 items-center'>
          <HeroImage
            src={track.album.images?.[0]?.url}
            alt={track.album.name}
          />

          <div className='flex-1 text-center lg:text-left'>
            <h1 className='text-4xl lg:text-5xl font-bold text-white mb-4'>
              {track.name}
            </h1>
            <div className='flex flex-wrap justify-center lg:justify-start gap-2 mb-6'>
              {track.artists.map((artist, index) => (
                <span
                  key={artist.id}
                  className='text-white/80 text-xl font-semibold'
                >
                  {artist.name}
                  {index < track.artists.length - 1 && ', '}
                </span>
              ))}
            </div>
            <div className='flex items-center justify-center lg:justify-start gap-2 mb-4'>
              <CheckCircle className='w-6 h-6 text-green-400' />
              <p className='text-green-400 text-lg font-semibold'>
                모의고사 생성 완료!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='bg-white/5 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-white/10 mb-8'>
        <div className='text-center mb-8'>
          <BookOpen className='w-16 h-16 text-blue-400 mx-auto mb-4' />
          <h2 className='text-3xl font-bold text-white mb-2'>종합 모의고사</h2>
          <p className='text-white/70 text-lg'>
            총 5개 영역의 퀴즈가 준비되었습니다
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <div className='bg-white/10 rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300'>
            <div className='text-green-400 font-bold text-xl mb-2'>
              문법 퀴즈
            </div>
            <div className='text-white/80 mb-4'>Grammar Quiz</div>
            <div className='text-white/60 text-sm mb-4'>
              남은 문제 수:{' '}
              {mockExam.grammarQuiz?.quizzes?.length -
                (grammar.answers?.length || 0) || 0}
              개
            </div>
            <button
              onClick={() => navigate(ROUTES.MOCK_EXAM_GRAMMAR(id || ''))}
              className='w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300'
            >
              {grammar.completed ? '다시풀기' : ' 시작하기'}
            </button>
          </div>

          <div className='bg-white/10 rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300'>
            <div className='text-blue-400 font-bold text-xl mb-2'>
              읽기 퀴즈
            </div>
            <div className='text-white/80 mb-4'>Reading Quiz</div>
            <div className='text-white/60 text-sm mb-4'>
              남은 문제 수:{' '}
              {mockExam.readingQuiz?.quizzes?.length -
                (reading.answers?.length || 0) || 0}
              개
            </div>
            <button
              onClick={() => navigate(ROUTES.MOCK_EXAM_READING(id || ''))}
              className='w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300'
            >
              {reading.completed ? '다시풀기' : ' 시작하기'}
            </button>
          </div>

          <div className='bg-white/10 rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300'>
            <div className='text-purple-400 font-bold text-xl mb-2'>
              어휘 퀴즈
            </div>
            <div className='text-white/80 mb-4'>Vocabulary Quiz</div>
            <div className='text-white/60 text-sm mb-4'>
              남은 문제 수:{' '}
              {mockExam.vocaQuiz?.quizzes?.length -
                (vocabulary.answers?.length || 0) || 0}
              개
            </div>
            <button
              onClick={() => navigate(ROUTES.MOCK_EXAM_VOCABULARY(id || ''))}
              className='w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300'
            >
              {vocabulary.completed ? '다시풀기' : ' 시작하기'}
            </button>
          </div>

          <div className='bg-white/10 rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300'>
            <div className='text-orange-400 font-bold text-xl mb-2'>
              듣기 퀴즈
            </div>
            <div className='text-white/80 mb-4'>Listening Quiz</div>
            <div className='text-white/60 text-sm mb-4'>
              남은 빈칸 수:{' '}
              {mockExam.listeningQuizDto?.answerList.length -
                (listening.answers?.length || 0) || 0}
              개
            </div>
            <button
              onClick={() => navigate(ROUTES.MOCK_EXAM_LISTENING(id || ''))}
              className='w-full bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300'
            >
              {listening.completed ? '다시풀기' : ' 시작하기'}
            </button>
          </div>

          <div className='bg-white/10 rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300'>
            <div className='text-red-400 font-bold text-xl mb-2'>
              말하기 퀴즈
            </div>
            <div className='text-white/80 mb-4'>Speaking Quiz</div>
            <div className='text-white/60 text-sm mb-4'>발음 연습 및 평가</div>
            <button
              onClick={() => navigate(ROUTES.MOCK_EXAM_SPEAKING(id || ''))}
              className='w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300'
            >
              {speaking ? '다시풀기' : ' 시작하기'}
            </button>
          </div>
        </div>
        {allCompleted && (
          <div className='mt-8'>
            <div
              className='bg-gradient-to-r from-green-500/20 to-emerald-500/20 
                    rounded-2xl p-6 border border-green-400/30 
                    backdrop-blur-lg hover:from-green-500/30 hover:to-emerald-500/30
                    transition-all duration-300'
            >
              <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
                <div className='flex items-center gap-4'>
                  <div className='bg-green-500 p-3 rounded-full'>
                    <CheckCircle className='w-8 h-8 text-white' />
                  </div>
                  <div>
                    <h3 className='text-xl font-bold text-white'>
                      모든 퀴즈 완료!
                    </h3>
                    <p className='text-white/70'>
                      답안을 제출하여 결과를 확인하세요
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleSubmit}
                  className='bg-gradient-to-r from-green-600 to-emerald-600 
                     hover:from-green-700 hover:to-emerald-700
                     text-white px-8 py-3 rounded-xl font-semibold text-lg
                     transition-all duration-300 hover:scale-105 
                     shadow-lg min-w-[200px]'
                >
                  제출하기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ArtistTrackLayout>
  );
}
