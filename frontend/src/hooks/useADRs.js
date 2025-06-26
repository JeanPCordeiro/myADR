import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adrApi } from '../lib/api';

export const useADRs = (filters = {}) => {
  return useQuery({
    queryKey: ['adrs', filters],
    queryFn: () => adrApi.getAll(filters).then(res => res.data),
  });
};

export const useADR = (id) => {
  return useQuery({
    queryKey: ['adr', id],
    queryFn: () => adrApi.getById(id).then(res => res.data),
    enabled: !!id,
  });
};

export const useCreateADR = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (adrData) => adrApi.create(adrData).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adrs'] });
    },
  });
};

export const useUpdateADR = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }) => adrApi.update(id, data).then(res => res.data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['adrs'] });
      queryClient.invalidateQueries({ queryKey: ['adr', variables.id] });
    },
  });
};

export const useApproveADR = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id) => adrApi.approve(id).then(res => res.data),
    onSuccess: (data, id) => {
      queryClient.invalidateQueries({ queryKey: ['adrs'] });
      queryClient.invalidateQueries({ queryKey: ['adr', id] });
    },
  });
};

export const useRejectADR = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id) => adrApi.reject(id).then(res => res.data),
    onSuccess: (data, id) => {
      queryClient.invalidateQueries({ queryKey: ['adrs'] });
      queryClient.invalidateQueries({ queryKey: ['adr', id] });
    },
  });
};

export const useDeleteADR = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id) => adrApi.delete(id).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adrs'] });
    },
  });
};

