import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user",
    }
  )
);

export const useToken = () => useUserStore((state) => state.user?.jwt);

export const useUserActions = () => {
  const { setUser, clearUser } = useUserStore();
  return { setUser, clearUser };
};
