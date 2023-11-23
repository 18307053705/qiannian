
/**
* 判断物品是否为装备
*/
export function isEquip(id) {
    return (id + "").slice(0, 2) === '13'
}

/**
* 判断物品是否为恢复丹药
*/
export function isReply(id) {
    const type = (id + "").slice(0, 2);
    return type === '10';
}

/**
* 判断物品是否为buff丹药
*/
export function isBuff(id) {
    const type = (id + "").slice(0, 2);
    return type === '11';
}

/**
* 判断物品是否为丹药
*/
export function isDanYao(id) {
    const type = (id + "").slice(0, 2);
    return type === '10' || type === '11';
}

/**
* 判断物品是否为卷轴
*/
export function isReel(id) {
    const type = (id + "").slice(0, 2);
    return type === '12' || type === '18';
}

/**
* 判断物品是否为材料
*/
export function isMaterial(id) {
    const type = (id + "").slice(0, 2);
    return type === '14' || type === '20';
}

/**
* 判断物品是否为任务物品
*/
export function isTask(id) {
    const type = (id + "").slice(0, 2);
    return type === '19';
}

/**
* 判断物品是否为杂物
*/
export function isSundries(id) {
    const type = (id + "").slice(0, 2);
    return type === '17' || type === '16' || type === '15';
}

