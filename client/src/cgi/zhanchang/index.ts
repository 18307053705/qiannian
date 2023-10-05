import { post } from "@request";
const rankUrl = '/zhanchang/rank';
const prizeUrl = '/zhanchang/prize';


// 战场排名
export function rank() {
  return post(rankUrl);
}

// 战场奖励领取
export function prize() {
    return post(prizeUrl);
  }
  