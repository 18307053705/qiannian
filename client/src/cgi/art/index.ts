import { post } from "@request";
const artListUrl = "/art/list";
const artDetailUrl = "/art/detail";
const artUpUrl = "/art/up";

// 获取技能列表
export async function getArtList() {
  return await post(artListUrl);
}

// 获取技能详情
export async function artDetail(data: { id: number }) {
  return await post(artDetailUrl, data);
}

// 技能升级或领悟
export async function artUp(data: { id: number }) {
  return await post(artUpUrl, data);
}
