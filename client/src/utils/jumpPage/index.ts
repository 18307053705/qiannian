/**
 * 跳转到详情页
 * @param history 路由
 * @param param.p 物品类型,p3跳转装备详情,其余物品详情
 * @param param.form 物品所在:1背包,2身上,3仓库,4店铺,5商城,6宠物
 * @param param.pos 装备部位,装备专属字段，指佩戴的位置，可选参数
 * @param param.in_x 所在背包,仓库,店铺等下标,可选参数
 * @param param.role_id 其他人
 * @param param.petId 其他人
 */
export function jumpDetail(
  history,
  { p, form, pos, in_x, role_id, petId }: any
) {
  if (p === 3) {
    history.push("/equipDetail", { form, in_x, pos, role_id, petId });
  } else {
    history.push("/articleDetail", { form, in_x, pos, role_id, petId });
  }
}

/**
 * 跳转到装备列表页
 * @param param.posInx 装备部位:1-12
 * @param param.form 跳转来源:1人物,2宠物
 */
export function jumpEquipList({ posInx, form, petId }: any) {
  window.QN.history.push("/equipList", { form, posInx, petId });
}

/**
 * 跳转到装备打造也
 * @param param.pageKey 打造类型(world,gang,marriage,exploit)
 * @param param.level 人物等级
 */
export function jumpMakeEquip(
  pageKey: "world" | "gang" | "marriage" | "exploit" | 'faBao',
  level
) {
  window.QN.history.push("/equipMake", { pageKey, level });
}
