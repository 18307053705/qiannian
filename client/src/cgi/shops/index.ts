import { post } from "@request";
const getShopListUrl = "/shops/getList";
const purchaseUrl = "/shops/purchase";
const shopIntegralUrl = "/shops/shopIntegral";
const getIntegralListUrl = "/shops/getIntegralList";
/**
 * 商城物品列表
 */
export async function getList() {
  return await post(getShopListUrl);
}
/**
 * 购买商城物品
 * @param {*} req
 * @param {*} res
 * @param {*} req.id 物品id
 * @param {*} req.s 物品数量
 */
export async function purchase(data: { id: number; s: number }) {
  return await post(purchaseUrl, data);
}
/**
 * 获取神装兑换物品列表
 */
export async function getIntegralList() {
  return await post(getIntegralListUrl);
}
/**
 * 兑换神装物品
 * @param {*} req
 * @param {*} res
 * @param {*} req.id 物品id
 * @param {*} req.p 物品类型
 */
export async function shopIntegral(data: { id: number; p: number }) {
  return await post(shopIntegralUrl, data);
}
