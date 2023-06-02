import { post } from "@request";
const getKnapsackUrl = "/knapsack/getKnapsack";

type KnapsackType = {
  list: {
    id: number;
    n: string;
    p: number;
    s: number;
    ext: string;
  }[];
  tael: string;
  yuanbao: string;
};

export const initKnapsack:KnapsackType = {
  tael: "0",
  yuanbao: "0",
  list: []
};

//获取背包信息
export async function getKnapsack(): Promise<{ data: KnapsackType }> {
  return await post(getKnapsackUrl);
}
