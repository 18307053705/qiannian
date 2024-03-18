import { post } from "@request";
const gatherUrl = "/synthesis/gather";
const getHandbookUrl = "/synthesis/getHandbook";
const manufactureUrl = "/synthesis/manufacture";
const manufactureOtherUrl = "/synthesis/manufactureOther";
const getHandbookOtherUrl = "/synthesis/getHandbookOther";


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

// 获取强化卡，魔符，技能书合成图鉴
export function getHandbookOther() {
    return post(getHandbookOtherUrl);
}

// 合成 强化卡，魔符，技能书
export function manufactureOther(data: { uid: number, s: number }) {
    return post(manufactureOtherUrl, data);
}
