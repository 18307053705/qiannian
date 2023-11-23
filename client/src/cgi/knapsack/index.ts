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
  form: 1 | 2 | 3 | 4 | 5 | 6; // 背包 身上 仓库 店铺 商城 宠物
  pos?: string; // 装备部位
  t_roleId?: string; // 其他角色
  petId?: string; // 其他角色
  id?: string; // 物品id
  uid?: string // 物品uid
};


/**
 * 获取物品详情
 * @param form 物品所在1:背包,2:身上,3,:仓库4:店铺,5:商城,6:宠物，7积分商店
 * @param uid 所在下标(背包,仓库,店铺)
 * @param pos 装备部位(身上,宠物)
 * @param id 物品id
 * @param role_id 角色id
 * @param petId 宠物id
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
