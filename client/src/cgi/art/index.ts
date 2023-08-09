import { post } from "@request";
const artListUrl = "/art/list";
const artUpUrl = "/art/artUp";

// 获取技能列表
export function getArtList() {
  return  post(artListUrl);
}
// 技能升级或领悟
export function artUp(data: { id: number }) {
  return  post(artUpUrl, data);
}
