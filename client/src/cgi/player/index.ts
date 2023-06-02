import { post } from "@request";

const playerApplyUrl = `/player/playerApply`;
const playerApplyActiveUrl = `/player/playerApplyActive`;

// 好友申请
export const playerApply = async data => {
  return await post(playerApplyUrl, data);
};

// 好友申请处理
export const playerApplyActive = async (data: {
  state: 0 | 1;
  role_id: string;
}) => {
  return await post(playerApplyActiveUrl, data);
};
