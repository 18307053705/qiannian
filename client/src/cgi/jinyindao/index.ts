import { post } from "@request";
const getRankInfoUrl = '/jinyindao/getRankInfo';
const getRankRewardUrl = '/jinyindao/getRankReward';


// 获取排名信息
export function getRankInfo() {
    return post(getRankInfoUrl);
}

// 获取排名奖励
export function getRankReward() {
    return post(getRankRewardUrl);
}
