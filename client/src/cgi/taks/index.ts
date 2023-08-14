import { post } from "@request";
const getTaskListUrl = "/task/getTaskList";
const getTaskInfoUrl = "/task/getTaskInfo";

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
export function getTaskList(data = { type: "main" }) {
  return post(getTaskListUrl, data);
}
/**
 * 获取任务信息
 * @param {*} req.type 任务类型 mian:主线,exp:每日经验,tael:每日金钱,world:每日声望
 */
export function getTaskInfo(data = { type: "main" }) {
  return post(getTaskInfoUrl, data);
}

const getTaskDetailUrl = `/task/getTaskDetail`;
const doneTaskUrl = `/task/doneTask`;
const getTaskStoryUrl = `/task/getTaskStory`;
const tpTaskUrl = `/task/taskNpc`;

// 获取任务详情
export function getTaskDetail(data = { type: "main" }) {
  return post(getTaskDetailUrl, data);
}

// 完成任务
export function doneTask(data: { type: TaskType; in_x: number }) {
  return post(doneTaskUrl, data);
}

// 获取任务剧情
export function getTaskStory() {
  return post(getTaskStoryUrl);
}

// 接受任务
export function tpTask(data: { address: string }) {
  return post(tpTaskUrl, data);
}
