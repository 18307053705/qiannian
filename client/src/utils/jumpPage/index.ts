
interface JumpDetailRParams {
  form: number,
  pos?: string,
  role_id?: string,
  petId?: string,
  id?: string,
  uid?: string,
  isEquip?: boolean,
}

/**
 * 跳转到详情页
 * @param param.form 物品所在:1背包,2身上,3仓库,4店铺,5商城,6宠物
 * @param param.pos 装备部位,装备专属字段，指佩戴的位置，可选参数
 * @param param.id 物品id
 * @param param.uid 物品uid
 * @param param.role_id 其他人
 * @param param.petId 其他人
 */
export function jumpDetail({ form, pos, role_id, petId, id, isEquip, uid }: JumpDetailRParams) {
  if (isEquip) {
    window.QN.history.push("/equipDetail", { form, pos, role_id, petId, id, uid });
  } else {
    window.QN.history.push("/articleDetail", { form, pos, role_id, petId, id, uid });
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
  pageKey: "world" | "gang" | "marriage" | "exploit" | "faBao",
  level?: number
) {
  window.QN.history.push("/equipMake", { pageKey, level });
}

/**
 * 跳转到套装详情
 * @param param.id 套装ID
 */
export function jumpSuitDetail(id) {
  window.QN.history.push("/suitDetail", { id });
}
