import { post } from "@request";
const getTaskListUrl = "/task/getTaskList";
const getTaskInfoUrl = "/task/getTaskInfo";
const getTaskSceneUrl = "/task/getTaskScene";
const taskSceneEndUrl = "/task/taskSceneEnd";
const doneTaskUrl = "/task/doneTask";




export type TaskType =
  | "main"
  | "branch"
  | "exp"
  | "world"
  | "exploit"
  | "chance";

/**
 * 获取任务列表
 */
export function getTaskList(data = { type: 1 }) {
  return post(getTaskListUrl, data);
}
/**
 * 获取任务信息
 * @param {*} req.type 任务类型 mian:主线,exp:每日经验,tael:每日金钱,world:每日声望
 */
export function getTaskInfo(data = { type: 1 }) {
  return post(getTaskInfoUrl, data);
}

// 获取任务场景信息
export function getTaskScene() {
  return post(getTaskSceneUrl);
}
// 任务场景操作
export function taskSceneEnd() {
  return post(taskSceneEndUrl);
}

/**
 * 完成任务
 * @param {*} req.id
 * @param {*} req.type 任务类型
 */
export function doneTask(data) {
  return post(doneTaskUrl, data);
}
