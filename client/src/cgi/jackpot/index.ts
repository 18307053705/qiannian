import { post } from "@request";
const lingShouShanUrl = "/jackpot/lingShouShan";
/**
 * 灵兽山砸宠
 */
export function lingShouShan() {
  return post(lingShouShanUrl);
}
