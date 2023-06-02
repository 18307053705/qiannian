import { post } from "@request";
const loginUrl = `/user/login`;
const registerUrl = `/user/register`;

export interface loginReq {
  user: string;
  pass: string;
}

// 登录
export async function login(params: loginReq) {
  return await post(loginUrl, params);
}

// 登录
export async function register(params: loginReq) {
  return await post(registerUrl, params);
}
