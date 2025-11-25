import { refreshSpotifyToken } from '@/features/spotify/services/spotifyApi';
import axios, {
  AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import toast from 'react-hot-toast';

type SpotifyRequestConfig = InternalAxiosRequestConfig & {
  __retryCount?: number;
};

interface SpotifyApiError {
  error: {
    status: number;
    message: string;
    reason?: string;
  };
}

export const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true,
});

export const apiSpotify = axios.create({
  baseURL: 'https://api.spotify.com/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiLrc = axios.create({
  baseURL: 'https://lrclib.net/api',
});

const handleRequestInterceptor = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const token = sessionStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

const handleResponseInterceptor = async (
  error: AxiosError
): Promise<AxiosResponse> => {
  const status = error.response?.status;
  const config = error.config;
  if (status === 401) {
    // 토큰 만료
    const res = await apiClient.get('/jwt');
    const newAccessToken = res.data.accessToken;
    sessionStorage.setItem('accessToken', newAccessToken);

    if (config) {
      config.headers.Authorization = `Bearer ${newAccessToken}`;
      return axios.request(config); // 실패 요청 다시 실행
    }
  } else if (status === 403) {
    // 권한 없음
    toast.error('이 기능을 사용할 권한이 없습니다.');
  } else if (status === 409) {
    return Promise.reject(error);
  }

  return Promise.reject(error);
};

let spotifyRateLimitUntil = 0;
const MAX_SPOTIFY_RETRY = 5;
const MAX_BACKOFF_MS = 16000;

const delay = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

const handleSpotifyRequestInterceptor = async (
  config: SpotifyRequestConfig
): Promise<SpotifyRequestConfig> => {
  if (spotifyRateLimitUntil > Date.now()) {
    await delay(spotifyRateLimitUntil - Date.now());
  }

  const accessToken = sessionStorage.getItem('spotify_access_token');
  const refreshToken = localStorage.getItem('spotify_refresh_token');

  if (!accessToken && refreshToken) {
    try {
      const newToken = await refreshSpotifyToken(refreshToken);
      const newAccessToken = newToken.access_token;
      sessionStorage.setItem('spotify_access_token', newAccessToken);
    } catch (error) {
      // refresh도 만료된경우
      //localStorage.removeItem('spotify_refresh_token');
      console.error(error);

      return Promise.reject({
        response: {
          status: 401,
          data: { error: { message: 'Guest Mode Login' } },
        },
      });
    }
  }

  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
};

const handleSpotifyResponseInterceptor = async (
  error: AxiosError<SpotifyApiError>
): Promise<AxiosResponse> => {
  const status = error.response?.status;
  const message = error.response?.data?.error?.message;
  const retryAfterHeader = error.response?.headers?.['retry-after'];

  if (status === 401) {
    if (message === 'Guest Mode Login') {
      console.log('No Spotify token - Guest mode');
    } else if (
      message === 'The access token expired' ||
      message === 'Invalid access token'
    ) {
      // 토큰이 만료되거나 유효하지 않은 경우
      const refreshToken = localStorage.getItem('spotify_refresh_token');

      if (refreshToken) {
        try {
          const newToken = await refreshSpotifyToken(refreshToken);
          const newAccessToken = newToken.access_token;
          sessionStorage.setItem('spotify_access_token', newAccessToken);

          if (error.config) {
            error.config.headers.Authorization = `Bearer ${newAccessToken}`;
            return apiSpotify.request(error.config);
          }
        } catch (refreshError) {
          console.error('Spotify refresh failed:', refreshError);
          sessionStorage.removeItem('spotify_access_token');
          //localStorage.removeItem('spotify_refresh_token');
          toast.error('Spotify 재로그인이 필요합니다.');
        }
      } else {
        sessionStorage.removeItem('spotify_access_token');
        //toast.error('Spotify 게스트 세션이 만료되었습니다.');
      }
    } else {
      // 기타 401 에러 (예상하지 못한 케이스)
      console.error('Unexpected 401 error:', message);
    }
  } else if (status === 403) {
    if (message === 'Player command failed: Restriction violated') {
      toast.error('성인 인증이 필요한 곡입니다.');
    } else {
      toast.error('재생 권한이 없는 콘텐츠입니다.');
    }
    console.error(error);
  } else if (status === 404) {
    //alert('연결된 장치가 존재하지 않습니다. 다시 로그인 해주세요.');
  } else if (status === 500) {
    toast.error(
      'Spotify 서비스에 일시적 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
    );
  } else if (status === 429) {
    const config = error.config as SpotifyRequestConfig | undefined;
    if (!config) {
      return Promise.reject(error);
    }

    const nextRetryCount = (config.__retryCount ?? 0) + 1;
    if (nextRetryCount > MAX_SPOTIFY_RETRY) {
      toast.error(
        '반복적인 요청으로 일시적으로 제한되었습니다. 잠시 후 다시 시도해주세요.'
      );
      return Promise.reject(error);
    }

    config.__retryCount = nextRetryCount;

    let waitMs: number;
    if (retryAfterHeader) {
      const retryAfterSeconds = Math.max(Number(retryAfterHeader) || 1, 1);
      waitMs = Math.min(retryAfterSeconds * 1000, MAX_BACKOFF_MS);
    } else {
      waitMs = Math.min(1000 * 2 ** (nextRetryCount - 1), MAX_BACKOFF_MS);
    }

    spotifyRateLimitUntil = Date.now() + waitMs;
    const waitSecondsRounded = Math.max(Math.round(waitMs / 1000), 1);
    toast.error(`요청이 많아 약 ${waitSecondsRounded}초 후 다시 시도합니다.`);
    console.warn(
      `Spotify rate limit - retrying after ${waitSecondsRounded}초`,
      config.url
    );

    await delay(waitMs);
    return apiSpotify.request(config);
  }

  return Promise.reject(error);
};

apiClient.interceptors.request.use(handleRequestInterceptor, Promise.reject);
apiClient.interceptors.response.use((res) => res, handleResponseInterceptor);

apiSpotify.interceptors.request.use(
  handleSpotifyRequestInterceptor,
  Promise.reject
);
apiSpotify.interceptors.response.use(
  (res) => res,
  handleSpotifyResponseInterceptor
);
