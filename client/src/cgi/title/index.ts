import { post } from "@request";
const getTitleListUrl = '/title/getTitleList';
const wearTitleUrl = '/title/wearTitle';


// 获取称号信息
export function getTitleList() {
    return post(getTitleListUrl);
}

// 称号佩戴-卸下
export function wearTitle(data?: { id: number }) {
    return post(wearTitleUrl, data);
}
