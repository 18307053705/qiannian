import { post } from "@request";
const exchangeUrl = "/yinHang/exchange";

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
