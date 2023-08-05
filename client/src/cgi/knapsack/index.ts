import { post } from "@request";
const getKnapsackUrl = "/knapsack/getKnapsack";
const operateUrl = "/knapsack/operate";
const equipListUrl = "/knapsack/equipList";
const getArticleDetailUrl = "/knapsack/getArticleDetail";

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

type KnapsackReq = {
  type?: number;
};

//获取背包信息
export async function getKnapsack(
  data: KnapsackReq = {}
): Promise<{ data: KnapsackType }> {
  return await post(getKnapsackUrl, data);
}

//获取装备列表
export async function getEquipList(): Promise<{ data: any[] }> {
  return await post(equipListUrl);
}

type DetailType = {
  in_x: number; // 背包 仓库 店铺 商城 所在下标
  pos: string; // 装备部位
  form: 1 | 2 | 3 | 4 | 5 | 6; // 背包 身上 仓库 店铺 商城 宠物
  t_roleId?: string; // 其他角色
  petId?: string; // 其他角色
  id?: string; // 物品id
};

// 物品详情
export function getArticleDetail(data: DetailType) {
  return post(getArticleDetailUrl, data);
}

type operateType = {
  s: number; // 物品数量
  in_x: number; // 物品下标
  type: number; // 操作类型 1使用，2出库，3入库，4出售,5购买{考虑是否实现},
  posKey?: string; // 装备位置
};

// 使用物品
export async function operate(data: operateType) {
  return await post(operateUrl, data);
}
