import { post } from "@request";
const moveDirUrl = `/dir/sendDir`;
const tpDirUrl = `/dir/tp`;

export interface getGrandRes {
  data: any[][];
  grand: {
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
  data: [],
  grand: [],
  name: "",
  players: [],
  x: "",
  y: ""
};

// 角色移动指令，并获取角色所在地图信息
export async function moveDir(data = { dir: -1 }) {
  return await post(moveDirUrl, data);
}

// 传送指令
export async function tpDir(data: { address: string }) {
  return await post(tpDirUrl, data);
}