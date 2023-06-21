import { post } from "@request";
const chatSettUrl = "/chat/set";
const chatGettUrl = "/chat/get";

// 发送信息
export async function chatSet(data: {
  type: number;
  text: string;
  t_role?: string;
}) {
  return await post<{socializeName:string}>(chatSettUrl, data);
}

// 获取信息
export async function chatGet(data: { type?: number } = {}) {
  return await post<{socializeName:string}>(chatGettUrl, data);
}
