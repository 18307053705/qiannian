import { post } from "@request";
const getTreasureUrl = "/treasure/get";
const setTreasureUrl = "/treasure/set";
const mosaicUrl = "/treasure/mosaic";
const atryUrl = "/treasure/atry";

// 获取珍宝信息
export async function getTreasure() {
  return await post(getTreasureUrl);
}

// 设置珍宝信息
export async function setTreasure(data: { type: 1 | 2 | 3 | 4; key: 1 | 2 }) {
  return await post(setTreasureUrl, data);
}

// 镶嵌房屋装饰
export async function mosaic(data: { id: number }) {
  return await post(mosaicUrl, data);
}

// 房屋搏一搏
export async function atry() {
  return await post(atryUrl);
}
