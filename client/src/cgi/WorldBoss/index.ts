import { post } from "@request";
const atkBossUrl = '/worldboss/atkBoss';
const getBossInfoUrl = '/worldboss/getBossInfo';
const getShedRewardUrl = '/worldboss/getShedReward';
const getRankRewardUrl = '/worldboss/getRankReward';

// 攻击boss
export function atkBoss() {
    return post(atkBossUrl);
}

// 获取boss信息
export function getBossInfo() {
    return post(getBossInfoUrl);
}

// 捡取boss掉落物品
export function getShedReward(data) {
    return post(getShedRewardUrl, data);
}


// 获取伤害排名奖励
export function getRankReward() {
    return post(getRankRewardUrl);
}
