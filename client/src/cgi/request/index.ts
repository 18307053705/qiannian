import axios, { Method } from "axios";
import { goLogin } from "@utils/goLogin";
interface requestConfig {
  baseUrl?: string;
  type?: Method;
}

const URL = window.location.hostname + "/api" || "//qiannian.com/api";

export interface BaseRequstData {
  [key: string]: any;
}

export interface BaseResponseBody {
  [key: string]: any;
}
export type DR = [BaseRequstData, BaseResponseBody];

type ResType = {
  code: number;
  data: any;
  message: string;
  text: string;
  success: string;
};

export async function request<T = {}>(
  url: string,
  params?: any,
  config?: requestConfig
): Promise<ResType & T> {
  const newUrl = config && config.baseUrl ? config.baseUrl : URL;
  try {
    const method = config && config.type ? config.type : "get";
    const requestConfig: any = {
      url: `//${newUrl}${url}`,
      method,
      timeout: 2000
    };
    if (method === "get" || method === "GET") {
      requestConfig.params = params;
    }
    if (method === "post" || method === "POST") {
      requestConfig.data = params;
    }

    const { data, request } = await axios.request(requestConfig);
    const history = data.data || {};
    // 跳转对应路径
    if (history.path) {
      window.QN.history.push(history.path, history.state || {});
    }
     if (data.path) {
      window.QN.history.push(data.path, data.state || {});
    }
    if (request.status === 200 && data.code === 0) {
      if (data.message) {
        window.QN.setError(data.message);
      }
      if (data.success) {
        window.QN.setSuccess(data.success);
      }
      return data;
    } else if (data.code === 100000) {
      // 登录异常跳转登录页
      goLogin();
    } else if (data.code === 100001 || data.code === 100006) {
      // 指令异常，返回角色选择页
      window.QN.history.push("/", history.state || {});
    }
    return Promise.reject(data);
  } catch (err) {
    // 处理失败情况，可用于上报错误日志
    console.log("!!! Error !!!", err);
    return Promise.reject(err);
  }
}

export async function post<T>(url: string, data?: any, config?: requestConfig) {
  return request<T>(url, data, { type: "post", ...config });
}

export async function get<T>(url: string, data?: any, config?: requestConfig) {
  return request<T>(url, data, { type: "get", ...config });
}

export default request;
