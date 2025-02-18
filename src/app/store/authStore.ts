import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  DefaultRequestServiceReturn,
  requestService,
} from "../httpClient/service.ts";
export enum Role {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  USER = "USER",
}
interface UserData {
  username: string;
  role: Role;
  token: string;
  isChangedPassword: boolean;
}

interface AuthStore {
  userData: UserData | null;
  login: (
    username: string,
    password: string
  ) => Promise<DefaultRequestServiceReturn & { isChangedPassword?: boolean }>;
  logout: () => void;
  getProfile: () => void;
}
const useAuthStore = create(
  persist<AuthStore>(
    (set, get) => ({
      userData: null,
      login: async (username, password) => {
        const resp = await requestService({
          httpMethod: "POST",
          path: `${import.meta.env.VITE_REACT_BASE_PATH}/login`,
          body: { username, password },
        });
        if (!resp.isSuccess) {
          return { isSuccess: false, errorMsg: resp.data.message };
        }
        set({
          userData: {
            username: resp.data.user.username,
            role: resp.data.user.role as Role,
            isChangedPassword: resp.data.user.isChangedPassword,
            token: resp.data.token,
          },
        });
        return {
          isSuccess: true,
          isChangedPassword: resp.data.user.isChangedPassword,
        };
      },
      logout: () => {
        // get request set block token
        set({ userData: null });
        localStorage.clear();
      },
      getProfile: async () => {
        const resp = await requestService({
          httpMethod: "GET",
          path: `${import.meta.env.VITE_REACT_BASE_PATH}/profile`,
        });
        if (!resp.isSuccess) {
          return { isSuccess: false, errorMsg: resp.data.message };
        }
        const oldToken = get().userData?.token;
        set({
          userData: {
            username: resp.data.user.username,
            role: resp.data.user.role as Role,
            isChangedPassword: resp.data.user.isChangedPassword,
            token: oldToken ?? "",
          },
        });
      },
    }),
    {
      name: "userLoginStatus",
    }
  )
);

export default useAuthStore;
