import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getKamarList, getKamarDetail, createKamar, updateKamar, deleteKamar } from '../api';

export function useKamarList(params) {
  return useQuery({
    queryKey: ['kamar', params],
    queryFn: () => getKamarList(params),
    staleTime: 60 * 1000,
  });
}

export function useKamarDetail(id) {
  return useQuery({
    queryKey: ['kamar', 'detail', id],
    queryFn: () => getKamarDetail(id),
    enabled: !!id,
    staleTime: 60 * 1000,
  });
}

export function useCreateKamar() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => createKamar(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['kamar'] }),
  });
}

export function useUpdateKamar() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateKamar(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['kamar'] });
      queryClient.invalidateQueries({ queryKey: ['kamar', 'detail', id] });
    },
  });
}

export function useDeleteKamar() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteKamar(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['kamar'] }),
  });
}
