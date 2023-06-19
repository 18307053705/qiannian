import { post } from "@request";
const friendsListUrl = `/friends/list`;
const friendsApplyUrl = `/friends/apply`;
const friendsActiveUrl = `/friends/active`;

export const getFriendsList = async () => {
  return await post(friendsListUrl);
};

export const friendsApply = async (data: { role_id: string }) => {
  return await post(friendsApplyUrl, data);
};

export const friendsActive = async (data: {
  role_id: string;
  state?: number;
}) => {
  return await post(friendsActiveUrl, data);
};
