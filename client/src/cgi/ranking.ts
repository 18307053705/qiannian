import { post } from "@request";
const getRankListUrl = '/ranking/getRankList';
const getRankRewardUrl = '/ranking/getRankReward';


// 获取排名信息
export function getRankList(data: { type: number, page: number }) {
    return post(getRankListUrl, data);
}

// 获取排名奖励
export function getRankReward(data: { type: number }) {
    return post(getRankRewardUrl, data);
}
