import { post } from "@request";
const getShopListUrl = "/shopping/list";
const getDetailUrl = "/shopping/detail";
const createShopUrl = "/shopping/create";


export async function createShop(data: { name: string }) {
  return await post(createShopUrl, data);
}

type DetailTypeReq = {
  role_id?: string;
};
export async function getDetail(data: DetailTypeReq = {}) {
  return await post(getDetailUrl, data);
}


export async function getShopList() {
  return await post(getShopListUrl);
}
