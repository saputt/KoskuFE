import { useQuery } from '@tanstack/react-query';
import { getDashboardPemilik, getDashboardPenghuni, getAktivitas } from '../api';

export function useDashboardPemilik() {
  return useQuery({
    queryKey: ['dashboard', 'pemilik'],
    queryFn: () => getDashboardPemilik(),
    staleTime: 60 * 1000,
  });
}

export function useDashboardPenghuni() {
  return useQuery({
    queryKey: ['dashboard', 'penghuni'],
    queryFn: () => getDashboardPenghuni(),
    staleTime: 60 * 1000,
  });
}

export function useAktivitas(limit = 10) {
  return useQuery({
    queryKey: ['dashboard', 'aktivitas', limit],
    queryFn: () => getAktivitas(limit),
    staleTime: 30 * 1000,
  });
}
