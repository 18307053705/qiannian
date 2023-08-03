import { post } from "@request";
const friendsListUrl = "/friends/list";
const friendsApplyUrl = "/friends/apply";
const friendsActiveUrl = "/friends/active";
const friendsDeleteUrl = "/friends/delete";
// 好友列表
export const getFriendsList = () => {
  return post(friendsListUrl);
};
// 好友申请
export const friendsApply = (data: { role_id: string }) => {
  return post(friendsApplyUrl, data);
};
// 好友申请处理
export const friendsActive = (data: { role_id: string; state?: number }) => {
  return post(friendsActiveUrl, data);
};

// 好友删除
export const friendsDelete = (data: { role_id: string }) => {
  return post(friendsDeleteUrl, data);
};
