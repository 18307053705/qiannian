import { post } from "@request";
const getUrl = "/chat/get";
const sendUrl = "/chat/send";
const getUnreadUrl = "/chat/getUnread";

type ChatType = 1 | 2 | 3 | 4 | 5 | 6;
/**
 * 发送信息
 * @param {*} req.type 消息类型(1:私聊,2:帮会,3:结义,4:队伍,5:世界,6:广播)
 * @param {*} req.text 消息内容
 * @param {*} req.t_role 私聊使用
 */
export function chatSet(data: {
  type: ChatType;
  text: string;
  t_role?: string;
}) {
  return post<{socializeName:string}>(sendUrl, data);
}

/**
 * 获取消息
 * @param {*} req.type 消息类型(0:系统,1:私聊,2:帮会,3:结义,4:队伍,5:世界,6:广播)
 */
export function chatGet(data: { type: ChatType }) {
  return post<{socializeName:string}>(getUrl, data);
}

/**
 * 获取未读消息
 */
export function chatGetUnread() {
  return post(getUnreadUrl);
}
