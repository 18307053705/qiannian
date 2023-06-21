import axios, { Method } from "axios";
import { goLogin } from "@utils/goLogin";
interface requestConfig {
  baseUrl?: string;
  type?: Method;
}

const URL = "//qiannian.com/api";

export interface BaseRequstData {
  [key: string]: any;
}

export interface BaseResponseBody {
  [key: string]: any;
}
export type DR = [BaseRequstData, BaseResponseBody];

export async function request(
  url: string,
  data?: any,
  config?: requestConfig
): Promise<{
  code: number;
  data: any;
  message: string;
  text: string;
  success: string;
}> {
  const newUrl = config && config.baseUrl ? config.baseUrl : URL;
  try {
    const method = config && config.type ? config.type : "get";
    const requestConfig: any = {
      url: `//${newUrl}${url}`,
      method,
      timeout: 2000
    };
    if (method === "get" || method === "GET") {
      requestConfig.params = data;
    }
    if (method === "post" || method === "POST") {
      requestConfig.data = data;
    }
    let res = await axios.request(requestConfig);

    const request = res.request;
    if (request.status === 200 && res.data.code === 0) {
      if (res.data.message) {
        window.QN.setError(res.data.message);
      }
      if (res.data.success) {
        window.QN.setError(res.data.success);
      }
      return res.data;
    } else if (res.data.code === 100000) {
      // 登录异常跳转登录页
      goLogin();
    } else if (res.data.code === 100007 || res.data.code === 100006) {
      // 指令异常，返回角色选择页
      window.location.pathname = "/";
    } else {
      return Promise.reject(res.data);
    }
  } catch (err) {
    // 处理失败情况，可用于上报错误日志
    console.log("!!! Error !!!", err);
    return Promise.reject(err);
  }
}

export async function post(url: string, data?: any, config?: requestConfig) {
  return request(url, data, { type: "post", ...config });
}

export async function get(url: string, data?: any, config?: requestConfig) {
  return request(url, data, { type: "get", ...config });
}

export default request;
