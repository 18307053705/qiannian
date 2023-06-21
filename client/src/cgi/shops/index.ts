import { post } from "@request";
const getShopListUrl = "/shops/getList";
const purchaseUrl = "/shops/purchase";

export async function getList() {
  return await post(getShopListUrl);
}

export async function purchase(data: { id: string }) {
  return await post(purchaseUrl, data);
}
