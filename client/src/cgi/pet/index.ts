import { post } from "@request";
const addPetUrl = "/pet/add";
const getDetailUrl = "/pet/detail";
const chengUrl = "/pet/cheng";
const studyArtUrl = "/pet/studyArt";

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
