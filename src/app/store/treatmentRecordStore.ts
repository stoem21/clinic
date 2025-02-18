import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  PaginationRequest,
  PaginationResult,
  requestService,
} from "../httpClient/service";
import useAuthStore from "./authStore";
import useLayoutStore from "./layoutStore";

export interface TreatmentRecordQueryParam extends PaginationRequest {
  startDate?: string;
  endDate?: string;
  hn?: string;
  dentistId?: number;
}

export interface TreatmentRecord {
  id: string;
  clientHN: string;
  dentistId: number;
  treatmentDate: string;
  note?: string | null;
  treatmentItems: any[];
}

interface TreatmentRecordStore {
  treatmentRecords: any[];
  pagination: PaginationResult | null;
  createTreatmentRecord: (body: any) => Promise<any>;
  updateTreatmentRecord: (id: string, body: any) => Promise<any>;
  getTreatmentRecord: (id: string) => Promise<any>;
  getTreatmentRecords: (
    queryParams?: TreatmentRecordQueryParam
  ) => Promise<any>;
}

const useTreatmentRecordStore = create(
  persist<TreatmentRecordStore>(
    (set, _) => ({
      treatmentRecords: [],
      pagination: null,
      getTreatmentRecords: async (queryParams?: TreatmentRecordQueryParam) => {
        const resp = await requestService({
          httpMethod: "GET",
          path: `${import.meta.env.VITE_REACT_BASE_PATH}/treatment-record`,
          queryParams,
          token: useAuthStore.getState().userData?.token,
          onFailRequest: () => useLayoutStore.getState().setTarget("/"),
        });
        if (!resp.isSuccess) {
          return { isSuccess: false, errorMsg: resp.data.message };
        }
        set({
          treatmentRecords: resp.data.data,
          pagination: resp.data.pagination || null,
        });

        return { isSuccess: true };
      },
      getTreatmentRecord: async (recordId) => {
        const resp = await requestService({
          httpMethod: "GET",
          path: `${
            import.meta.env.VITE_REACT_BASE_PATH
          }/treatment-record/${recordId}`,
          token: useAuthStore.getState().userData?.token,
        });
        if (!resp.isSuccess) {
          return { isSuccess: false, errorMsg: resp.data.message };
        }
        return { isSuccess: true, data: resp.data };
      },
      updateTreatmentRecord: async (recordId, body) => {
        const resp = await requestService({
          httpMethod: "PUT",
          path: `${
            import.meta.env.VITE_REACT_BASE_PATH
          }/treatment-record/${recordId}`,
          body,
          token: useAuthStore.getState().userData?.token,
        });
        if (!resp.isSuccess) {
          return { isSuccess: false, errorMsg: resp.data.message };
        }
        return { isSuccess: true, data: resp.data };
      },
      createTreatmentRecord: async (body) => {
        const resp = await requestService({
          httpMethod: "POST",
          path: `${import.meta.env.VITE_REACT_BASE_PATH}/treatment-record`,
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
      name: "treatment-record",
    }
  )
);

export default useTreatmentRecordStore;
