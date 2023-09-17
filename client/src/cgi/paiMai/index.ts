import { post } from "@request";
const getListUrl = "/paimai/getList";
const groundingUrl = "/paimai/groundingActive";
const auctionUrl = "/paimai/auction";
/**
 * 获取拍卖信息
 */
export function getList() {
  return post(getListUrl);
}
/**
 * 上架拍卖品
 * @param {*} req
 * @param {*} rse
 * @param {*} req.in_x 上架物品下标
 * @param {*} req.price 上架物品价格
 */
export function grounding(data: { in_x: number; price: number }) {
  return post(groundingUrl, data);
}
/**
 * 竞价
 * @param {*} req
 * @param {*} rse
 * @param {*} req.id_p 唯一标识
 * @param {*} req.price 竞拍价格
 */
export function auction(data: { id_p: string; price: number }) {
  return post(auctionUrl, data);
}
