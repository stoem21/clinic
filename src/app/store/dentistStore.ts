import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  DefaultRequestServiceReturn,
  requestService,
} from "../httpClient/service";
import useAuthStore from "./authStore";

export interface DentistQueryParam {
  dentistLicensId?: string;
  isActive?: boolean;
}

export interface CreateDentistBody {
  name: string;
  phoneNumber?: string;
  email?: string;
  lineId?: string;
  note?: string;
  dentistLicensId: string;
  isOrthoDentist?: boolean;
}

interface DentistStore {
  dentists: any[];
  getDentists: (
    queryParams?: DentistQueryParam
  ) => Promise<DefaultRequestServiceReturn>;
  getDentist: (id: string) => Promise<any>;
  updateDentist: (id: string, body: CreateDentistBody) => Promise<any>;
  createDentist: (body: CreateDentistBody) => Promise<any>;
  deleteDentist: (id: string) => Promise<any>;
  activateDentist: (id: string) => Promise<any>;
}

const useDentistStore = create(
  persist<DentistStore>(
    (set, _) => ({
      dentists: [],
      getDentists: async (queryParams) => {
        const resp = await requestService({
          httpMethod: "GET",
          path: `${import.meta.env.VITE_REACT_BASE_PATH}/dentist`,
          queryParams: { ...queryParams, pagination: "false" },
          token: useAuthStore.getState().userData?.token,
        });
        if (!resp.isSuccess) {
          return { isSuccess: false, errorMsg: resp.data.message };
        }
        set({ dentists: resp.data.data });

        return { isSuccess: true };
      },
      getDentist: async (id) => {
        const resp = await requestService({
          httpMethod: "GET",
          path: `${import.meta.env.VITE_REACT_BASE_PATH}/dentist/${id}`,
          token: useAuthStore.getState().userData?.token,
        });
        if (!resp.isSuccess) {
          return { isSuccess: false, errorMsg: resp.data.message };
        }

        return { isSuccess: true, data: resp.data };
      },
      updateDentist: async (id, body) => {
        const resp = await requestService({
          httpMethod: "PUT",
          path: `${import.meta.env.VITE_REACT_BASE_PATH}/dentist/${id}`,
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
      createDentist: async (body) => {
        const resp = await requestService({
          httpMethod: "POST",
          path: `${import.meta.env.VITE_REACT_BASE_PATH}/dentist`,
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
      deleteDentist: async (id) => {
        const resp = await requestService({
          httpMethod: "DELETE",
          path: `${import.meta.env.VITE_REACT_BASE_PATH}/dentist/${id}`,
          token: useAuthStore.getState().userData?.token,
        });
        if (!resp.isSuccess) {
          return { isSuccess: false, errorMsg: resp.data.message };
        }
        return { isSuccess: true, data: resp.data };
      },
      activateDentist: async (id) => {
        const resp = await requestService({
          httpMethod: "GET",
          path: `${
            import.meta.env.VITE_REACT_BASE_PATH
          }/dentist/activate/${id}`,
          token: useAuthStore.getState().userData?.token,
        });
        if (!resp.isSuccess) {
          return { isSuccess: false, errorMsg: resp.data.message };
        }
        return { isSuccess: true, data: resp.data };
      },
    }),
    { name: "dentist" }
  )
);

export default useDentistStore;
