const articleMap = {
    160: {
        name: '1级房屋宝石',
        group1: 'fw-100',
        tips: '1级房屋宝石，使用后可增加100点房屋清洁。',
    },
    161: {
        name: '2级房屋宝石',
        group1: 'fw-200',
        tips: '2级房屋宝石，使用后可增加200点房屋清洁。',
    },
    162: {
        name: '3级房屋宝石',
        group1: 'fw-300',
        tips: '3级房屋宝石，使用后可增加300点房屋清洁。',
    },
    163: {
        name: '4级房屋宝石',
        group1: 'fw-500',
        tips: '4级房屋宝石，使用后可增加500点房屋清洁。',
    },
    164: {
        name: '5级房屋宝石',
        group1: 'fw-1000',
        tips: '5级房屋宝石，使用后可增加1000点房屋清洁。',
    },
    165: {
        name: '1级勋章宝石',
        group1: 'xz-100',
        tips: '1级勋章宝石，使用后可增加100点勋章荣誉。',
    },
    166: {
        name: '2级勋章宝石',
        group1: 'xz-200',
        tips: '2级勋章宝石，使用后可增加200点勋章荣誉。',
    },
    167: {
        name: '3级勋章宝石',
        group1: 'xz-300',
        tips: '3级勋章宝石，使用后可增加300点勋章荣誉。',
    },
    168: {
        name: '4级勋章宝石',
        group1: 'xz-500',
        tips: '4级勋章宝石，使用后可增加500点勋章荣誉。',
    },
    169: {
        name: '5级勋章宝石',
        group1: 'xz-1000',
        tips: '5级勋章宝石，使用后可增加1000点勋章荣誉。',
    },
    1610: {
        name: '1级令牌宝石',
        group1: 'lp-100',
        tips: '1级令牌宝石，使用后可增加100点令牌忠义。',
    },
    1611: {
        name: '2级令牌宝石',
        group1: 'lp-200',
        tips: '2级令牌宝石，使用后可增加200点令牌忠义。',
    },
    1612: {
        name: '3级令牌宝石',
        group1: 'lp-300',
        tips: '3级令牌宝石，使用后可增加300点令牌忠义。',
    },
    1613: {
        name: '4级令牌宝石',
        group1: 'lp-500',
        tips: '4级令牌宝石，使用后可增加500点令牌忠义。',
    },
    1614: {
        name: '5级令牌宝石',
        group1: 'lp-1000',
        tips: '5级令牌宝石，使用后可增加1000点令牌忠义。',
    },
    1615: {
        name: '1级徽标宝石',
        group1: 'hb-100',
        tips: '1级徽标宝石，使用后可增加100点徽标名望。',
    },
    1616: {
        name: '2级徽标宝石',
        group1: 'hb-200',
        tips: '2级徽标宝石，使用后可增加200点徽标名望。',
    },
    1617: {
        name: '3级徽标宝石',
        group1: 'hb-300',
        tips: '3级徽标宝石，使用后可增加300点徽标名望。',
    },
    1618: {
        name: '4级徽标宝石',
        group1: 'hb-400',
        tips: '4级徽标宝石，使用后可增加500点徽标名望。',
    },
    1619: {
        name: '5级徽标宝石',
        group1: 'hb-1000',
        tips: '5级徽标宝石，使用后可增加1000点徽标名望。',
    },
    1620: {
        name: '经验丹',
        price: 100,
        unit: 'yuanbao',
        group3: 'jingYanDan',
        tips: '角色等级低于30级时使用，等级直接+1，30级及以上可获得100000经验。',
    },
    1621: {
        name: '人参果',
        price: 200,
        unit: 'yuanbao',
        group3: 'renShenGuo',
        group3: {
            exp: 10000000,
            conditioname: 50
        },
        tips: '角色等级低于50级时使用，等级直接+1，50级及以上可获得10000000经验。',
    },
    1622: {
        name: '猫耳朵',
        price: 500,
        unit: 'yuanbao',
        group3: 'maoErDuo',
        group3: {
            exp: 100000000,
            conditioname: 70,
        },
        tips: '角色等级低于70级时使用，等级直接+1，70级及以上可获得100000000经验。',
    },
    1623: {
        name: '洗髓丹',
        price: 100,
        unit: 'yuanbao',
        group3: 'xiSuiDan',
        tips: '可重新分配自身的潜力。',
    },
    1624: {
        name: '40元宝卡',
        group1: 'yuanbao-40',
        value: 40,
        tips: '可在主城兑换40元宝。',
    },
    1625: {
        name: '60元宝卡',
        group1: 'yuanbao-60',
        tips: '可在主城兑换60元宝。',
    },
    1626: {
        name: '100元宝卡',
        group1: 'yuanbao-100',
        tips: '可在主城兑换100元宝。',
    },
    1627: {
        name: '200元宝卡',
        group1: 'yuanbao-200',
        tips: '可在主城兑换200元宝。',
    },
    1628: {
        name: '500元宝卡',
        group1: 'yuanbao-500',
        tips: '可在主城兑换500元宝。',
    },
    1629: {
        name: '1000元宝卡',
        group1: 'yuanbao-1000',
        tips: '可在主城兑换1000元宝。',
    },
    1630: {
        name: '1级新手大礼包',
        group3: 'gift1630',
        tips: '打开可获得10级新手大礼包与大量元宝。',
    },
    1631: {
        name: '10级新手大礼包',
        group3: 'gift1631',
        tips: '打开可获得30级新手大礼包与大量元宝。',
    },
    1632: {
        name: '30级新手大礼包',
        group3: 'gift1632',
        tips: '打开可获得30级新手大礼包与大量元宝。',
    },
    1633: {
        name: '50级新手大礼包',
        group3: 'gift1633',
        tips: '打开可获得大量元宝与材料。',
    },
    1634: {
        name: '100000银票',
        group1: 'tael-100000',
        tips: '可到主城的银行兑换成100000银两。',
    },
    1635: {
        name: '500000银票',
        group1: 'tael-500000',
        tips: '可到主城的银行兑换成500000银两。',
    },
    1636: {
        name: '1000000银票',
        group1: 'tael-1000000',
        tips: '可到主城的银行兑换成1000000银两。',
    },
}

module.exports = {
    getArticleList: function () {
        return Object.keys(articleMap).map((id) => {
            const idNum = Number(id);
            return {
                ...articleMap[id],
                id: idNum,
            }
        })
    },
    getArticle: function (id) {
        if (!articleMap[id]) {
            console.log('未找到物品：', id);
            return;
        }
        return JSON.parse(JSON.stringify({
            ...articleMap[id],
            id,
        }))
    }

}
