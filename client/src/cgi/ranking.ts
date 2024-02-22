import { post } from "@request";
const getRankListUrl = '/ranking/getRankList';


// 获取排名信息
export function getRankList(data: { type: number, page: number }) {
    return post(getRankListUrl, data);
}

