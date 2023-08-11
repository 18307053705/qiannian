export const GRAND_URL = "/grand";
export function backGrand() {
  window.QN.history.push(GRAND_URL)
}
// 返回上页
export function goBack() {
  window.QN.history.goBack()
}