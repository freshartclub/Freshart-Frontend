import type { AxiosRequestConfig } from 'axios';

import axios from 'axios';
import { store } from '../../store/store';
import { setIsAuthorized } from '../../store/userSlice/userSlice';
import { getToken } from './tokenHelper';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL,
  timeout: 300000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'ngrok-skip-browser-warning': '69420',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const ERROR_MSGs = [
  'Token is not found',
  'You are not authorized',
  'Invalid token please do re-login',
];

export function setup() {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = getToken();
      config.headers = {
        Authorization: `${token ? `Bearer ${token}` : ''}`,
        ...config.headers,
      };
      return config;
    },
    (error) => Promise.reject(error)
  );

  const { dispatch } = store;
  axiosInstance.interceptors.response.use(
    (res) => res,
    async (err) => {
      if (ERROR_MSGs.includes(err?.response?.data.message)) {
        dispatch(setIsAuthorized(false));
      }
      return Promise.reject(err);
    }
  );
}

export default axiosInstance;

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await axiosInstance.get(url, { ...config });

    return res.data;
  } catch (error) {
    console.error('Failed to fetch:', error);
    throw error;
  }
};

// ----------------------------------------------------------------------

export const endpoints = {
  chat: '/api/chat',
  kanban: '/api/kanban',
  calendar: '/api/calendar',
  auth: {
    me: '/api/auth/me',
    signIn: '/api/auth/sign-in',
    signUp: '/api/auth/sign-up',
  },
  mail: {
    list: '/api/mail/list',
    details: '/api/mail/details',
    labels: '/api/mail/labels',
  },
  post: {
    list: '/api/post/list',
    details: '/api/post/details',
    latest: '/api/post/latest',
    search: '/api/post/search',
  },
  product: {
    list: '/api/product/list',
    details: '/api/product/details',
    search: '/api/product/search',
  },
};
