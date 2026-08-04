import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { loginApi, registerApi, logoutApi, getMeApi } from '../api';
import useAuthStore from '../../../stores/authStore';

export function useLogin() {
  const setSession = useAuthStore((s) => s.setSession);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ email, password }) => loginApi(email, password),
    onSuccess: (res) => {
      const { user, token } = res.data;
      setSession(user, token);
      navigate(user?.role === 'pemilik' ? '/pemilik/dashboard' : '/penghuni/dashboard', { replace: true });
    },
  });
}

export function useRegister() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data) => registerApi(data),
    onSuccess: () => navigate('/login'),
  });
}

export function useLogout() {
  const clearSession = useAuthStore((s) => s.clearSession);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => logoutApi(),
    onSettled: () => {
      clearSession();
      queryClient.clear();
      navigate('/login');
    },
  });
}

export function useMe(enabled = true) {
  const setUser = useAuthStore((s) => s.setUser);

  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: () => getMeApi().then((res) => res.data),
    enabled,
    staleTime: 5 * 60 * 1000,
    onSuccess: (user) => setUser(user),
  });
}
