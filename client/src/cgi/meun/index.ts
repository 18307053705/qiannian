import { get } from "@request";
const getMeunListUrl = `/meun/getMeunList`;

export interface getMeunListRes {
  error: string;
  code: number;
  msg: string;
  data: any;
}
// 获取角色列表
export async function getMeunList(data={}) {
  return await get(getMeunListUrl,data);
}
