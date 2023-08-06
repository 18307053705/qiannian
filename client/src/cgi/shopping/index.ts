import { post } from "@request";
const getShopListUrl = "/shopping/list";
const getDetailUrl = "/shopping/detail";
const createShopUrl = "/shopping/create";
const modifyShopUrl = "/shopping/modify";
const groundingUrl = "/shopping/grounding";
const purchaseUrl = "/shopping/purchase";

export function createShop(data: { name: string }) {
  return post(createShopUrl, data);
}

export function modifyShop(data: { name: string }) {
  return post(modifyShopUrl, data);
}

type DetailTypeReq = {
  role_id?: string;
};
export function getDetail(data: DetailTypeReq = {}) {
  return post(getDetailUrl, data);
}

export function getShopList() {
  return post(getShopListUrl);
}
/**
 * 物品上下架
 * @param {*} req.active (1:上架,2:下架)
 * @param {*} req.type (1:物品,2:宠物)
 * @param {*} req.price 价格
 * @param {*} req.unit 单位(tael,yuanbao)
 * @param {*} req.s  上架数量
 * @param {*} req.in_x  物品所在下标(下架,则代表物品所在货架下标)
 * @param {*} req.petId  宠物id
 */
export function grounding(data) {
  return post(groundingUrl, data);
}

/**
 * 购买物品
 * @param {*} req.role_id 店铺玩家id
 * @param {*} req.type (1:物品,2:宠物)
 * @param {*} req.s 数量
 * @param {*} req.in_x  物品所在货架下标
 * @param {*} req.petId  宠物id
 */
export function purchase(data) {
  return post(purchaseUrl, data);
}
