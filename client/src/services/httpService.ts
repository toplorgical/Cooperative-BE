import CookieManager from "@/manager/cookieManager";
import axios, { InternalAxiosRequestConfig } from "axios";
import { AxiosResponse, AxiosError } from "axios";
export const baseURL: string = process.env.NEXT_PUBLIC_API_URL  || "http://localhost:8100/api/v1";
class HTTPService {
  static accessToken = CookieManager.get("_tp_access_token");
  static config = axios.create({
    baseURL: baseURL,
    headers: {
      Authorization: "Bearer " + HTTPService.accessToken,
    },
  });
  static get = HTTPService.config.get;
  static put = HTTPService.config.put;
  static post = HTTPService.config.post;
  static delete = HTTPService.config.delete;
  static http = HTTPService.config;

  static initialize() {
    axios.interceptors.response.use(HTTPService.onResponse, HTTPService.onResponseError);
    axios.interceptors.request.use(HTTPService.onRequest, HTTPService.onRequestError);
  }
  private static onRequest(config: InternalAxiosRequestConfig) {
    return config;
  }
  private static onRequestError(error: AxiosError): Promise<AxiosError> {
    return Promise.reject(error);
  }
  private static onResponse(response: AxiosResponse): AxiosResponse {
    return response;
  }
  private static onResponseError(error: AxiosError | any): Promise<AxiosError> {
    return Promise.reject(error);
  }
}

HTTPService.initialize();

export default HTTPService;
