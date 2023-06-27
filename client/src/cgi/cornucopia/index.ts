import { post } from "@request";
const getCornucopiaUrl = "/cornucopia/get";
const getMaterialUrl = "/cornucopia/getMaterial";

// 获取聚宝盆信息
export async function getCornucopia() {
  return await post(getCornucopiaUrl);
}

// 获取聚宝材料
export async function getMaterial() {
    return await post(getMaterialUrl);
  }