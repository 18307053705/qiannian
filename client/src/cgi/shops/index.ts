import { post } from "@request";
const getShopListUrl = "/shops/getList";
const purchaseUrl = "/shops/purchase";
// const detailUrl = "/shops/detail"; // 物品详情

export async function getList() {
  return await post(getShopListUrl);
}

export async function purchase(data: { id: number; s: number }) {
  return await post(purchaseUrl, data);
}

// type DeatilTypeReq = {
//   in_x: number; // 背包 仓库 店铺 商城 所在下标
//   pos: string; // 装备部位
//   form: 1 | 2 | 3 | 4 | 5 | 6; // 背包 身上 仓库 店铺 商城 宠物
//   t_roleId?: string; // 其他角色
// };

// export async function getDetail(data: DeatilTypeReq) {
//   return await post(detailUrl, data);
// }
