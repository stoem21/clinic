import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  DefaultRequestServiceReturn,
  requestService,
} from "../httpClient/service";
import useAuthStore from "./authStore";

export interface UserQueryParam {
  username?: string;
  role?: string;
  isActive?: boolean;
}

export interface CreateUserBody {
  username: string;
  role: string;
}

export interface SuperAdminUpdateUserBody {
  role?: string;
  resetPassword?: boolean;
  recoveryUser?: boolean;
}

export interface UserChangePasswordBody {
  password: string;
}

interface UserStore {
  users: any[];
  getUsers: (
    queryParams?: UserQueryParam
  ) => Promise<DefaultRequestServiceReturn>;
  getUser: (username: string) => Promise<any>;
  superAdminUpdateUser: (
    username: string,
    body: SuperAdminUpdateUserBody
  ) => Promise<any>;
  userChangePassword: (
    username: string,
    body: UserChangePasswordBody
  ) => Promise<any>;
  createUser: (body: CreateUserBody) => Promise<any>;
  deleteUser: (username: string) => Promise<any>;
}

const useUserStore = create(
  persist<UserStore>(
    (set, _) => ({
      users: [],
      getUsers: async (queryParams?: UserQueryParam) => {
        const resp = await requestService({
          httpMethod: "GET",
          path: `${import.meta.env.VITE_REACT_BASE_PATH}/user`,
          queryParams: { ...queryParams, pagination: "false" },
          token: useAuthStore.getState().userData?.token,
        });
        if (!resp.isSuccess) {
          return { isSuccess: false, errorMsg: resp.data.message };
        }
        set({ users: resp.data.data });

        return { isSuccess: true };
      },
      getUser: async (username: string) => {
        const resp = await requestService({
          httpMethod: "GET",
          path: `${import.meta.env.VITE_REACT_BASE_PATH}/user/${username}`,
          token: useAuthStore.getState().userData?.token,
        });
        if (!resp.isSuccess) {
          return { isSuccess: false, errorMsg: resp.data.message };
        }

        return { isSuccess: true, data: resp.data };
      },
      superAdminUpdateUser: async (
        username: string,
        body: SuperAdminUpdateUserBody
      ) => {
        const resp = await requestService({
          httpMethod: "PATCH",
          path: `${import.meta.env.VITE_REACT_BASE_PATH}/user/${username}`,
          token: useAuthStore.getState().userData?.token,
          body,
        });
        if (!resp.isSuccess) {
          return { isSuccess: false, errorMsg: resp.data.message };
        }

        return { isSuccess: true, data: resp.data };
      },
      userChangePassword: async (
        username: string,
        body: UserChangePasswordBody
      ) => {
        const resp = await requestService({
          httpMethod: "PATCH",
          path: `${
            import.meta.env.VITE_REACT_BASE_PATH
          }/user/password/${username}`,
          token: useAuthStore.getState().userData?.token,
          body,
        });
        if (!resp.isSuccess) {
          return { isSuccess: false, errorMsg: resp.data.message };
        }

        return { isSuccess: true, data: resp.data };
      },
      createUser: async (body: CreateUserBody) => {
        const resp = await requestService({
          httpMethod: "POST",
          path: `${import.meta.env.VITE_REACT_BASE_PATH}/user`,
          body,
          token: useAuthStore.getState().userData?.token,
        });
        if (!resp.isSuccess) {
          return {
            isSuccess: false,
            errorMsg: resp.data.message || resp.data.error,
          };
        }
        return { isSuccess: true, data: resp.data };
      },
      deleteUser: async (username: string) => {
        const resp = await requestService({
          httpMethod: "DELETE",
          path: `${import.meta.env.VITE_REACT_BASE_PATH}/user/${username}`,
          token: useAuthStore.getState().userData?.token,
        });
        if (!resp.isSuccess) {
          return { isSuccess: false, errorMsg: resp.data.message };
        }
        return { isSuccess: true, data: resp.data };
      },
    }),
    {
      name: "user",
    }
  )
);

export default useUserStore;
