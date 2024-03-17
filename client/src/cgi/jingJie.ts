import { post } from "@request";
const distributionPotentialUrl = '/jingjie/distributionPotential';
const getJingJieUrl = '/jingjie/getJingJie';
const resetPotentialUrl = '/jingjie/resetPotential';
const advancedUrl = '/jingjie/advanced';
const getTianJieUrl = '/jingjie/getTianJie';
const tianJieFightUrl = '/jingjie/tianJieFight';


// 分配潜力
export function distributionPotentia(data: { ti_zhi?: number, geng_gu?: number, bi_li?: number, nai_li?: number, shen_fa?: number }) {
    return post(distributionPotentialUrl, data);
}

// 重置潜力
export function resetPotential() {
    return post(resetPotentialUrl);
}

// 获取境界
export function getJingJie() {
    return post(getJingJieUrl);
}

// 突破境界
export function advanced() {
    return post(advancedUrl);
}
// 获取天劫信息
export function getTianJie() {
    return post(getTianJieUrl);
}
// 天劫战斗
export function tianJieFight() {
    return post(tianJieFightUrl);
}