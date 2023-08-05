import { post } from "@request";
const getEquipListUrl = "/equip/getEquipList";
const unloadEquiptUrl = "/equip/unloadEquip";
const renameEquiptUrl = "/equip/renameEquip";
const firmeEquiptUrl = "/equip/firmeEquip";
const forgeEquipUrl = "/equip/forgeEquip";
const sigilEquipUrl = "/equip/sigilEquip";

const renameUrl = "/equip/rename";
const firmUrl = "/equip/firm";
const forgeUrl = "/equip/forge";
const activeUrl = "/equip/active";
const sigilUrl = "/equip/sigil";

//获取装备列表
export function getEquipList() {
  return post(getEquipListUrl);
}

// 卸载装备
export function unloadEquipt(data: { pos: string }) {
  return post(unloadEquiptUrl, data);
}

// 装备重命名
export function renameEquip(data: { pos: string; name: string }) {
  return post(renameEquiptUrl, data);
}

/**
 * 装备强化
 * @param req.materialtype 材料类型(1:强化卡,2:月光石,3:强化石,4:经验)
 * @param req.in_x 装备在背包内的下标
 */
export function firmeEquip(data) {
  return post(firmeEquiptUrl, data);
}

/**
 * 装备锻造
 * @param req.materialtype 材料类型(1:石头,2:元宝)
 * @param req.in_x 装备在背包内的下标
 */
export function forgeEquip(data) {
  return post(forgeEquipUrl, data);
}
/**
 * 装备附魔
 * @param req.in_x 装备在背包内的下标
 */
export function sigilEquip(data) {
  return post(sigilEquipUrl, data);
}

// type EquipReq = {
//   id: string;
//   in_x: number;
// };
// // 改名
// export function renameFn(data: EquipReq) {
//   return post(renameUrl, data);
// }

// type materialtype = {
//   materialtype: 1 | 2 | 3 | 4; // 强化卡 月光石 强化石 经验
// };
// // 强化
// export function firmFn(data: EquipReq & materialtype) {
//   return post(firmUrl, data);
// }
// type materialIdtype = {
//   materialtype: 1 | 2; // 石头 元宝
// };
// // 锻造
// export function forgeFn(data: EquipReq & materialIdtype) {
//   return post(forgeUrl, data);
// }

// // 附魔
// export function sigilFn(data: EquipReq) {
//   return post(sigilUrl, data);
// }
// // 卸下
// export function unsnatchFn(data: EquipReq) {
//   return post(activeUrl, data);
// }
