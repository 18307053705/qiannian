// 技能类型type 1:消耗品 2:buff丹药 3:装备 4:卷轴 5:材料 6:任务 7:杂物
// group 1 直接改变某属性（例如恢复药，声望卷轴,元宝卡,银票，勋章宝石一类)
// group 2 buff类型 如双倍经验卡，临时提升属性的丹药

const articleMap = {
    140: {
        n: '40元宝卡',
        group1: 'yuanbao-40',
        value: 40,
        tips: '可在主城兑换40元宝。',
    },
    141: {
        n: '60元宝卡',
        group1: 'yuanbao-60',
        tips: '可在主城兑换60元宝。',
    },
    142: {
        n: '100元宝卡',
        group1: 'yuanbao-100',
        tips: '可在主城兑换100元宝。',
    },
    143: {
        n: '200元宝卡',
        group1: 'yuanbao-200',
        tips: '可在主城兑换200元宝。',
    },
    144: {
        n: '500元宝卡',
        group1: 'yuanbao-500',
        tips: '可在主城兑换500元宝。',
    },
    145: {
        n: '1000元宝卡',
        group1: 'yuanbao-1000',
        integral: 200,
        tips: '可在主城兑换1000元宝。',
    },
    146: {
        n: '木材',
        value: 2,
        tips: '使用后可获得2点帮会贡献,自身增加2点帮会声望。',
    },
    147: {
        n: '石料',
        value: 4,
        tips: '使用后可获得4点帮会贡献,自身增加4点帮会声望。',
    },
    148: {
        n: '战鼓',
        value: 8,
        tips: '使用后可获得8点帮会贡献,自身增加8点帮会声望。',
    },
    149: {
        n: '锦旗',
        value: 16,
        tips: '使用后可获得16点帮会贡献,自身增加16点帮会声望。',
    },
    1410: {
        n: '水晶',
        value: 30,
        tips: '使用后可获得30点帮会贡献,自身增加30点帮会声望。',
    },
    1411: {
        n: '战车',
        value: 50,
        tips: '使用后可获得50点帮会贡献,自身增加50点帮会声望。',
    },
    1412: {
        n: '帮会创建令',
        price: 1000,
        value: 500,
        tips: '可使用此物创建帮会,或者捐赠可获得500点帮会贡献与帮会声望。',
    },
    1413: {
        n: '庄园创建令',
        price: 1000,
        value: 500,
        tips: '可使用此物创建庄园,或者捐赠可获得500点庄园贡献与结义声望。',
    },
    1414: {
        n: '彩灵蛋',
        tips: '蕴含五系灵力的灵蛋，可用于兑换宠物。',
    },
    1415: {
        n: '水灵蛋',
        tips: '蕴含水系灵力的灵蛋，可用于兑换宠物。',
    },
    1416: {
        n: '火灵蛋',
        tips: '蕴含火系灵力的灵蛋，可用于兑换宠物。',
    },
    1417: {
        n: '风灵蛋',
        tips: '蕴含风系灵力的灵蛋，可用于兑换宠物。',
    },
    1418: {
        n: '雷灵蛋',
        tips: '蕴含雷系灵力的灵蛋，可用于兑换宠物。',
    },
    1419: {
        n: '冰灵蛋',
        tips: '蕴含冰系灵力的灵蛋，可用于兑换宠物。',
    },
    1420: {
        n: '一元诀',
        tips: '可使技能等级提升到1级，3个一元诀可合成1个二气诀。',
    },
    1421: {
        n: '二气诀',
        tips: '可使技能等级提升到2级，3个二气诀可合成1个三才诀。',
    },
    1422: {
        n: '三才诀',
        tips: '可使技能等级提升到3级，3个三才诀可合成1个四象诀。',
    },
    1423: {
        n: '四象诀',
        tips: '可使技能等级提升到4级，3个四象诀可合成1个五行诀。',
    },
    1424: {
        n: '五行诀',
        tips: '可使技能等级提升到5级，3个五行诀可合成1个六合诀。',
    },
    1425: {
        n: '六合诀',
        tips: '可使技能等级提升到6级，3个六合诀可合成1个七星诀。',
    },
    1426: {
        n: '七星诀',
        tips: '可使技能等级提升到7级，3个七星诀可合成1个八卦诀。',
    },
    1427: {
        n: '八卦诀',
        tips: '可使技能等级提升到8级，3个八卦诀可合成1个九宫诀。',
    },
    1428: {
        n: '九宫诀',
        tips: '可使技能等级提升到9级，3个九宫诀可合成1个十重诀。',
    },
    1429: {
        n: '十重诀',
        tips: '可使技能等级提升到10级，3个十重诀可合成1个风云诀。',
    },
    1430: {
        n: '风云诀',
        tips: '可使技能等级提升到11级，3个风云诀可合成1个逍遥诀。',
    },
    1431: {
        n: '逍遥诀',
        tips: '可使技能等级提升到12级，3个逍遥诀可合成1个天地诀。',
    },
    1432: {
        n: '天地诀',
        tips: '可使技能等级提升到13级，3个天地诀可合成1个一转技能书。',
    },
    1433: {
        n: '一转技能书',
        tips: '可使技能突破至一转0级，3个一转技能书可合成1个二转技能书。',
    },
    1434: {
        n: '二转技能书',
        tips: '可使技能突破至二转0级，3个二转技能书可合成1个三转技能书。',
    },
    1435: {
        n: '三转技能书',
        tips: '可使技能突破至三转0级，3个三转技能书可合成1个四转技能书。',
    },
    1435: {
        n: '四转技能书',
        tips: '可使技能突破至四转0级，3个四转技能书可合成1个五转技能书。',
    },
    1437: {
        n: '五转技能书',
        tips: '可使技能突破至五转0级，并使技能可突破至20级，3个五转技能书可合成1个六转技能书。',
    },
    1438: {
        n: '六转技能书',
        tips: '可使技能突破至六转0级，并使技能可突破至50级，3个六转技能书可合成1个七转技能书。',
    },
    1439: {
        n: '七转技能书',
        tips: '可使技能突破至七转0级，并使技能可突破至100级。',
    },
    1440: {
        n: '初阶技能升级书',
        tips: '13级-30级的技能使用此技能继续提升等级,五本可合成一本中阶技能升级书。',
    },
    1441: {
        n: '中阶技能升级书',
        tips: '31级-50级的技能可使用此技能继续提升等级,五本可合成一本高阶技能升级书。',
    },
    1442: {
        n: '高阶技能升级书',
        tips: '50级以上的技能可使用此技能继续提升等级。',
    },
    1443: {
        n: '1级强化卡',
        tips: '装备强化卡,可使强化等级0的装备100%强化到1级，两个1级强化卡可合成2级强化卡。',
    },
    1444: {
        n: '2级强化卡',
        tips: '装备强化卡,可使强化等级1的装备100%强化到2级，两个2级强化卡可合成3级强化卡。',
    },
    1445: {
        n: '3级强化卡',
        tips: '装备强化卡,可使强化等级2的装备100%强化到3级，两个4级强化卡可合成4级强化卡。',
    },
    1446: {
        n: '4级强化卡',
        tips: '装备强化卡,可使强化等级3的装备100%强化到4级，两个4级强化卡可合成5级强化卡。',
    },
    1447: {
        n: '5级强化卡',
        tips: '装备强化卡,可使强化等级4的装备100%强化到5级，两个5级强化卡可合成6级强化卡。',
    },
    1448: {
        n: '6级强化卡',
        tips: '装备强化卡,可使强化等级5的装备100%强化到6级，两个5级强化卡可合成6级强化卡。',
    },
    1449: {
        n: '7级强化卡',
        tips: '装备强化卡,可使强化等级6的装备100%强化到7级，两个6级强化卡可合成7级强化卡。',
    },
    1450: {
        n: '8级强化卡',
        tips: '装备强化卡,可使强化等级7的装备100%强化到8级，两个8级强化卡可合成9级强化卡。',
    },
    1451: {
        n: '9级强化卡',
        tips: '装备强化卡,可使强化等级8的装备100%强化到9级，两个9级强化卡可合成10级强化卡。',
    },
    1452: {
        n: '10级强化卡',
        tips: '装备强化卡,可使强化等级9的装备100%强化到10级，两个10级强化卡可合成11级强化卡。',
    },
    1453: {
        n: '11级强化卡',
        tips: '装备强化卡,可使强化等级10的装备100%强化到11级，两个11级强化卡可合成12级强化卡。',
    },
    1454: {
        n: '12级强化卡',
        tips: '装备强化卡,可使强化等级11的装备100%强化到12级，两个12级强化卡可合成13级强化卡。',
    },
    1455: {
        n: '13级强化卡',
        tips: '装备强化卡,可使强化等级12的装备100%强化到13级，两个13级强化卡可合成14级强化卡。',
    },
    1456: {
        n: '14级强化卡',
        tips: '装备强化卡,可使强化等级13的装备100%强化到14级，两个14级强化卡可合成15级强化卡。',
    },
    1457: {
        n: '15级强化卡',
        tips: '装备强化卡,可使强化等级14的装备100%强化到15级，两个15级强化卡可合成16级强化卡。',
    },
    1458: {
        n: '16级强化卡',
        integral: 1314,
        tips: '装备强化卡,可使强化等级15的装备100%强化到16级。',
    },
    1459: {
        n: '一阶玄石',
        tips: '蕴含强大能量的石头，可用于锻造10-35级星君,法皇，血煞职业的装备',
    },
    1460: {
        n: '二阶玄石',
        tips: '蕴含强大能量的石头，可用于锻造36-55级法皇,星君,血煞职业的装备',
    },
    1461: {
        n: '三阶玄石',
        tips: '蕴含强大能量的石头，可用于锻造56-70级法皇,星君,血煞职业的装备',
    },
    1462: {
        n: '顶阶玄石',
        tips: '蕴含强大能量的石头，可用于锻造71-80级法皇,星君,血煞职业的装备',
    },
    1463: {
        n: '一阶玉石',
        tips: '蕴含强大能量的石头，可用于锻造10-35级战尊,战神,战狂职业的装备',
    },
    1464: {
        n: '二阶玉石',
        tips: '蕴含强大能量的石头，可用于锻造36-55级战尊,战神,战狂职业的装备',
    },
    1465: {
        n: '三阶玉石',
        tips: '蕴含强大能量的石头，可用于锻造56-70级战尊,战神,战狂职业的装备',
    },
    1466: {
        n: '顶阶玉石',
        tips: '蕴含强大能量的石头，可用于锻造71-80级战尊,战神,战狂职业的装备',
    },
    1467: {
        n: '一阶云石',
        tips: '蕴含强大能量的石头，可用于锻造10-35级羽圣,剑仙,赤魅职业的装备',
    },
    1468: {
        n: '二阶云石',
        tips: '蕴含强大能量的石头，可用于锻造36-55级羽圣,剑仙,赤魅职业的装备',
    },
    1469: {
        n: '三阶云石',
        tips: '蕴含强大能量的石头，可用于锻造56-70级羽圣,剑仙,赤魅职业的装备',
    },
    1470: {
        n: '顶阶云石',
        tips: '蕴含强大能量的石头，可用于锻造71-80级羽圣,剑仙,赤魅职业的装备',
    },
    1471: {
        n: '一阶武器晶石',
        tips: '蕴含强大能量的石头，可用于打造35级套装的武器部位。',
    },
    1472: {
        n: '二阶武器晶石',
        tips: '蕴含强大能量的石头，可用于打造55级套装的武器部位。',
    },
    1473: {
        n: '三阶武器晶石',
        tips: '蕴含强大能量的石头，可用于打造70级套装的武器部位。',
    },
    1474: {
        n: '顶阶武器晶石',
        tips: '蕴含强大能量的石头，可用于打造80级套装的武器部位。',
    },
    1475: {
        n: '一阶头盔晶石',
        tips: '蕴含强大能量的石头，可用于打造35级套装的头盔部位。',
    },
    1476: {
        n: '二阶头盔晶石',
        tips: '蕴含强大能量的石头，可用于打造55级套装的头盔部位。',
    },
    1477: {
        n: '三阶头盔晶石',
        tips: '蕴含强大能量的石头，可用于打造70级套装的头盔部位。',
    },
    1478: {
        n: '顶阶头盔晶石',
        tips: '蕴含强大能量的石头，可用于打造80级套装的头盔部位。',
    },
    1479: {
        n: '一阶铠甲晶石',
        tips: '蕴含强大能量的石头，可用于打造35级套装的铠甲部位。',
    },
    1480: {
        n: '二阶铠甲晶石',
        tips: '蕴含强大能量的石头，可用于打造55级套装的铠甲部位。',
    },
    1481: {
        n: '三阶铠甲晶石',
        tips: '蕴含强大能量的石头，可用于打造70级套装的铠甲部位。',
    },
    1482: {
        n: '顶阶铠甲晶石',
        tips: '蕴含强大能量的石头，可用于打造80级套装的铠甲部位。',
    },
    1483: {
        n: '一阶腰带晶石',
        tips: '蕴含强大能量的石头，可用于打造35级套装的腰带部位。',
    },
    1484: {
        n: '二阶腰带晶石',
        tips: '蕴含强大能量的石头，可用于打造55级套装的腰带部位。',
    },
    1485: {
        n: '三阶腰带晶石',
        tips: '蕴含强大能量的石头，可用于打造70级套装的腰带部位。',
    },
    1486: {
        n: '顶阶腰带晶石',
        tips: '蕴含强大能量的石头，可用于打造80级套装的腰带部位。',
    },
    1487: {
        n: '一阶鞋子晶石',
        tips: '蕴含强大能量的石头，可用于打造35级套装的鞋子部位。',
    },
    1488: {
        n: '二阶鞋子晶石',
        tips: '蕴含强大能量的石头，可用于打造55级套装的鞋子部位。',
    },
    1489: {
        n: '三阶鞋子晶石',
        tips: '蕴含强大能量的石头，可用于打造70级套装的鞋子部位。',
    },
    1490: {
        n: '顶阶鞋子晶石',
        tips: '蕴含强大能量的石头，可用于打造80级套装的鞋子部位。',
    },
    1491: {
        n: '一阶戒指晶石',
        tips: '蕴含强大能量的石头，可用于打造35级套装的戒指部位。',
    },
    1492: {
        n: '二阶戒指晶石',
        tips: '蕴含强大能量的石头，可用于打造55级套装的戒指部位。',
    },
    1493: {
        n: '三阶戒指晶石',
        tips: '蕴含强大能量的石头，可用于打造70级套装的戒指部位。',
    },
    1494: {
        n: '顶阶戒指晶石',
        tips: '蕴含强大能量的石头，可用于打造80级套装的戒指部位。',
    },
    1495: {
        n: '一阶项链晶石',
        tips: '蕴含强大能量的石头，可用于打造35级套装的项链部位。',
    },
    1496: {
        n: '二阶项链晶石',
        tips: '蕴含强大能量的石头，可用于打造55级套装的项链部位。',
    },
    1497: {
        n: '三阶项链晶石',
        tips: '蕴含强大能量的石头，可用于打造70级套装的项链部位。',
    },
    1498: {
        n: '顶阶项链晶石',
        tips: '蕴含强大能量的石头，可用于打造80级套装的项链部位。',
    },
    1499: {
        n: '一星魔符',
        tips: '蕴含强大魔力的符文，可对装备进行附魔提升大量的属性,3个一星魔符可合成1个二星魔符。',
    },
    14100: {
        n: '二星魔符',
        tips: '蕴含强大魔力的符文，可对装备进行附魔提升大量的属性,3个二星魔符可合成1个三星魔符。',
    },
    14101: {
        n: '三星魔符',
        tips: '蕴含强大魔力的符文，可对装备进行附魔提升大量的属性,3个三星魔符可合成1个四星魔符。',
    },
    14102: {
        n: '四星魔符',
        tips: '蕴含强大魔力的符文，可对装备进行附魔提升大量的属性,3个四星魔符可合成1个五星魔符。',
    },
    14103: {
        n: '五星魔符',
        tips: '蕴含强大魔力的符文，可对装备进行附魔提升大量的属性,3个五星魔符可合成1个六星魔符。',
    },
    14104: {
        n: '六星魔符',
        tips: '蕴含强大魔力的符文，可对装备进行附魔提升大量的属性,3个一六星魔符可合1一个七星魔符。',
    },
    14105: {
        n: '七星魔符',
        tips: '蕴含强大魔力的符文，可对装备进行附魔提升大量的属性,3个七星魔符可合成1个八星魔符。',
    },
    14106: {
        n: '八星魔符',
        tips: '蕴含强大魔力的符文，可对装备进行附魔提升大量的属性,3个八星魔符可合成1个九星魔符。',
    },
    14107: {
        n: '九星魔符',
        integral: 1314,
        tips: '蕴含强大魔力的符文，可对装备进行附魔提升大量的属性。',
    },
    14108: {
        n: '强化石',
        price: 50,
        integral: 2,
        tips: '极为稀有的石头，可用于强化装备，强化等级越高成功概率越低。',
    },
    14109: {
        n: '月光石',
        integral: 20,
        tips: '极为稀有的石头，可用于提升装备强化概率。',
    },
    14110: {
        n: '宠物技能卷',
        tips: '极为稀有的卷轴，据说拥有极为神秘的力量，可为宠物觉醒技能。',
    },
    14111: {
        n: '宠物进化卷',
        tips: '极为稀有的卷轴，据说拥有极为神秘的力量，可为宠物提升资质。',
    },
    14112: {
        n: '宠物转生卷',
        tips: '极为稀有的卷轴，据说拥有极为神秘的力量，可为宠物先天资质，每个宠物最多使用三次。',
    },
    14113: {
        n: '宠物扩房卷',
        tips: '神奇的卷轴,可在宠物房中进行空间扩张。',
    },
    14114: {
        n: '宠物转化卷',
        tips: '极为稀有的卷轴，可以转化宠物的类型。',
    },
    14115: {
        n: '魔化皮',
        value: 50,
        tips: '魔化皮，蕴含了风元素的材料,可用于聚宝盆进行聚宝。',
    },
    14116: {
        n: '紫叶草',
        value: 100,
        tips: '紫叶草，蕴含了风元素的材料,可用于聚宝盆进行聚宝。',
    },
    14117: {
        n: '幽冥叶',
        value: 200,
        tips: '紫叶草，蕴含了风元素的材料,可用于聚宝盆进行聚宝。',
    },
    14118: {
        n: '壶嘴',
        value: 50,
        tips: '壶嘴，蕴含了雷元素的材料,可用于聚宝盆进行聚宝。',
    },
    14119: {
        n: '神马皮',
        value: 100,
        tips: '神马皮，蕴含了雷元素的材料,可用于聚宝盆进行聚宝。',
    },
    14120: {
        n: '紫霄雷',
        value: 200,
        tips: '紫霄雷，蕴含了雷元素的材料,可用于聚宝盆进行聚宝。',
    },
    14121: {
        n: '寒灵',
        value: 50,
        tips: '寒灵，蕴含了冰元素的材料,可用于聚宝盆进行聚宝。',
    },
    14122: {
        n: '冰凌晶',
        value: 100,
        tips: '冰凌晶，蕴含了冰元素的材料,可用于聚宝盆进行聚宝。',
    },
    14123: {
        n: '黄泉水',
        value: 200,
        tips: '黄泉水，蕴含了冰元素的材料,可用于聚宝盆进行聚宝。',
    },
    14124: {
        n: '避水皮',
        value: 50,
        tips: '避水皮，蕴含了水元素的材料,可用于聚宝盆进行聚宝。',
    },
    14125: {
        n: '蟹壳',
        value: 100,
        tips: '蟹壳，蕴含了水元素的材料,可用于聚宝盆进行聚宝。',
    },
    14126: {
        n: '无根水',
        value: 200,
        tips: '无根水，蕴含了水元素的材料,可用于聚宝盆进行聚宝。',
    },
    14127: {
        n: '赤炎',
        value: 50,
        tips: '赤炎，蕴含了火元素的材料,可用于聚宝盆进行聚宝。',
    },
    14128: {
        n: '凤羽',
        value: 100,
        tips: '凤羽，蕴含了火元素的材料,可用于聚宝盆进行聚宝。',
    },
    14129: {
        n: '地狱火',
        value: 200,
        tips: '地狱火，蕴含了火元素的材料,可用于聚宝盆进行聚宝。',
    },
    14130: {
        n: '法则之石',
        tips: '诞生于混沌中的一种奇石,里面蕴含了无数法则,可用于锻造90级以上的套装。',
    },
    14131: {
        n: '大道之力',
        tips: '一缕大道感悟,似乎蕴含了大道运行轨迹,可用于锻造出蕴含大道的套装。',
    },
    14132: {
        n: '姻缘石',
        tips: '缘定三生之石,乃是天下有情人因果凝结成,可用于锻造情缘装备。',
    },
    14133: {
        n: '灵异水',
        tips: '灵异小妖身上掉落的一种灵水，拥有压制狼毒的效果。',
    },
    14134: {
        n: '腾蛇血',
        tips: '大泽谷黑腾蛇，蕴含强大的火元素。',
    },
    14135: {
        n: '赤炎蛛丝',
        tips: '赤炎蜘蛛吐出来到一种丝线，极为坚韧。',
    },
}

module.exports = {
    getArticleList: function () {
        Object.keys(articleMap).map((id) => ({
            ...articleMap[id],
            id,
        }))
    },
    getArticle: function (articleId) {
        if (!articleMap[articleId]) {
            console.log('未找到物品：', articleId);
            return;
        }
        return JSON.parse(JSON.stringify({
            ...articleMap[id],
            id,
        }))
    }

}
