import { post } from "@request";
const getKnapsackUrl = "/knapsack/getKnapsack";
const operateUrl = "/knapsack/operate";
const equipListUrl = "/knapsack/equipList";
const getArticleDetailUrl = "/knapsack/getArticleDetail";

type KnapsackType = {
  list: {
    id: number;
    name: string;
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
  form: 1 | 2 | 3 | 4 | 5 | 6; // 背包 身上 仓库 店铺 商城 宠物
  pos?: string; // 装备部位
  t_roleId?: string; // 其他角色
  petId?: string; // 其他角色
  id?: string; // 物品id
};

/**
 * 物品详情
 * @param data.in_x 背包 仓库 店铺 商城 所在下标
 * @param data.form 1:背包2:身上3:仓库4:店铺5:商城6:宠物
 * @param data.pos 可选,装备部位
 * @param data.t_roleId 可选,其他角色
 * @param data.petId 可选,宠物id
 * @param data.id 可选,物品id
 */
export function getArticleDetail(data: DetailType) {
  return post(getArticleDetailUrl, data);
}

/**
 * 使用物品
 * @param data.s 物品数量
 * @param data.in_x 物品下标
 * @param data.type 操作类型 1:使用物品,2:入库,3:出库,4:丢弃
 * @param data.posKey 可选
 */
export function operate(data) {
  return post(operateUrl, data);
}
