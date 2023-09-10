import { post } from "@request";
const getTaskSceneUrl = "/rankTask/getTaskScene";
const activeUrl = "/rankTask/active";
/**
 * 任务场景信息
 */
export function getTaskScene() {
  return post(getTaskSceneUrl);
}

/**
 * 任务操作
 * @param freakId 怪物id 存在未领取奖励 不存在 领取任务
 */
export function active(data?: { freakId: number }) {
  return post(activeUrl, data);
}
