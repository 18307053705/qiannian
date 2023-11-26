import { post } from "@request";
const gatherUrl = "/synthesis/gather";
const getHandbookUrl = "/synthesis/getHandbook";
const manufactureUrl = "/synthesis/manufacture";


// 采集天材地宝
export function gather() {
    return post(gatherUrl);
}

// 获取合成图鉴
export function getHandbook() {
    return post(getHandbookUrl);
}

// 合成物品
export function manufacture(data: { uid: string }) {
    return post(manufactureUrl, data);
}
