import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LayoutStore {
  // toast
  isLoading: boolean;
  target: string;
  setLoading: (isLoading: boolean) => void;
  setTarget: (target: string) => void;
}
const useLayoutStore = create(
  persist<LayoutStore>(
    (set, _) => ({
      isLoading: false,
      target: "",
      setLoading: (isLoading) => {
        set({ isLoading });
      },
      setTarget: (target) => {
        set({ target });
      },
    }),
    {
      name: "layout",
    }
  )
);

export default useLayoutStore;
