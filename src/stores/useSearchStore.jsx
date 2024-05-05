import { create } from "zustand";
import { persist } from "zustand/middleware";

const useSearchStore = create(
  persist(
    (set) => ({
      location: "",
      checkInDate: null,
      checkOutDate: null,
      guests: { adults: 0, children: 0, infants: 0, pets: 0 },

      setLocation: (location) => set({ location }),
      setCheckInDate: (date) => set({ checkInDate: date }),
      setCheckOutDate: (date) => set({ checkOutDate: date }),
      setGuests: (fn) => set((state) => ({ guests: fn(state.guests) })),

      clearSearchStore: () =>
        set({
          location: "",
          checkInDate: null,
          checkOutDate: null,
          guests: { adults: 0, children: 0, infants: 0, pets: 0 },
        }),
    }),
    {
      name: "searchStore",
    }
  )
);

export const useSearchStoreState = () => useSearchStore((state) => state);

export const useSearchActions = () => {
  const {
    setLocation,
    setCheckInDate,
    setCheckOutDate,
    setGuests,
    clearSearchStore,
  } = useSearchStore();
  return {
    setLocation,
    setCheckInDate,
    setCheckOutDate,
    setGuests,
    clearSearchStore,
  };
};
