import { post } from "@request";
const renameUrl = "/equip/rename";
const firmUrl = "/equip/firm";
const forgeUrl = "/equip/forge";
const activeUrl = "/equip/active";
const sigilUrl = "/equip/sigil";

type EquipReq = {
  id: string;
  in_x: number;
};
// 改名
export async function renameFn(data: EquipReq & { kanapsackType: 1 | 2 }) {
  return await post(renameUrl, data);
}

type materialtype = {
  materialtype: 1 | 2 | 3 | 4; // 强化卡 月光石 强化石 经验
};
// 强化
export async function firmFn(data: EquipReq & materialtype) {
  return await post(firmUrl, data);
}
type materialIdtype = {
  materialtype: 1 | 2; // 石头 元宝
};
// 锻造
export async function forgeFn(data: EquipReq & materialIdtype) {
  return await post(forgeUrl, data);
}

// 附魔
export async function sigilFn(data: EquipReq) {
  return await post(sigilUrl, data);
}
// 卸下
export async function activeFn(data: EquipReq & { active: 1 | 2 }) {
  return await post(activeUrl, data);
}
