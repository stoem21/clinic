import { isEqual } from "lodash";
import { Model } from "survey-react-ui";
import useLayoutStore from "../store/layoutStore";
import useAuthStore from "../store/authStore";

export const DEFAULT_PAGE_SIZE = 20;

type RequestOptions = { queryParams: Record<string, any> | URLSearchParams };
const parseQueryParams = (options?: RequestOptions): string => {
  if (!options?.queryParams) {
    return "";
  }

  const queryParams = options.queryParams;
  if (queryParams instanceof URLSearchParams) {
    return queryParams.toString();
  }

  if (typeof queryParams === "object") {
    const urlSearchParams = new URLSearchParams();
    for (const key in queryParams) {
      if (queryParams.hasOwnProperty(key)) {
        const value = queryParams[key];

        if (Array.isArray(value)) {
          value.forEach((item) => urlSearchParams.append(key, item.toString()));
        } else {
          urlSearchParams.append(key, value.toString());
        }
      }
    }
    return urlSearchParams.toString();
  }

  return "";
};
const cleanUrl = (
  urlPath: string,
  options?: { queryParams: Record<string, any> | URLSearchParams }
): URL => {
  const trailingParams = parseQueryParams(options);
  return new URL(
    `${urlPath.replace(/^\//, "")}${
      (trailingParams && "?" + trailingParams) ?? ""
    }`
  );
};

interface RequestService {
  httpMethod: string;
  path: string;
  queryParams?: Record<string, any> | URLSearchParams;
  token?: string;
  body?: any;
  // onSuccessRequest?: (returnedValue: any) => void;
  onFailRequest?: (returnedValue: any) => void;
}

export interface PaginationResult {
  pageSize: number;
  page: number;
  total: number;
}

export interface PaginationRequest {
  pageSize?: number;
  page?: number;
  pagination?: string;
}

export interface RequestResult {
  isSuccess: boolean;
  data: any;
  pagination?: PaginationResult;
  error?: any;
}

export interface DefaultRequestServiceReturn {
  isSuccess: boolean;
  errorMsg?: string;
}

export const requestService = async ({
  httpMethod,
  path,
  queryParams,
  body,
  token,
}: RequestService): Promise<RequestResult> => {
  const requestOptions = {
    method: httpMethod,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  };
  const url = queryParams ? cleanUrl(path, { queryParams }) : cleanUrl(path);
  return await fetch(url, requestOptions)
    .then(async (response) => {
      if (response.status == 401) {
        useAuthStore.getState().logout();
        useLayoutStore.getState().setTarget("/");
        return { isSuccess: false, data: response.json() };
      }
      return {
        isSuccess: response.status === 200,
        data: await response.json(),
      };
    })
    .catch((error) => {
      return { isSuccess: false, data: error };
    });
};

export const mergeSurvey = async (
  survey: Model,
  receivedData: object,
  maxTime = 3,
  force = false
) => {
  for (let i = 0; i < maxTime; i++) {
    survey.mergeData(receivedData);
    if (isEqual(survey.getAllValues(), receivedData) && !force) {
      break;
    }
  }
};

export const formatDate = (date: Date) => {
  // YYYY-MM-DD
  let month = "" + (date.getMonth() + 1),
    day = "" + date.getDate(),
    year = date.getFullYear();

  if (month.length < 2) {
    month = "0" + month;
  }
  if (day.length < 2) {
    day = "0" + day;
  }
  return [year, month, day].join("-");
};

export const formatDateDisplay = (date: Date) => {
  // YYYY-MM-DD
  let month = "" + (date.getMonth() + 1),
    day = "" + date.getDate(),
    year = date.getFullYear();

  if (month.length < 2) {
    month = "0" + month;
  }
  if (day.length < 2) {
    day = "0" + day;
  }
  return [day, month, year].join("/");
};
