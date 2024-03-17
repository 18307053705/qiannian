import { post } from "@request";
const getCopyTaskListUrl = '/xuanshanbang/getCopyTaskList';
const receiveTaskUrl = '/xuanshanbang/receiveTask';
const getTaskInfoUrl = '/xuanshanbang/getTaskInfo';


// 获取副本列表
export function getCopyTaskList() {
    return post(getCopyTaskListUrl);
}

// 领取副本
export function receiveTask(data: { type: 1 | 2, id: number }) {
    return post(receiveTaskUrl, data);
}

// 获取任务信息  
export function getTaskInfo(data: { id: number }) {
    return post(getTaskInfoUrl, data);
}