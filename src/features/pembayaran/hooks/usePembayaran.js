import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPembayaranList, bayarTagihan, verifikasiPembayaran, getLaporanPembayaran } from '../api';

export function usePembayaranList(params) {
  return useQuery({
    queryKey: ['pembayaran', params],
    queryFn: () => getPembayaranList(params),
    staleTime: 60 * 1000,
  });
}

export function useLaporanPembayaran(periode) {
  return useQuery({
    queryKey: ['pembayaran', 'laporan', periode || 'semua'],
    queryFn: () => getLaporanPembayaran(periode),
    staleTime: 60 * 1000,
  });
}

export function useBayarTagihan() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData) => bayarTagihan(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pembayaran'] });
      queryClient.invalidateQueries({ queryKey: ['tagihan'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
}

export function useVerifikasiPembayaran() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => verifikasiPembayaran(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pembayaran'] });
      queryClient.invalidateQueries({ queryKey: ['tagihan'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
}
