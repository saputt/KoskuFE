import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPenyewaanList, ajukanSewa, konfirmasiSewa } from '../api';

export function usePenyewaanList(params) {
  return useQuery({
    queryKey: ['penyewaan', params],
    queryFn: () => getPenyewaanList(params),
    staleTime: 60 * 1000,
  });
}

export function useAjukanSewa() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => ajukanSewa(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['penyewaan'] });
      queryClient.invalidateQueries({ queryKey: ['kamar'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
}

export function useKonfirmasiSewa() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => konfirmasiSewa(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['penyewaan'] });
      queryClient.invalidateQueries({ queryKey: ['kamar'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
}
