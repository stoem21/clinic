import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  DefaultRequestServiceReturn,
  PaginationRequest,
  PaginationResult,
  requestService,
} from "../httpClient/service";
import useAuthStore from "./authStore";

export interface ClientProfileQueryParam extends PaginationRequest {
  hn?: string;
  name?: string;
  nationalId?: string;
  phoneNumber?: string;
  orthoDentistId?: string;
}

interface ClientProfileBody {
  name: string;
  nationalId?: string;
  phoneNumber: string;
  gender: string;
  address?: string;
  birthday?: string;
  medicalCondition?: string;
  drugAllergy?: string;
  drugEat?: string;
  orthoDentistId?: string;
}

interface ClientProfileResponse {
  birthday: string | null;
  createdAt: string | null;
  createdBy: string | null;
  drugAllergy: string | null;
  drugEat: string | null;
  firstName: string;
  gender: string;
  hn: string;
  lastName: string;
  medicalCondition: string | null;
  nameTitle: string;
  nationalId: string | null;
  orthoDentistId: number | null;
  phoneNumber: string;
  updatedAt: string | null;
  updatedBy: string | null;
  district: number;
  house: string;
  province: number;
  subDistrict: number;
  zipcode: number;
}

interface ClientProfileStore {
  clientProfiles: any[];
  pagination: PaginationResult | null;
  getClientProfiles: (
    queryParams?: ClientProfileQueryParam
  ) => Promise<DefaultRequestServiceReturn>;
  getClientProfile: (hn: string) => Promise<
    DefaultRequestServiceReturn & {
      data?: {
        data: ClientProfileResponse;
      };
    }
  >;
  updateClientProfile: (hn: string, body: ClientProfileBody) => Promise<any>;
  createClientProfile: (body: ClientProfileBody) => Promise<any>;
  //   showModal: (modalConfig: any) => void;
  //   hideModal: () => void;
  //   setLoading: (isLoading: boolean) => void;
}
const useClientProfileStore = create(
  persist<ClientProfileStore>(
    (set, _) => ({
      clientProfiles: [],
      pagination: null,
      getClientProfiles: async (queryParams?: ClientProfileQueryParam) => {
        const resp = await requestService({
          httpMethod: "GET",
          path: `${import.meta.env.VITE_REACT_BASE_PATH}/client-profile`,
          queryParams,
          token: useAuthStore.getState().userData?.token,
        });
        if (!resp.isSuccess) {
          return { isSuccess: false, errorMsg: resp.data.message };
        }

        set({
          clientProfiles: resp.data.data,
          pagination: resp.data.pagination || null,
        });

        return { isSuccess: true };
      },
      getClientProfile: async (hn) => {
        const resp = await requestService({
          httpMethod: "GET",
          path: `${import.meta.env.VITE_REACT_BASE_PATH}/client-profile/${hn}`,
          token: useAuthStore.getState().userData?.token,
        });
        if (!resp.isSuccess) {
          return { isSuccess: false, errorMsg: resp.data.message };
        }
        return { isSuccess: true, data: resp.data };
      },
      updateClientProfile: async (hn, body) => {
        const resp = await requestService({
          httpMethod: "PUT",
          path: `${import.meta.env.VITE_REACT_BASE_PATH}/client-profile/${hn}`,
          body,
          token: useAuthStore.getState().userData?.token,
        });
        if (!resp.isSuccess) {
          return { isSuccess: false, errorMsg: resp.data.message };
        }
        return { isSuccess: true, data: resp.data };
      },
      createClientProfile: async (body) => {
        const resp = await requestService({
          httpMethod: "POST",
          path: `${import.meta.env.VITE_REACT_BASE_PATH}/client-profile`,
          body,
          token: useAuthStore.getState().userData?.token,
        });
        if (!resp.isSuccess) {
          return { isSuccess: false, errorMsg: resp.data.message };
        }
        return { isSuccess: true, data: resp.data };
      },
    }),
    {
      name: "client-profile",
    }
  )
);

export default useClientProfileStore;
