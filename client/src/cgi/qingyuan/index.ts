import { post } from "@request";
const attachedUrl = "/qingyuan/attached";
const getMarriageUrl = "/qingyuan/getMarriage";
const finishUrl = "/qingyuan/finish";
const treeManageUrl = "/qingyuan/treeManage";

/**
 * 缔结姻缘
 *  @param {*} req.role_id
 *  @param {*} req.type (0:申请,1:同意,2:拒绝)
 */
export function attached(data) {
  return post(attachedUrl, data);
}
/**
 * 结缘信息
 * @returns qingYuan:情缘信息
 * @returns role:申请信息
 * @returns player:可结缘列表
 */
export function getMarriage() {
  return post(getMarriageUrl);
}
/**
 * 解除结缘
 */
export function finish() {
  return post(finishUrl);
}

/**
 * 树打理
 * @param type 1:浇水,2:除草
 */
export function treeManage(data) {
  return post(treeManageUrl,data);
}
