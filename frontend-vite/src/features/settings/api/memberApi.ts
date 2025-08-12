import { apiClient } from '@/services/axios';
import type { Member } from '../types/member';

export async function fetchMember(): Promise<Member> {
  const { data } = await apiClient.get('/api/member/info');
  return data;
}

export async function updateMember(member: Member): Promise<Member> {
  const { data } = await apiClient.patch('/api/member/info', member);
  return data;
}
