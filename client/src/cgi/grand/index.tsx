import { post } from "@request";
const moveDirUrl = '/grand/sendDir';
const tpDirUrl = '/grand/tpDir';
const createFightDirUrl = '/grand/createFightDir';
const pickupDirUrl = '/grand/pickupDir';

export interface getGrandRes {
  eleList: any[][];
  moveDir: {
    lable: string;
    value: string;
    dir: string;
  }[];
  players: {
    role_id: string;
    role_name: string;
    zhangChang?: boolean;
  }[];
  name: string;
  x: string;
  y: string;
  tip?: string;
  articleEle: { name: string, in_x: number }[]
}

export const initGrandInfo: getGrandRes = {
  eleList: [],
  moveDir: [],
  name: "",
  players: [],
  x: "",
  y: "",
  tip: "",
  articleEle: []
};

// 角色移动指令，并获取角色所在地图信息
export function moveDir(data = { dir: -1 }) {
  return post(moveDirUrl, data);
}

// 传送指令
export function tpDir(data: { dir: string }) {
  return post(tpDirUrl, data);
}
// 创建战斗指令
export function createFightDir(data: { role_id: string, type: 3 | 4 }) {
  return post(createFightDirUrl, data);
}
// 拾取地图物品
export function pickupDir(data: { in_x: number }) {
  return post(pickupDirUrl, data);
}
