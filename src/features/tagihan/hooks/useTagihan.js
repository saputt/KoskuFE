import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTagihanList, getTagihanDetail, generateTagihan, updateTagihan } from '../api';

export function useTagihanList(params) {
  return useQuery({
    queryKey: ['tagihan', params],
    queryFn: () => getTagihanList(params),
    staleTime: 60 * 1000,
  });
}

export function useTagihanDetail(id) {
  return useQuery({
    queryKey: ['tagihan', 'detail', id],
    queryFn: () => getTagihanDetail(id),
    enabled: !!id,
    staleTime: 60 * 1000,
  });
}

export function useGenerateTagihan() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => generateTagihan(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tagihan'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
}

export function useUpdateTagihan() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateTagihan(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tagihan'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
}
