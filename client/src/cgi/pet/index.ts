import { post } from "@request";

const drawPetUrl = "/pet/drawPet";
const detailPetUrl = "/pet/detailPet";
const petRoomUrl = "/pet/petRoom";
const petWearEquipUrl = "/pet/petWearEquip";
const petUnloadEquipUrl = "/pet/petUnloadEquip";

/**
 * 灵兽山砸宠
 */
export function drawPet() {
  return post(drawPetUrl);
}

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
export function petWearEquip() {
  return post(petWearEquipUrl);
}

/**
 * 宠物卸下装备
 * @param {*} posKey 装备部位
 * @param petId 宠物id
 */
export function petUnloadEquip() {
  return post(petUnloadEquipUrl);
}

const addPetUrl = "/pet/add";
const getDetailUrl = "/pet/detail";
const chengUrl = "/pet/cheng";
const studyArtUrl = "/pet/studyArt";
const equipActiveUrl = "/pet/equip";
const addFlairUrl = "/pet/flair";
const rebornUrl = "/pet/reborn";

// 添加宠物
export async function addPet() {
  return await post(addPetUrl);
}

export async function getDetail(data: { id: number }) {
  return await post(getDetailUrl, data);
}

export async function cheng(data: { id: number; state: 0 | 1 | 2 | 3 }) {
  return await post(chengUrl, data);
}

export async function studyArt(data: { id: number; in_x: number }) {
  return await post(studyArtUrl, data);
}

export async function equipActive(data: {
  in_x: number;
  type: 1 | 2;
  posKey?: number;
}) {
  return await post(equipActiveUrl, data);
}

export async function addFlair() {
  return await post(addFlairUrl);
}

export async function reborn() {
  return await post(rebornUrl);
}
