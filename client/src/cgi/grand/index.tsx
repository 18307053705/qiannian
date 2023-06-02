import { post } from "@request";
const moveDirUrl = `/dir/sendDir`;

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
