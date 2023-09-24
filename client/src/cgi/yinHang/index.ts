import { post } from "@request";
const exchangeUrl = "/yinHang/exchange";
const investUrl = "/yinHang/invest";
const receiveInvestUrl = "/yinHang/receiveInvest";

export interface loginReq {
  type: number;
  num: number;
}

/**
 * 货币兑换
 * @param {*} req.type 兑换类型 1：元宝，2：银两
 * @param {*} req.num 兑换数量
 */
export async function exchange(params: loginReq) {
  return await post(exchangeUrl, params);
}
/**
 * 送财童子-投资
 */
export async function invest() {
  return await post(investUrl);
}
/**
 * 送财童子-投资奖励
 */
export async function receiveInvest() {
  return await post(receiveInvestUrl);
}
