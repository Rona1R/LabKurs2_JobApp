import { create } from "zustand";

export const useAuthStore = create(() => ({
  user: localStorage.getItem('user'),
  accessToken: localStorage.getItem('accessToken'),
  login: (user, accessToken) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('user', JSON.stringify(user));
  },
  logOut: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  }
}));
