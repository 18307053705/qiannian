const { getCopyFreak } = require('./copy');
const { getDifferenceFreak } = require('./difference');
const { getNeutralityFreak } = require('./neutrality');
const { getPeopleFreak } = require('./people');
const { getGoblinFreak } = require('./goblin');
const { getImmortalFreak } = require('./immortal');
const { TEST_FREAK } = require('./test');
// 怪物模型
const DOME_FREAK = {
    id: 1,
    name: "怪物名称",
    level: 1, // 等级
    tag: 1, // 默认1,怪物标签(1:普通地图怪,2:副本任务怪)
    attrType: 1, // 默认1，属性类型(1:攻击,2:防御,3:敏捷),
    attr: 1, // 默认1，属性增幅
    grade: 1, // 默认1，怪物品阶(1:普通,2:精英,3:boss)
    pet: true, // 默认false，是否可捕获
    rank: true, // 默认false，是否可组队
    creatNum: 4, // 默认4，最大生成数量
    num: -1, // 默认：无限，可击杀次数
    exp: 10000, // 默认随等级，经验
    tael: 10000, // 默认随等级，银两
    article: '1-20,2-20,3', // 默认无，掉落物品信息(id-s-rate)多个物品使用,分隔 id：物品ID,s:数量,rate:概率
    equip: '1-50,2-50,3-50,4-50,5-50', // 默认无，掉落装备信息(id-s-rate)多个物品使用,分隔 id：装备ID,rate:概率
}


const freakMap = {
    299000: {
        id: 299000,
        name: "深渊怪(深渊模怪物占位)",
        type: 2,
    },
    //  以下为测试怪物
    ...TEST_FREAK,
}



module.exports = {
    /**
     * 获取怪物信息
     * @param {*} 怪物ID
     */
    getFreak: function (freakId) {
        const eleType = (freakId + "").slice(0, 3);
        let freak = undefined;
        switch (eleType) {
            case '200':
                freak = getPeopleFreak(freakId);
                break;
            case '201':
                freak = getImmortalFreak(freakId);
                break;
            case '202':
                freak = getGoblinFreak(freakId);
                break;
            case '205':
                freak = getCopyFreak(freakId);
                break;
            case '206':
                freak = getDifferenceFreak(freakId);
                break;
            case '204':
                freak = getNeutralityFreak(freakId);
                break;
            default:
                freak = freakMap[freakId] ? JSON.parse(JSON.stringify(freakMap[freakId])) : undefined;
        }

        if (!freak) {
            console.log('未找到对应freak:::', freakId);
            return undefined;
        }

        const { tag = 1, attrType = 1, attr = 1, grade = 1, num = -1, ...rest } = freak;
        return {
            ...rest,
            tag,
            attrType,
            attr,
            grade,
            num,
            type: 2
        }
    }
}
