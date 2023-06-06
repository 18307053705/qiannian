import { post } from "@request";
const getKnapsackUrl = "/knapsack/getKnapsack";
const operateUrl = "/knapsack/operate";

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

export const initKnapsack: KnapsackType = {
  tael: "0",
  yuanbao: "0",
  list: []
};

//获取背包信息
export async function getKnapsack(): Promise<{ data: KnapsackType }> {
  return await post(getKnapsackUrl);
}

type operateType = {
  p: number; // 物品类型
  id: number; // 物品id
  s: number; // 物品数量
  in_x: number; // 物品下标
  type: number; // 操作类型 1使用，2出库，3入库，4出售,5购买{考虑是否实现}
};

// 使用物品
export async function operate(data: operateType) {
  return await post(operateUrl, data);
}
