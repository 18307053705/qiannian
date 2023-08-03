import { post } from "@request";

const playerApplyUrl = "/player/playerApply";
const playerApplyActiveUrl = "/player/playerApplyActive";
const playerDeleteUrl = "/player/playerDelete";

// 好友申请
export const playerApply = data => {
  return post(playerApplyUrl, data);
};

// 好友申请处理
export const playerApplyActive = (data: { state: 0 | 1; role_id: string }) => {
  return post(playerApplyActiveUrl, data);
};

// 好友删除
export const playerDelete = (data: { role_id: string }) => {
  return post(playerDeleteUrl, data);
};
