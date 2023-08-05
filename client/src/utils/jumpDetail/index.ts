type paramType = {
  p: number;
  form: number;
  pos?: string;
  in_x?: number;
};

/**
 * 跳转到详情页
 * @param history 路由
 * @param param.p 物品类型,p3跳转装备详情,其余物品详情
 * @param param.form 物品所在:1背包,2身上,3仓库,4店铺,5商城,6宠物
 * @param param.pos 装备部位,装备专属字段，指佩戴的位置，可选参数
 * @param param.in_x 所在背包,仓库,店铺等下标,可选参数
 */
export function jumpDetail(history, { p, form, pos, in_x }:paramType) {
  if (p === 3) {
    history.push("/equipDetail", { form, in_x, pos });
  } else {
    history.push("/articleDetail", { form, in_x, pos });
  }
}
