import { post } from "@request";
const getShopListUrl = "/shopping/list";
const getDetailUrl = "/shopping/detail";
const createShopUrl = "/shopping/create";
const modifyShopUrl = "/shopping/modify";
const groundingUrl = "/shopping/grounding";
const purchaseUrl = "/shopping/purchase";

export async function createShop(data: { name: string }) {
  return await post(createShopUrl, data);
}

export async function modifyShop(data: { name: string }) {
  return await post(modifyShopUrl, data);
}

type DetailTypeReq = {
  role_id?: string;
};
export async function getDetail(data: DetailTypeReq = {}) {
  return await post(getDetailUrl, data);
}

export async function getShopList() {
  return await post(getShopListUrl);
}
// 上下架
type groundingType = {
  active: 1 | 2; // 1上架 2下架
  type: 1 | 2; // 1 物品 2 宠物
  in_x: number;
  s?: number;
  price?: number;
};
export async function grounding(data: groundingType) {
  return await post(groundingUrl, data);
}

// 购买
type purchaseType = {
  type: 1 | 2; // 1 物品 2 宠物
  in_x: number;
  s: number;
  role_id: string;
};
export async function purchase(data: purchaseType) {
  return await post(purchaseUrl, data);
}
