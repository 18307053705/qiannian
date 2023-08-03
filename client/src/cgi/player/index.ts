import { post } from "@request";

const creatPlayerFightUrl = "/player/creatPlayerFight";
const playerFightDirUrl = "/player/playerFightDir";
const exitFightUrl = "/player/exitFight";

// 玩家战斗
export const creatPlayerFight = () => {
  return post(creatPlayerFightUrl);
};

// 玩家战斗指令
export const playerFightDir = (data) => {
  return post(playerFightDirUrl,data);
};

// 退出战斗
export const exitFight = (data) => {
  return post(exitFightUrl,data);
};
