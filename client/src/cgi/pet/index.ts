import { post } from "@request";
const detailPetUrl = "/pet/detailPet";
const petRoomUrl = "/pet/petRoom";
const petWearEquipUrl = "/pet/petWearEquip";
const petUnloadEquipUrl = "/pet/petUnloadEquip";
const renameEquipUrl = "/pet/renameEquip";
const petStatuUrl = "/pet/petStatu";
const petRebornUrl = "/pet/petReborn";
const petFlairUrl = "/pet/petFlair";
const petStudyArtUrl = "/pet/petStudyArt";

/**
 * 宠物详情
 * @param {*} req.petId
 */
export function detailPet(data) {
  return post(detailPetUrl, data);
}

/**
 * 宠物房扩张
 */
export function petRoom() {
  return post(petRoomUrl);
}

/**
 * 宠物佩戴装备
 * @param {*} posKey 装备部位
 * @param in_x 背包所在下标(背包,仓库,店铺)
 * @param petId 宠物id
 */
export function petWearEquip(data) {
  return post(petWearEquipUrl, data);
}

/**
 * 宠物卸下装备
 * @param {*} posKey 装备部位
 * @param petId 宠物id
 */
export function petUnloadEquip(data) {
  return post(petUnloadEquipUrl, data);
}

/**
 * 宠物装备改名
 * @param {*} pos 装备部位
 * @param name 名称
 * @param petId 宠物id
 */
export function petRenameEquip(data) {
  return post(renameEquipUrl, data);
}

/**
 * 切换宠物状态
 * @param {*} req.state 状态(0:休息,1:出战,2:附体,3:挂售)
 * @param {*} req.petId
 */
export function petStatu(data) {
  return post(petStatuUrl, data);
}
/**
 * 宠物转生
 */
export function petReborn() {
  return post(petRebornUrl);
}
/**
 * 宠物资质提升
 */
export function petFlair() {
  return post(petFlairUrl);
}

/**
 * 宠物学习技能
 *@param {*} req.artId 技能id
 */
export function petStudyArt(data) {
  return post(petStudyArtUrl, data);
}
