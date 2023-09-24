import { post } from "@request";
const lingShouShanUrl = "/jackpot/lingShouShan";
const equipDrawUrl = "/jackpot/equipDraw";
/**
 * 灵兽山砸宠
 */
export function lingShouShan() {
  return post(lingShouShanUrl);
}

/**
 * 神装宝箱
 */
export function equipDraw() {
  return post(equipDrawUrl);
}
