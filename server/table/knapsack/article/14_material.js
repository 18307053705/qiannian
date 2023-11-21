const articleMap = {
    140: {
        name: '木材',
        value: 2,
        tips: '使用后可获得2点帮会贡献,自身增加2点帮会声望。',
    },
    141: {
        name: '石料',
        value: 4,
        tips: '使用后可获得4点帮会贡献,自身增加4点帮会声望。',
    },
    142: {
        name: '战鼓',
        value: 8,
        tips: '使用后可获得8点帮会贡献,自身增加8点帮会声望。',
    },
    143: {
        name: '锦旗',
        value: 16,
        tips: '使用后可获得16点帮会贡献,自身增加16点帮会声望。',
    },
    144: {
        name: '水晶',
        value: 30,
        tips: '使用后可获得30点帮会贡献,自身增加30点帮会声望。',
    },
    145: {
        name: '战车',
        value: 50,
        tips: '使用后可获得50点帮会贡献,自身增加50点帮会声望。',
    },
    146: {
        name: '帮会创建令',
        price: 1000,
        value: 500,
        tips: '可使用此物创建帮会,或者捐赠可获得500点帮会贡献与帮会声望。',
    },
    147: {
        name: '庄园创建令',
        price: 1000,
        value: 500,
        tips: '可使用此物创建庄园,或者捐赠可获得500点庄园贡献与结义声望。',
    },
    148: {
        name: '玉瓷百花瓶',
        value: 'fw-1000',
        tips: '摆放在房屋之中可获得1000清洁度,通过炼魂洞副本概率掉落',
    },
    149: {
        name: '檀木花纹桌',
        value: 'fw-2000',
        tips: '摆放在房屋之中可获得2000清洁度,通过炼魂洞副本概率掉落',
    },
    1410: {
        name: '红杏闹春帘',
        value: 'fw-3000',
        tips: '摆放在房屋之中可获得3000清洁度,通过炼魂洞副本概率掉落',
    },
    1411: {
        name: '日月春秋床',
        value: 'fw-5000',
        tips: '摆放在房屋之中可获得5000清洁度,通过炼魂洞副本概率掉落',
    },
    1412: {
        name: '锦绣山河画',
        value: 'fw-10000',
        tips: '摆放在房屋之中可获得10000清洁度,通过炼魂洞副本概率掉落',
    },
    1413: {
        name: '江山社稷图',
        value: 'fw-20000',
        tips: '摆放在房屋之中可获得20000清洁度,通过炼魂洞副本概率掉落',
    },
    1414: {
        name: '九州观星台',
        value: 'fw-50000',
        tips: '摆放在房屋之中可获得50000清洁度,通过炼魂洞副本概率掉落',
    },
    1415: {
        name: '玄机符',
        tips: '蕴含神秘力量的符咒，拥有逆天改命的能力。',
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