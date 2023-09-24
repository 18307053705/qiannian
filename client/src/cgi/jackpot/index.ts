import { post } from "@request";
const lingShouShanUrl = "/jackpot/lingShouShan";
const equipDrawUrl = "/jackpot/equipDraw";
const jackpotLevelUrl = "/jackpot/jackpotLevel";
const jackpotArtUrl = "/jackpot/jackpotArt";

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

/**
 * 玩家等级抽奖
 */
export function jackpotLevel() {
  return post(jackpotLevelUrl);
}

/**
 * 技能抽奖
 * @param type 1:世界声望 2:帮会声望 3:结义声望 4:元宝
 */
export function jackpotArt(data: { type: number }) {
  return post(jackpotArtUrl, data);
}
