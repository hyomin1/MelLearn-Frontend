import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import type { LoginFormValues, SignupFormValues } from '../types';
import { loginApi, meApi, signupApi } from '../services/authApi';
import { ROUTES } from '@/services/router';
import type { AxiosError } from 'axios';

type APIError = {
  message: string;
};

export default function useAuth() {
  const navigate = useNavigate();

  const { data: member } = useQuery({
    queryKey: ['memberInfo'],
    queryFn: meApi,
    retry: false,
  });

  const { mutate: login } = useMutation<
    unknown,
    AxiosError<APIError>,
    LoginFormValues
  >({
    mutationFn: (form: LoginFormValues) => loginApi(form),
    onSuccess: () => {
      toast.success('로그인 성공!');
      navigate(ROUTES.SPOTIFY_LOGIN);
    },
    onError: (error) => {
      const msg = error.response?.data?.message || '로그인 실패';
      toast.error(msg);
    },
  });

  const { mutate: signup } = useMutation<
    unknown,
    AxiosError<APIError>,
    SignupFormValues
  >({
    mutationFn: (form: SignupFormValues) => signupApi(form),
    onSuccess: () => {
      toast.success('회원가입 성공!');
      navigate(ROUTES.LOGIN);
    },
    onError: (error) => {
      const msg = error.response?.data?.message || '로그인 실패';
      toast.error(msg);
    },
  });
  const isAuthenticated = !!member;

  return { login, signup, isAuthenticated };
}
