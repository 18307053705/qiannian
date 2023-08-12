import { post } from "@request";
const getEquipListUrl = "/equip/getEquipList";
const unloadEquiptUrl = "/equip/unloadEquip";
const renameEquiptUrl = "/equip/renameEquip";
const firmeEquiptUrl = "/equip/firmeEquip";
const forgeEquipUrl = "/equip/forgeEquip";
const sigilEquipUrl = "/equip/sigilEquip";
const getGemListUrl = "/equip/getGemList";
const mosaicEquipUrl = "/equip/mosaicEquip";
const unloadGemUrl = "/equip/unloadGem";
const makeEquipUrl = "/equip/makeEquip";
const makeEquipInfoUrl = "/equip/makeEquipInfo";
const decomposeEquipUrl = "/equip/decomposeEquip";
const freeForgeEquipUrl = "/equip/freeForgeEquip";

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

/**
 * 获取宝石列表
 */
export function getGemList() {
  return post(getGemListUrl);
}

/**
 * 装备镶嵌
 * @param req.material_inx 材料在背包内的下标
 * @param req.in_x 装备在背包内的下标
 */
export function mosaicEquip(data) {
  return post(mosaicEquipUrl, data);
}

/**
 * 装备宝石卸下
 * @param req.in_x 装备在背包内的下标
 */
export function unloadGem(data) {
  return post(unloadGemUrl, data);
}

/**
 * 打造装备
 * @param req.equipId 装备id
 */
export function makeEquip(data) {
  return post(makeEquipUrl, data);
}

/**
 * 打造装备
 * @param req.equipId 装备id
 */
export function makeEquipInfo(data) {
  return post(makeEquipInfoUrl, data);
}

/**
 * 分解装备
 * @param req.in_x 装备在背包内的下标
 */
export function decomposeEquip(data) {
  return post(decomposeEquipUrl, data);
}


/**
 * 免费锻造装备
 * @param req.in_x 装备在背包内的下标
 */
export function freeForgeEquip(data) {
  return post(freeForgeEquipUrl, data);
}
