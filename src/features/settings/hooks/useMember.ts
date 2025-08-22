import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchMember, updateMember } from '../api/memberApi';
import type { Member } from '../types/member';
import toast from 'react-hot-toast';

export default function useMember() {
  const queryClient = useQueryClient();
  const {
    data: member,
    isLoading,
    error,
  } = useQuery<Member>({
    queryKey: ['member'],
    queryFn: fetchMember,
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 25,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const { mutate: update } = useMutation({
    mutationFn: (member: Member) => updateMember(member),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['member'] });
      toast.success('회원정보 수정 성공!');
    },
    onError: () => {
      toast.error('회원정보 수정 실패!');
    },
  });

  return { member, isLoading, error, update };
}
