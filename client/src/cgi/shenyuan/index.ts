import { post } from "@request";
const getShenRankUrl = "/shenyuan/getShenRank";
const shenyuanFightUrl = "/shenyuan/shenyuanFight";
/**
 * 获取深渊信息
 */
export function getShenRank() {
  return post(getShenRankUrl);
}

/**
 * 深渊战斗
 * @param roleId 传代表提对方闯深渊
 */
export function shenyuanFight(data?: { roleId: string }) {
  return post(shenyuanFightUrl, data);
}
