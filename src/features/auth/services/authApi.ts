import { apiClient } from '@/services/axios';
import type {
  LoginFormValues,
  LoginResponse,
  SignupFormValues,
} from '../types';
import type { Member } from '@/features/settings/types/member';

export async function loginApi(form: LoginFormValues): Promise<LoginResponse> {
  const { data } = await apiClient.post('/login', form);
  return data;
}

export async function signupApi(form: SignupFormValues): Promise<void> {
  await apiClient.post('/join', form);
}

export async function meApi(): Promise<Member> {
  const { data } = await apiClient.get('/api/member/info');
  return data;
}
