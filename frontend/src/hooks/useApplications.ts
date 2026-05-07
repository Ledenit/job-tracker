import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  getApplications,
  createApplication,
  reorderApplications,
  deleteApplication,
  updateApplication
} from '../api/applications';


export const useApplications = () => {
  return useQuery({
    queryKey: ['applications'],
    queryFn: getApplications,
  });
};

export const useCreateApplication = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
    },
  });
};


export const useDeleteApplication = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteApplication,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['applications'] }),
  });
};

export const useUpdateApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      toast.success('Отклик успешно обновлен!');
    },
    onError: () => toast.error('Ошибка при обновлении карточки'),
  });
};

export const useReorderApplications = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: reorderApplications,
    onError: () => {
      toast.error('Синхронизация порядка не удалась');
      queryClient.invalidateQueries({ queryKey: ['applications'] });
    }
  });
};