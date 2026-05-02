import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getApplications, 
  createApplication, 
  updateApplicationStatus, 
  deleteApplication 
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

export const useUpdateStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateApplicationStatus,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['applications'] }),
  });
};

export const useDeleteApplication = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteApplication,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['applications'] }),
  });
};