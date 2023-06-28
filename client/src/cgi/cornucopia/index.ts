import { post } from "@request";
const getCornucopiaUrl = "/cornucopia/get";
const getMaterialUrl = "/cornucopia/getMaterial";
const chengIdUrl = "/cornucopia/chengId";
const gatherUrl = "/cornucopia/gather";
const drawUrl = "/cornucopia/draw";

// 获取聚宝盆信息
export async function getCornucopia() {
  return await post(getCornucopiaUrl);
}

// 获取聚宝材料
export async function getMaterial() {
  return await post(getMaterialUrl);
}

// 更换奖励
export async function chengId() {
  return await post(chengIdUrl);
}

// 聚宝
export async function gather(data: { materialIds: any[] }) {
  return await post(gatherUrl, data);
}

// 抽奖
export async function draw() {
  return await post(drawUrl);
}
