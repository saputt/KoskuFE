import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getKeluhanList, createKeluhan, tanggapiKeluhan } from '../api';

export function useKeluhanList(params) {
  return useQuery({
    queryKey: ['keluhan', params],
    queryFn: () => getKeluhanList(params),
    staleTime: 60 * 1000,
  });
}

export function useCreateKeluhan() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => createKeluhan(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['keluhan'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
}

export function useTanggapiKeluhan() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => tanggapiKeluhan(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['keluhan'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
}
