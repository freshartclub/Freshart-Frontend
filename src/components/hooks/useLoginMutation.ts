// src/hooks/useLoginMutation.js
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const login = async ({credentials}:any) => {
  const { data } = await axios.post('/api/login', credentials);
  return data;
};

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      // Handle successful login (e.g., redirect or store token)
      console.log('Login successful:', data);
    },
    onError: (error) => {
      // Handle error (e.g., show an error message)
      console.error('Login error:', error);
    },
  });
};
