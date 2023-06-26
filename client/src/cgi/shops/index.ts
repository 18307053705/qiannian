import { post } from "@request";
const getShopListUrl = "/shops/getList";
const purchaseUrl = "/shops/purchase";
const detailUrl = "/shops/detail"; // 物品详情

export async function getList() {
  return await post(getShopListUrl);
}

export async function purchase(data: { id: string }) {
  return await post(purchaseUrl, data);
}

type DeatilTypeReq = {
  id: string;
  in_x: number;
  kanapsackType: 1 | 2 | 3 | 4 | 5 | 6; // 背包 身上 仓库 店铺 商城 宠物
  t_roleId?: string;
};

export async function getDetail(data: DeatilTypeReq) {
  return await post(detailUrl, data);
}
