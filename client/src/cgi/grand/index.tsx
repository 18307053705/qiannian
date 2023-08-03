import { post } from "@request";
const moveDirUrl = '/grand/sendDir';
const tpDirUrl = '/grand/tp';
const createFightDirUrl = '/grand/createFightDir';

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
  }[];
  name: string;
  x: string;
  y: string;
}

export const initGrandInfo: getGrandRes = {
  eleList: [],
  moveDir: [],
  name: "",
  players: [],
  x: "",
  y: ""
};

// 角色移动指令，并获取角色所在地图信息
export function moveDir(data = { dir: -1 }) {
  return post(moveDirUrl, data);
}

// 传送指令
export function tpDir(data: { address: string }) {
  return post(tpDirUrl, data);
}
// 创建战斗指令
export function createFightDir(data: { role_id: string, type: 3 | 4 }) {
  return post(createFightDirUrl, data);
}