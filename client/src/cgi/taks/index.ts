import { post } from "@request";
const getTaskListUrl = `/task/getTaskList`;
const getTaskDetailUrl = `/task/getTaskDetail`;
const doneTaskUrl = `/task/doneTask`;

// 获取任务列表
export async function getTaskList() {
  return await post(getTaskListUrl);
}

export type TaskType =
  | "main"
  | "branch"
  | "exp"
  | "world"
  | "exploit"
  | "chance";

// 获取任务详情
export async function getTaskDetail(
  data: { type: TaskType } = { type: "main" }
) {
  return await post(getTaskDetailUrl, data);
}

// 完成任务
export async function doneTask(data: { type: TaskType; in_x: number }) {
  return await post(doneTaskUrl, data);
}
