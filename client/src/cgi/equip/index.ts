import { post } from "@request";
const getEquipListUrl = "/equip/getEquipList";
const renameUrl = "/equip/rename";
const firmUrl = "/equip/firm";
const forgeUrl = "/equip/forge";
const activeUrl = "/equip/active";
const sigilUrl = "/equip/sigil";

//获取装备列表
export function getEquipList() {
  return post(getEquipListUrl);
}

type EquipReq = {
  id: string;
  in_x: number;
};
// 改名
export function renameFn(data: EquipReq) {
  return post(renameUrl, data);
}

type materialtype = {
  materialtype: 1 | 2 | 3 | 4; // 强化卡 月光石 强化石 经验
};
// 强化
export function firmFn(data: EquipReq & materialtype) {
  return post(firmUrl, data);
}
type materialIdtype = {
  materialtype: 1 | 2; // 石头 元宝
};
// 锻造
export function forgeFn(data: EquipReq & materialIdtype) {
  return post(forgeUrl, data);
}

// 附魔
export function sigilFn(data: EquipReq) {
  return post(sigilUrl, data);
}
// 卸下
export function unsnatchFn(data: EquipReq) {
  return post(activeUrl, data);
}
