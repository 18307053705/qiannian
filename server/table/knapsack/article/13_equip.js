const articleMap = {
    131: {
        n: '新手木剑',
        price: 1000,
        unit: 'tael',
        career: 0,
        level: 1,
        pos: 1,
        attr: 5,
        tips: '制作比较粗糙的木剑,佩戴后可提升些许攻击。'
    },
    132: {
        n: '新手头巾',
        price: 1000,
        unit: 'tael',
        career: 0,
        level: 1,
        pos: 2,
        attr: 5,
        tips: '制作比较粗糙的头巾,佩戴后可提升些许法力。'
    },
    133: {
        n: '新手布衣',
        price: 1000,
        unit: 'tael',
        career: 0,
        level: 1,
        pos: 3,
        attr: 5,
        tips: '制作比较粗糙的布衣,佩戴后可提升些许生命。'
    },
    134: {
        n: '新手腰带',
        price: 1000,
        unit: 'tael',
        career: 0,
        level: 1,
        pos: 4,
        attr: 5,
        tips: '制作比较粗糙的腰带,佩戴后可提升些许防御。'
    },
    135: {
        n: '新手草鞋',
        price: 1000,
        unit: 'tael',
        career: 0,
        level: 1,
        pos: 5,
        attr: 5,
        tips: '制作比较粗糙的草鞋,佩戴后可提升些许闪避。'
    },
    136: {
        n: '紫金剑',
        price: 5000,
        unit: 'tael',
        career: 0,
        level: 10,
        pos: 1,
        attr: 2,
        tips: '每日初晨采集紫霞之气,足足七七四十九日方铸造而成的神剑。'
    },
    137: {
        n: '紫金盔',
        price: 5000,
        unit: 'tael',
        career: 0,
        level: 10,
        pos: 2,
        attr: 2,
        tips: '每日初晨采集紫霞之气,足足七七四十九日方铸造而成的战盔。'
    },
    138: {
        n: '紫金甲',
        price: 5000,
        unit: 'tael',
        career: 0,
        level: 10,
        pos: 3,
        attr: 2,
        tips: '每日初晨采集紫霞之气,足足七七四十九日方铸造而成的战甲。'
    },
    139: {
        n: '紫金带',
        price: 5000,
        unit: 'tael',
        career: 0,
        level: 10,
        pos: 4,
        attr: 2,
        tips: '每日初晨采集紫霞之气,足足七七四十九日方铸造而成的腰带。'
    },
    1310: {
        n: '紫金靴',
        price: 5000,
        unit: 'tael',
        career: 0,
        level: 10,
        pos: 5,
        attr: 2,
        tips: '每日初晨采集紫霞之气,足足七七四十九日方铸造而成的战靴。'
    },
    1311: {
        n: '皇极法杖',
        price: 20000,
        unit: 'tael',
        career: 1,
        level: 20,
        pos: 1,
        attr: 1,
        group: 10002,
        tips: '五大皇极套装之一,吸收天地煞气而成,蕴含了毁天灭地的力量。'
    },
    1312: {
        n: '皇极头巾',
        price: 20000,
        unit: 'tael',
        career: 1,
        level: 20,
        pos: 2,
        attr: 1,
        group: 10002,
        tips: '五大皇极套装之一,吸收天地煞气而成,蕴含了源源不断的法力。'
    },
    1313: {
        n: '皇极法袍',
        price: 20000,
        unit: 'tael',
        career: 1,
        level: 20,
        pos: 3,
        attr: 1,
        group: 10002,
        tips: '五大皇极套装之一,吸收天地煞气而成,蕴含了无穷无尽的生机。'
    },
    1314: {
        n: '皇极束带',
        price: 20000,
        unit: 'tael',
        career: 1,
        level: 20,
        pos: 4,
        attr: 1,
        group: 10002,
        tips: '五大皇极套装之一,吸收天地煞气而成,拥有极为恐怖的防御。'
    },
    1315: {
        n: '皇极布鞋',
        price: 20000,
        unit: 'tael',
        career: 1,
        level: 20,
        pos: 5,
        attr: 1,
        group: 10002,
        tips: '五大皇极套装之一,吸收天地煞气而成,拥有鬼魅般的速度。'
    },
    1316: {
        n: '皇鼎长枪',
        price: 20000,
        unit: 'tael',
        career: 2,
        level: 20,
        pos: 1,
        attr: 1,
        group: 10003,
        tips: '五大皇鼎套装之一,吸收天地煞气而成,蕴含了毁天灭地的力量。'
    },
    1317: {
        n: '皇鼎头盔',
        price: 20000,
        unit: 'tael',
        career: 2,
        level: 20,
        pos: 2,
        attr: 1,
        group: 10003,
        tips: '五大皇鼎装之一,吸收天地煞气而成,蕴含了源源不断的法力。'
    },
    1318: {
        n: '皇鼎战恺',
        price: 20000,
        unit: 'tael',
        career: 2,
        level: 20,
        pos: 3,
        attr: 1,
        group: 10003,
        tips: '五大皇鼎套装之一,吸收天地煞气而成,蕴含了无穷无尽的生机。'
    },
    1319: {
        n: '皇鼎腰带',
        price: 20000,
        unit: 'tael',
        career: 2,
        level: 20,
        pos: 4,
        attr: 1,
        group: 10003,
        tips: '五大皇鼎套装之一,吸收天地煞气而成,拥有极为恐怖的防御。'
    },
    1320: {
        n: '皇鼎战靴',
        price: 20000,
        unit: 'tael',
        career: 2,
        level: 20,
        pos: 5,
        attr: 1,
        group: 10003,
        tips: '五大皇鼎套装之一,吸收天地煞气而成,拥有鬼魅般的速度。'
    },
    1321: {
        n: '皇泽长弓',
        price: 20000,
        unit: 'tael',
        career: 3,
        level: 20,
        pos: 1,
        attr: 1,
        group: 10004,
        tips: '五大皇泽套装之一,吸收天地煞气而成,蕴含了毁天灭地的力量。'
    },
    1322: {
        n: '皇泽头巾',
        price: 20000,
        unit: 'tael',
        career: 3,
        level: 20,
        pos: 2,
        attr: 1,
        group: 10004,
        tips: '五大皇泽装之一,吸收天地煞气而成,蕴含了源源不断的法力。'
    },
    1323: {
        n: '皇泽皮衣',
        price: 20000,
        unit: 'tael',
        career: 3,
        level: 20,
        pos: 3,
        attr: 1,
        group: 10004,
        tips: '五大皇泽套装之一,吸收天地煞气而成,蕴含了无穷无尽的生机。'
    },
    1324: {
        n: '皇泽腰带',
        price: 20000,
        unit: 'tael',
        career: 3,
        level: 20,
        pos: 4,
        attr: 1,
        group: 10004,
        tips: '五大皇泽套装之一,吸收天地煞气而成,拥有极为恐怖的防御。'
    },
    1325: {
        n: '皇泽长靴',
        price: 20000,
        unit: 'tael',
        career: 3,
        level: 20,
        pos: 5,
        attr: 1,
        group: 10004,
        tips: '五大皇泽套装之一,吸收天地煞气而成,拥有鬼魅般的速度。'
    },
    1326: {
        n: '星辰法杖',
        career: 1,
        level: 35,
        pos: 1,
        attr: 2,
        group: 10005,
        tips: '耗费无数武器晶石与世界声望锻造而成的武器,唯有强者才配拥有。',
        make: {
            article: '1861-12',
            integral: 'world-300',
            yuanbao: 700
        },
    },
    1327: {
        n: '星辰头巾',
        career: 1,
        level: 35,
        pos: 2,
        attr: 2,
        group: 10005,
        tips: '耗费无数头盔晶石与世界声望锻造而成的头巾,唯有强者才配拥有。',
        make: {
            article: '1865-12',
            integral: 'world-300',
            yuanbao: 700
        },
    },
    1328: {
        n: '星辰法袍',
        career: 1,
        level: 35,
        pos: 3,
        attr: 2,
        group: 10005,
        tips: '耗费无数铠甲晶石与世界声望锻造而成的法袍,唯有强者才配拥有。',
        make: {
            article: '1869-12',
            integral: 'world-300',
            yuanbao: 700
        },
    },
    1329: {
        n: '星辰束带',
        career: 1,
        level: 35,
        pos: 4,
        attr: 2,
        group: 10005,
        tips: '耗费无数腰带晶石与世界声望锻造而成的束带,唯有强者才配拥有。',
        make: {
            article: '1873-12',
            integral: 'world-300',
            yuanbao: 700
        },
    },
    1330: {
        n: '星辰布鞋',
        career: 1,
        level: 35,
        pos: 5,
        attr: 2,
        group: 10005,
        tips: '耗费无数鞋子晶石与世界声望锻造而成的布鞋,唯有强者才配拥有。',
        make: {
            article: '1877-12',
            integral: 'world-300',
            yuanbao: 700
        },
    },
    1331: {
        n: '玉尊战戟',
        career: 2,
        level: 35,
        pos: 1,
        attr: 2,
        group: 10006,
        tips: '耗费无数武器晶石与世界声望锻造而成的武器,唯有强者才配拥有。',
        make: {
            article: '1861-12',
            integral: 'world-300',
            yuanbao: 700
        },
    },
    1332: {
        n: '玉尊战盔',
        career: 2,
        level: 35,
        pos: 2,
        attr: 2,
        group: 10006,
        tips: '耗费无数头盔晶石与世界声望锻造而成的头盔,唯有强者才配拥有。',
        make: {
            article: '1865-12',
            integral: 'world-300',
            yuanbao: 700
        },
    },
    1333: {
        n: '玉尊战甲',
        career: 2,
        level: 35,
        pos: 3,
        attr: 2,
        group: 10006,
        tips: '耗费无数盔甲晶石与世界声望锻造而成的盔甲,唯有强者才配拥有。',
        make: {
            article: '1869-12',
            integral: 'world-300',
            yuanbao: 700
        },
    },
    1334: {
        n: '玉尊战带',
        career: 2,
        level: 35,
        pos: 4,
        attr: 2,
        group: 10006,
        tips: '耗费无数腰带晶石与世界声望锻造而成的腰带,唯有强者才配拥有。',
        make: {
            article: '1873-12',
            integral: 'world-300',
            yuanbao: 700
        },
    },
    1335: {
        n: '玉尊战靴',
        career: 2,
        level: 35,
        pos: 5,
        attr: 2,
        group: 10006,
        tips: '耗费无数鞋子晶石与世界声望锻造而成的鞋子,唯有强者才配拥有。',
        make: {
            article: '1877-12',
            integral: 'world-300',
            yuanbao: 700
        },
    },
    1336: {
        n: '凌影长剑',
        career: 3,
        level: 35,
        pos: 1,
        attr: 2,
        group: 10007,
        tips: '耗费无数武器晶石与世界声望锻造而成的武器,唯有强者才配拥有。',
        make: {
            article: '1861-12',
            integral: 'world-300',
            yuanbao: 700
        },
    },
    1337: {
        n: '凌影头巾',
        career: 3,
        level: 35,
        pos: 2,
        attr: 2,
        group: 10007,
        tips: '耗费无数头盔晶石与世界声望锻造而成的头盔,唯有强者才配拥有。',
        make: {
            article: '1865-12',
            integral: 'world-300',
            yuanbao: 700
        },
    },
    1338: {
        n: '凌影长衣',
        career: 3,
        level: 35,
        pos: 3,
        attr: 2,
        group: 10007,
        tips: '耗费无数铠甲晶石与世界声望锻造而成的铠甲,唯有强者才配拥有。',
        make: {
            article: '1869-12',
            integral: 'world-300',
            yuanbao: 700
        },
    },
    1339: {
        n: '凌影玉束',
        career: 3,
        level: 35,
        pos: 4,
        attr: 2,
        group: 10007,
        tips: '耗费无数腰带晶石与世界声望锻造而成的腰带,唯有强者才配拥有。',
        make: {
            article: '1873-12',
            integral: 'world-300',
            yuanbao: 700
        },
    },
    1340: {
        n: '凌影布鞋',
        career: 3,
        level: 35,
        pos: 5,
        attr: 2,
        group: 10007,
        tips: '耗费无数鞋子晶石与世界声望锻造而成的鞋子,唯有强者才配拥有。',
        make: {
            article: '1877-12',
            integral: 'world-300',
            yuanbao: 700
        },
    },
    1341: {
        n: '飞炼法杖',
        career: 1,
        level: 55,
        pos: 1,
        attr: 3,
        group: 10008,
        tips: '传说中的飞炼套装之一,每个部位都有强大的力量,集齐五件套即可获得大量属性加成。',
        make: {
            article: '1862-24',
            integral: 'world-800',
            yuanbao: 1800
        },
    },
    1342: {
        n: '飞炼头巾',
        career: 1,
        level: 55,
        pos: 2,
        attr: 3,
        group: 10008,
        tips: '传说中的飞炼套装之一,每个部位都有强大的力量,集齐五件套即可获得大量属性加成。',
        make: {
            article: '1866-24',
            integral: 'world-800',
            yuanbao: 1800
        },
    },
    1343: {
        n: '飞炼法袍',
        career: 1,
        level: 55,
        pos: 3,
        attr: 3,
        group: 10008,
        tips: '传说中的飞炼套装之一,每个部位都有强大的力量,集齐五件套即可获得大量属性加成。',
        make: {
            article: '1870-24',
            integral: 'world-800',
            yuanbao: 1800
        },
    },
    1344: {
        n: '飞炼束带',
        career: 1,
        level: 55,
        pos: 4,
        attr: 3,
        group: 10008,
        tips: '传说中的飞炼套装之一,每个部位都有强大的力量,集齐五件套即可获得大量属性加成。',
        make: {
            article: '1874-24',
            integral: 'world-800',
            yuanbao: 1800
        },
    },
    1345: {
        n: '飞炼布鞋',
        career: 1,
        level: 55,
        pos: 5,
        attr: 3,
        group: 10008,
        tips: '传说中的飞炼套装之一,每个部位都有强大的力量,集齐五件套即可获得大量属性加成。',
        make: {
            article: '1878-24',
            integral: 'world-800',
            yuanbao: 1800
        },
    },
    1346: {
        n: '飞尊战戟',
        career: 2,
        level: 55,
        pos: 1,
        attr: 3,
        group: 10009,
        tips: '传说中的飞尊套装之一,每个部位都有强大的力量,集齐五件套即可获得大量属性加成。',
        make: {
            article: '1862-24',
            integral: 'world-800',
            yuanbao: 1800
        },
    },
    1347: {
        n: '飞尊战盔',
        career: 2,
        level: 55,
        pos: 2,
        attr: 3,
        group: 10009,
        tips: '传说中的飞尊套装之一,每个部位都有强大的力量,集齐五件套即可获得大量属性加成。',
        make: {
            article: '1866-24',
            integral: 'world-800',
            yuanbao: 1800
        },
    },
    1348: {
        n: '飞尊战甲',
        career: 2,
        level: 55,
        pos: 3,
        attr: 3,
        group: 10009,
        tips: '传说中的飞尊套装之一,每个部位都有强大的力量,集齐五件套即可获得大量属性加成。',
        make: {
            article: '1870-24',
            integral: 'world-800',
            yuanbao: 1800
        },
    },
    1349: {
        n: '飞尊战带',
        career: 2,
        level: 55,
        pos: 4,
        attr: 3,
        group: 10009,
        tips: '传说中的飞尊套装之一,每个部位都有强大的力量,集齐五件套即可获得大量属性加成。',
        make: {
            article: '1870-24',
            integral: 'world-800',
            yuanbao: 1800
        },
    },
    1350: {
        n: '飞尊战靴',
        career: 2,
        level: 55,
        pos: 5,
        attr: 3,
        group: 10009,
        tips: '传说中的飞尊套装之一,每个部位都有强大的力量,集齐五件套即可获得大量属性加成。',
        make: {
            article: '1878-24',
            integral: 'world-800',
            yuanbao: 1800
        },
    },
    1351: {
        n: '飞影长剑',
        career: 3,
        level: 55,
        pos: 1,
        attr: 3,
        group: 10010,
        tips: '传说中的飞影套装之一,每个部位都有强大的力量,集齐五件套即可获得大量属性加成。',
        make: {
            article: '1862-24',
            integral: 'world-800',
            yuanbao: 1800
        },
    },
    1352: {
        n: '飞影头巾',
        career: 3,
        level: 55,
        pos: 2,
        attr: 3,
        group: 10010,
        tips: '传说中的飞影套装之一,每个部位都有强大的力量,集齐五件套即可获得大量属性加成。',
        make: {
            article: '1866-24',
            integral: 'world-800',
            yuanbao: 1800
        },
    },
    1353: {
        n: '飞影长衣',
        career: 3,
        level: 55,
        pos: 3,
        attr: 3,
        group: 10010,
        tips: '传说中的飞影套装之一,每个部位都有强大的力量,集齐五件套即可获得大量属性加成。',
        make: {
            article: '1870-24',
            integral: 'world-800',
            yuanbao: 1800
        },
    },
    1354: {
        n: '飞影玉束',
        career: 3,
        level: 55,
        pos: 4,
        attr: 3,
        group: 10010,
        tips: '传说中的飞影套装之一,每个部位都有强大的力量,集齐五件套即可获得大量属性加成。',
        make: {
            article: '1870-24',
            integral: 'world-800',
            yuanbao: 1800
        },
    },
    1355: {
        n: '飞影布鞋',
        career: 3,
        level: 55,
        pos: 5,
        attr: 3,
        group: 10010,
        tips: '传说中的飞影套装之一,每个部位都有强大的力量,集齐五件套即可获得大量属性加成。',
        make: {
            article: '1878-24',
            integral: 'world-800',
            yuanbao: 1800
        },
    },
    1356: {
        n: '金光法杖',
        career: 1,
        level: 70,
        pos: 1,
        attr: 4,
        group: 10011,
        tips: '70级金光套装之一,每个部位都有强大的力量,集齐五件套即可获得大量属性加成。',
        make: {
            article: '1863-36',
            integral: 'world-2000',
            yuanbao: 5000
        },
    },
    1357: {
        n: '金光头巾',
        career: 1,
        level: 70,
        pos: 2,
        attr: 4,
        group: 10011,
        tips: '70级金光套装之一,每个部位都有强大的力量,集齐五件套即可获得大量属性加成。',
        make: {
            article: '1867-36',
            integral: 'world-2000',
            yuanbao: 5000
        },
    },
    1358: {
        n: '金光法袍',
        career: 1,
        level: 70,
        pos: 3,
        attr: 4,
        group: 10011,
        tips: '70级金光套装之一,每个部位都有强大的力量,集齐五件套即可获得大量属性加成。',
        make: {
            article: '1871-36',
            integral: 'world-2000',
            yuanbao: 5000
        },
    },
    1359: {
        n: '金光束带',
        career: 1,
        level: 70,
        pos: 4,
        attr: 4,
        group: 10011,
        tips: '70级金光套装之一,每个部位都有强大的力量,集齐五件套即可获得大量属性加成。',
        make: {
            article: '1875-36',
            integral: 'world-2000',
            yuanbao: 5000
        },
    },
    1360: {
        n: '金光布鞋',
        career: 1,
        level: 70,
        pos: 5,
        attr: 4,
        group: 10011,
        tips: '70级金光套装之一,每个部位都有强大的力量,集齐五件套即可获得大量属性加成。',
        make: {
            article: '1879-36',
            integral: 'world-2000',
            yuanbao: 5000
        },
    },
    1361: {
        n: '金玉战戟',
        career: 2,
        level: 70,
        pos: 1,
        attr: 4,
        group: 10012,
        tips: '70级金玉套装之一,每个部位都有强大的力量,集齐五件套即可获得大量属性加成。',
        make: {
            article: '1863-36',
            integral: 'world-2000',
            yuanbao: 5000
        },
    },
    1362: {
        n: '金玉战盔',
        career: 2,
        level: 70,
        pos: 2,
        attr: 4,
        group: 10012,
        tips: '70级金玉套装之一,每个部位都有强大的力量,集齐五件套即可获得大量属性加成。',
        make: {
            article: '1867-36',
            integral: 'world-2000',
            yuanbao: 5000
        },
    },
    1363: {
        n: '金玉战甲',
        career: 2,
        level: 70,
        pos: 3,
        attr: 4,
        group: 10012,
        tips: '70级金玉套装之一,每个部位都有强大的力量,集齐五件套即可获得大量属性加成。',
        make: {
            article: '1871-36',
            integral: 'world-2000',
            yuanbao: 5000
        },
    },
    1364: {
        n: '金玉战带',
        career: 2,
        level: 70,
        pos: 4,
        attr: 4,
        group: 10012,
        tips: '70级金玉套装之一,每个部位都有强大的力量,集齐五件套即可获得大量属性加成。',
        make: {
            article: '1875-36',
            integral: 'world-2000',
            yuanbao: 5000
        },
    },
    1365: {
        n: '金玉战靴',
        career: 2,
        level: 70,
        pos: 5,
        attr: 4,
        group: 10012,
        tips: '70级金玉套装之一,每个部位都有强大的力量,集齐五件套即可获得大量属性加成。',
        make: {
            article: '1879-36',
            integral: 'world-2000',
            yuanbao: 5000
        },
    },
    1366: {
        n: '金流长剑',
        career: 3,
        level: 70,
        pos: 1,
        attr: 4,
        group: 10013,
        tips: '70级金流套装之一,每个部位都有强大的力量,集齐五件套即可获得大量属性加成。',
        make: {
            article: '1863-36',
            integral: 'world-2000',
            yuanbao: 5000
        },
    },
    1367: {
        n: '金流头巾',
        career: 3,
        level: 70,
        pos: 2,
        attr: 4,
        group: 10013,
        tips: '70级金流套装之一,每个部位都有强大的力量,集齐五件套即可获得大量属性加成。',
        make: {
            article: '1867-36',
            integral: 'world-2000',
            yuanbao: 5000
        },
    },
    1368: {
        n: '金流长衣',
        career: 3,
        level: 70,
        pos: 3,
        attr: 4,
        group: 10013,
        tips: '70级金流套装之一,每个部位都有强大的力量,集齐五件套即可获得大量属性加成。',
        make: {
            article: '1871-36',
            integral: 'world-2000',
            yuanbao: 5000
        },
    },
    1369: {
        n: '金流玉束',
        career: 3,
        level: 70,
        pos: 4,
        attr: 4,
        group: 10013,
        tips: '70级金流套装之一,每个部位都有强大的力量,集齐五件套即可获得大量属性加成。',
        make: {
            article: '1875-36',
            integral: 'world-2000',
            yuanbao: 5000
        },
    },
    1370: {
        n: '金流布鞋',
        career: 3,
        level: 70,
        pos: 5,
        attr: 4,
        group: 10013,
        tips: '70级金流套装之一,每个部位都有强大的力量,集齐五件套即可获得大量属性加成。',
        make: {
            article: '1879-36',
            integral: 'world-2000',
            yuanbao: 5000
        },
    },
    1371: {
        n: '无极の法杖',
        career: 1,
        level: 80,
        pos: 1,
        attr: 5,
        group: 10014,
        tips: '顶级声望套装,无极套装之一,每个部位都有强大的力量,集齐五件套即可获得大量属性加成。',
        make: {
            article: '1864-72',
            integral: 'world-5000',
            yuanbao: 12000
        },
    },
    1372: {
        n: '无极の头巾',
        career: 1,
        level: 80,
        pos: 2,
        attr: 5,
        group: 10014,
        tips: '顶级声望套装,无极套装之一,每个部位都有强大的力量,集齐五件套即可获得大量属性加成。',
        make: {
            article: '1868-72',
            integral: 'world-5000',
            yuanbao: 12000
        },
    },
    1373: {
        n: '无极の法袍',
        career: 1,
        level: 80,
        pos: 3,
        attr: 5,
        group: 10014,
        tips: '顶级声望套装,无极套装之一,每个部位都有强大的力量,集齐五件套即可获得大量属性加成。',
        make: {
            article: '1872-72',
            integral: 'world-5000',
            yuanbao: 12000
        },
    },
    1374: {
        n: '无极の束带',
        career: 1,
        level: 80,
        pos: 4,
        attr: 5,
        group: 10014,
        tips: '顶级声望套装,无极套装之一,每个部位都有强大的力量,集齐五件套即可获得大量属性加成。',
        make: {
            article: '1876-72',
            integral: 'world-5000',
            yuanbao: 12000
        },
    },
    1375: {
        n: '无极の布鞋',
        career: 1,
        level: 80,
        pos: 5,
        attr: 5,
        group: 10014,
        tips: '顶级声望套装,无极套装之一,每个部位都有强大的力量,集齐五件套即可获得大量属性加成。',
        make: {
            article: '1880-72',
            integral: 'world-5000',
            yuanbao: 12000
        },
    },
    1376: {
        n: '守元の战戟',
        career: 2,
        level: 80,
        pos: 1,
        attr: 5,
        group: 10015,
        tips: '顶级声望套装,守元套装之一,每个部位都有强大的力量,集齐五件套即可获得大量属性加成。',
        make: {
            article: '1864-72',
            integral: 'world-5000',
            yuanbao: 12000
        },
    },
    1377: {
        n: '守元の战盔',
        career: 2,
        level: 80,
        pos: 2,
        attr: 5,
        group: 10015,
        tips: '顶级声望套装,守元套装之一,每个部位都有强大的力量,集齐五件套即可获得大量属性加成。',
        make: {
            article: '1868-72',
            integral: 'world-5000',
            yuanbao: 12000
        },
    },
    1378: {
        n: '守元の战甲',
        career: 2,
        level: 80,
        pos: 3,
        attr: 5,
        group: 10015,
        tips: '顶级声望套装,守元套装之一,每个部位都有强大的力量,集齐五件套即可获得大量属性加成。',
        make: {
            article: '1872-72',
            integral: 'world-5000',
            yuanbao: 12000
        },
    },
    1379: {
        n: '守元の战带',
        career: 2,
        level: 80,
        pos: 4,
        attr: 5,
        group: 10015,
        tips: '顶级声望套装,守元套装之一,每个部位都有强大的力量,集齐五件套即可获得大量属性加成。',
        make: {
            article: '1876-72',
            integral: 'world-5000',
            yuanbao: 12000
        },
    },
    1380: {
        n: '守元の战靴',
        career: 2,
        level: 80,
        pos: 5,
        attr: 5,
        group: 10015,
        tips: '顶级声望套装,守元套装之一,每个部位都有强大的力量,集齐五件套即可获得大量属性加成。',
        make: {
            article: '1880-72',
            integral: 'world-5000',
            yuanbao: 12000
        },
    },
    1381: {
        n: '遁一の长剑',
        career: 3,
        level: 80,
        pos: 1,
        attr: 5,
        group: 10016,
        tips: '顶级声望套装,遁一套装之一,每个部位都有强大的力量,集齐五件套即可获得大量属性加成。',
        make: {
            article: '1864-72',
            integral: 'world-5000',
            yuanbao: 12000
        },
    },
    1382: {
        n: '遁一の头巾',
        career: 3,
        level: 80,
        pos: 2,
        attr: 5,
        group: 10016,
        tips: '顶级声望套装,遁一套装之一,每个部位都有强大的力量,集齐五件套即可获得大量属性加成。',
        make: {
            article: '1868-72',
            integral: 'world-5000',
            yuanbao: 12000
        },
    },
    1383: {
        n: '遁一の长衣',
        career: 3,
        level: 80,
        pos: 3,
        attr: 5,
        group: 10016,
        tips: '顶级声望套装,遁一套装之一,每个部位都有强大的力量,集齐五件套即可获得大量属性加成。',
        make: {
            article: '1872-72',
            integral: 'world-5000',
            yuanbao: 12000
        },
    },
    1384: {
        n: '遁一の玉束',
        career: 3,
        level: 80,
        pos: 4,
        attr: 5,
        group: 10016,
        tips: '顶级声望套装,遁一套装之一,每个部位都有强大的力量,集齐五件套即可获得大量属性加成。',
        make: {
            article: '1876-72',
            integral: 'world-5000',
            yuanbao: 12000
        },
    },
    1385: {
        n: '遁一の布鞋',
        career: 3,
        level: 80,
        pos: 5,
        attr: 5,
        group: 10016,
        tips: '顶级声望套装,遁一套装之一,每个部位都有强大的力量,集齐五件套即可获得大量属性加成。',
        make: {
            article: '1880-72',
            integral: 'world-5000',
            yuanbao: 12000
        },
    },
    1386: {
        n: '生死の法杖',
        career: 1,
        level: 90,
        pos: 1,
        attr: 7,
        group: 10017,
        tips: '借天地法则铸造的生死套装之一,每个部位都有强大的法则之力,据说集齐五件套者可掌握生死之道。',
        make: {
            article: '18100-108',
            integral: 'world-8000',
            yuanbao: 20000
        },
    },
    1387: {
        n: '生死の头巾',
        career: 1,
        level: 90,
        pos: 2,
        attr: 7,
        group: 10017,
        tips: '借天地法则铸造的生死套装之一,每个部位都有强大的法则之力,据说集齐五件套者可掌握生死之道。',
        make: {
            article: '18100-108',
            integral: 'world-8000',
            yuanbao: 20000
        },
    },
    1388: {
        n: '生死の法袍',
        career: 1,
        level: 90,
        pos: 3,
        attr: 7,
        group: 10017,
        tips: '借天地法则铸造的生死套装之一,每个部位都有强大的法则之力,据说集齐五件套者可掌握生死之道。',
        make: {
            article: '18100-108',
            integral: 'world-8000',
            yuanbao: 20000
        },
    },
    1389: {
        n: '生死の束带',
        career: 1,
        level: 90,
        pos: 4,
        attr: 7,
        group: 10017,
        tips: '借天地法则铸造的生死套装之一,每个部位都有强大的法则之力,据说集齐五件套者可掌握生死之道。',
        make: {
            article: '18100-108',
            integral: 'world-8000',
            yuanbao: 20000
        },
    },
    1390: {
        n: '生死の布鞋',
        career: 1,
        level: 90,
        pos: 5,
        attr: 7,
        group: 10017,
        tips: '借天地法则铸造的生死套装之一,每个部位都有强大的法则之力,据说集齐五件套者可掌握生死之道。',
        make: {
            article: '18100-108',
            integral: 'world-8000',
            yuanbao: 20000
        },
    },
    1391: {
        n: '永恒の战戟',
        career: 2,
        level: 90,
        pos: 1,
        attr: 7,
        group: 10018,
        tips: '借天地法则铸造的永恒套装之一,每个部位都有强大的法则之力,据说集齐五件套者可掌握永恒之道。',
        make: {
            article: '18100-108',
            integral: 'world-8000',
            yuanbao: 20000
        },
    },
    1392: {
        n: '永恒の战盔',
        career: 2,
        level: 90,
        pos: 2,
        attr: 7,
        group: 10018,
        tips: '借天地法则铸造的永恒套装之一,每个部位都有强大的法则之力,据说集齐五件套者可掌握永恒之道。',
        make: {
            article: '18100-108',
            integral: 'world-8000',
            yuanbao: 20000
        },
    },
    1393: {
        n: '永恒の战甲',
        career: 2,
        level: 90,
        pos: 3,
        attr: 7,
        group: 10018,
        tips: '借天地法则铸造的永恒套装之一,每个部位都有强大的法则之力,据说集齐五件套者可掌握永恒之道。',
        make: {
            article: '18100-108',
            integral: 'world-8000',
            yuanbao: 20000
        },
    },
    1394: {
        n: '永恒の战带',
        career: 2,
        level: 90,
        pos: 4,
        attr: 7,
        group: 10018,
        tips: '借天地法则铸造的永恒套装之一,每个部位都有强大的法则之力,据说集齐五件套者可掌握永恒之道。',
        make: {
            article: '18100-108',
            integral: 'world-8000',
            yuanbao: 20000
        },
    },
    1395: {
        n: '永恒の战靴',
        career: 2,
        level: 90,
        pos: 5,
        attr: 7,
        group: 10018,
        tips: '借天地法则铸造的永恒套装之一,每个部位都有强大的法则之力,据说集齐五件套者可掌握永恒之道。',
        make: {
            article: '18100-108',
            integral: 'world-8000',
            yuanbao: 20000
        },
    },
    1396: {
        n: '太初の古剑',
        career: 3,
        level: 90,
        pos: 1,
        attr: 7,
        group: 10019,
        tips: '借天地法则铸造的太初套装之一,每个部位都有强大的法则之力,据说集齐五件套者可掌握太初之道。',
        make: {
            article: '18100-108',
            integral: 'world-8000',
            yuanbao: 20000
        },
    },
    1397: {
        n: '太初の头巾',
        career: 3,
        level: 90,
        pos: 2,
        attr: 7,
        group: 10019,
        tips: '借天地法则铸造的太初套装之一,每个部位都有强大的法则之力,据说集齐五件套者可掌握太初之道。',
        make: {
            article: '18100-108',
            integral: 'world-8000',
            yuanbao: 20000
        },
    },
    1398: {
        n: '太初の长衣',
        career: 3,
        level: 90,
        pos: 3,
        attr: 7,
        group: 10019,
        tips: '借天地法则铸造的太初套装之一,每个部位都有强大的法则之力,据说集齐五件套者可掌握太初之道。',
        make: {
            article: '18100-108',
            integral: 'world-8000',
            yuanbao: 20000
        },
    },
    1399: {
        n: '太初の玉束',
        career: 3,
        level: 90,
        pos: 4,
        attr: 7,
        group: 10019,
        tips: '借天地法则铸造的太初套装之一,每个部位都有强大的法则之力,据说集齐五件套者可掌握太初之道。',
        make: {
            article: '18100-108',
            integral: 'world-8000',
            yuanbao: 20000
        },
    },
    13100: {
        n: '太初の布鞋',
        career: 3,
        level: 90,
        pos: 5,
        attr: 7,
        group: 10019,
        tips: '借天地法则铸造的太初套装之一,每个部位都有强大的法则之力,据说集齐五件套者可掌握太初之道。',
        make: {
            article: '18100-108',
            integral: 'world-8000',
            yuanbao: 20000
        },
    },
    13101: {
        n: '黄泉の法杖',
        career: 1,
        level: 100,
        pos: 1,
        attr: 7,
        group: 10020,
        tips: '以黄泉大道铸造的黄泉套装之一,传说乃是太古幽冥地府的神器,拥有掌生死,握轮回的无上伟力。',
        make: {
            article: '18101-108',
            integral: 'world-15000',
            yuanbao: 35000
        },
    },
    13102: {
        n: '黄泉の头巾',
        career: 1,
        level: 100,
        pos: 2,
        attr: 7,
        group: 10020,
        tips: '以黄泉大道铸造的黄泉套装之一,传说乃是太古幽冥地府的神器,拥有掌生死,握轮回的无上伟力。',
        make: {
            article: '18101-108',
            integral: 'world-15000',
            yuanbao: 35000
        },
    },
    13103: {
        n: '黄泉の法袍',
        career: 1,
        level: 100,
        pos: 3,
        attr: 7,
        group: 10020,
        tips: '以黄泉大道铸造的黄泉套装之一,传说乃是太古幽冥地府的神器,拥有掌生死,握轮回的无上伟力。',
        make: {
            article: '18101-108',
            integral: 'world-15000',
            yuanbao: 35000
        },
    },
    13104: {
        n: '黄泉の束带',
        career: 1,
        level: 100,
        pos: 4,
        attr: 7,
        group: 10020,
        tips: '以黄泉大道铸造的黄泉套装之一,传说乃是太古幽冥地府的神器,拥有掌生死,握轮回的无上伟力。',
        make: {
            article: '18101-108',
            integral: 'world-15000',
            yuanbao: 35000
        },
    },
    13105: {
        n: '黄泉の布鞋',
        career: 1,
        level: 100,
        pos: 5,
        attr: 7,
        group: 10020,
        tips: '以黄泉大道铸造的黄泉套装之一,传说乃是太古幽冥地府的神器,拥有掌生死,握轮回的无上伟力。',
        make: {
            article: '18101-108',
            integral: 'world-15000',
            yuanbao: 35000
        },
    },
    13106: {
        n: '阴阳の战戟',
        career: 2,
        level: 100,
        pos: 1,
        attr: 7,
        group: 10021,
        tips: '以阴阳大道铸造的阴阳套装之一,传说阴阳大道的天地钟爱,以此道铸造的神器,拥有逆转阴阳的无上造化。',
        make: {
            article: '18101-108',
            integral: 'world-15000',
            yuanbao: 35000
        },
    },
    13107: {
        n: '阴阳の战盔',
        career: 2,
        level: 100,
        pos: 2,
        attr: 7,
        group: 10021,
        tips: '以阴阳大道铸造的阴阳套装之一,传说阴阳大道的天地钟爱,以此道铸造的神器,拥有逆转阴阳的无上造化。',
        make: {
            article: '18101-108',
            integral: 'world-15000',
            yuanbao: 35000
        },
    },
    13108: {
        n: '阴阳の战甲',
        career: 2,
        level: 100,
        pos: 3,
        attr: 7,
        group: 10021,
        tips: '以阴阳大道铸造的阴阳套装之一,传说阴阳大道的天地钟爱,以此道铸造的神器,拥有逆转阴阳的无上造化。',
        make: {
            article: '18101-108',
            integral: 'world-15000',
            yuanbao: 35000
        },
    },
    13109: {
        n: '阴阳の战带',
        career: 2,
        level: 100,
        pos: 4,
        attr: 7,
        group: 10021,
        tips: '以阴阳大道铸造的阴阳套装之一,传说阴阳大道的天地钟爱,以此道铸造的神器,拥有逆转阴阳的无上造化。',
        make: {
            article: '18101-108',
            integral: 'world-15000',
            yuanbao: 35000
        },
    },
    13110: {
        n: '阴阳の战靴',
        career: 2,
        level: 100,
        pos: 5,
        attr: 7,
        group: 10021,
        tips: '以阴阳大道铸造的阴阳套装之一,传说阴阳大道的天地钟爱,以此道铸造的神器,拥有逆转阴阳的无上造化。',
        make: {
            article: '18101-108',
            integral: 'world-15000',
            yuanbao: 35000
        },
    },
    13111: {
        n: '太虚の古剑',
        career: 3,
        level: 100,
        pos: 1,
        attr: 7,
        group: 10022,
        tips: '以空间大道铸造的太虚套装之一,佩戴此道所铸造的神器,可游离于虚空之中,超脱一切。',
        make: {
            article: '18101-108',
            integral: 'world-15000',
            yuanbao: 35000
        },
    },
    13112: {
        n: '太虚の头巾',
        career: 3,
        level: 100,
        pos: 2,
        attr: 7,
        group: 10022,
        tips: '以空间大道铸造的太虚套装之一,佩戴此道所铸造的神器,可游离于虚空之中,超脱一切。',
        make: {
            article: '18101-108',
            integral: 'world-15000',
            yuanbao: 35000
        },
    },
    13113: {
        n: '太虚の长衣',
        career: 3,
        level: 100,
        pos: 3,
        attr: 7,
        group: 10022,
        tips: '以空间大道铸造的太虚套装之一,佩戴此道所铸造的神器,可游离于虚空之中,超脱一切。',
        make: {
            article: '18101-108',
            integral: 'world-15000',
            yuanbao: 35000
        },
    },
    13114: {
        n: '太虚の玉束',
        career: 3,
        level: 100,
        pos: 4,
        attr: 7,
        group: 10022,
        tips: '以空间大道铸造的太虚套装之一,佩戴此道所铸造的神器,可游离于虚空之中,超脱一切。',
        make: {
            article: '18101-108',
            integral: 'world-15000',
            yuanbao: 35000
        },
    },
    13115: {
        n: '太虚の布鞋',
        career: 3,
        level: 100,
        pos: 5,
        attr: 7,
        group: 10022,
        tips: '以空间大道铸造的太虚套装之一,佩戴此道所铸造的神器,可游离于虚空之中,超脱一切。',
        make: {
            article: '18101-108',
            integral: 'world-15000',
            yuanbao: 35000
        },
    },
    13116: {
        n: '义薄云天刃',
        career: 0,
        level: 60,
        pos: 1,
        attr: 2,
        group: 10023,
        make: 3,
        tips: '60级帮会套装,需要大量的帮会声望进行锻造,拥有强大的属性增幅。',
        make: {
            article: '1862-24',
            integral: 'gang-800',
            yuanbao: 2000
        },
    },
    13117: {
        n: '义薄云天盔',
        career: 0,
        level: 60,
        pos: 2,
        attr: 2,
        group: 10023,
        make: 3,
        tips: '60级帮会套装,需要大量的帮会声望进行锻造,拥有强大的属性增幅。',
        make: {
            article: '1866-24',
            integral: 'gang-800',
            yuanbao: 2000
        },
    },
    13118: {
        n: '义薄云天甲',
        career: 0,
        level: 60,
        pos: 3,
        attr: 2,
        group: 10023,
        make: 3,
        tips: '60级帮会套装,需要大量的帮会声望进行锻造,拥有强大的属性增幅。',
        make: {
            article: '1870-24',
            integral: 'gang-800',
            yuanbao: 2000
        },
    },
    13119: {
        n: '义薄云天带',
        career: 0,
        level: 60,
        pos: 4,
        attr: 2,
        group: 10023,
        make: 3,
        tips: '60级帮会套装,需要大量的帮会声望进行锻造,拥有强大的属性增幅。',
        make: {
            article: '1874-24',
            integral: 'gang-800',
            yuanbao: 2000
        },
    },
    13120: {
        n: '义薄云天靴',
        career: 0,
        level: 60,
        pos: 5,
        attr: 2,
        group: 10023,
        make: 3,
        tips: '60级帮会套装,需要大量的帮会声望进行锻造,拥有强大的属性增幅。',
        make: {
            article: '1878-24',
            integral: 'gang-800',
            yuanbao: 2000
        },
    },
    13121: {
        n: '气吞山河枪',
        career: 0,
        level: 75,
        pos: 1,
        attr: 3,
        group: 10024,
        make: 3,
        tips: '75级帮会套装,需要大量的帮会声望与顶级晶石进行锻造,集齐五件可激活气吞山河套。',
        make: {
            article: '1863-36',
            integral: 'gang-2000',
            yuanbao: 5000
        },
    },
    13122: {
        n: '气吞山河盔',
        career: 0,
        level: 75,
        pos: 2,
        attr: 3,
        group: 10024,
        make: 3,
        tips: '75级帮会套装,需要大量的帮会声望与顶级晶石进行锻造,集齐五件可激活气吞山河套。',
        make: {
            article: '1867-36',
            integral: 'gang-2000',
            yuanbao: 5000
        },
    },
    13123: {
        n: '气吞山河甲',
        career: 0,
        level: 75,
        pos: 3,
        attr: 3,
        group: 10024,
        make: 3,
        tips: '75级帮会套装,需要大量的帮会声望与顶级晶石进行锻造,集齐五件可激活气吞山河套。',
        make: {
            article: '1871-36',
            integral: 'gang-2000',
            yuanbao: 5000
        },
    },
    13124: {
        n: '气吞山河带',
        career: 0,
        level: 75,
        pos: 4,
        attr: 3,
        group: 10024,
        make: 3,
        tips: '75级帮会套装,需要大量的帮会声望与顶级晶石进行锻造,集齐五件可激活气吞山河套。',
        make: {
            article: '1875-36',
            integral: 'gang-2000',
            yuanbao: 5000
        },
    },
    13125: {
        n: '气吞山河靴',
        career: 0,
        level: 75,
        pos: 5,
        attr: 3,
        group: 10024,
        make: 3,
        tips: '75级帮会套装,需要大量的帮会声望与顶级晶石进行锻造,集齐五件可激活气吞山河套。',
        make: {
            article: '1879-36',
            integral: 'gang-2000',
            yuanbao: 5000
        },
    },
    13126: {
        n: '权倾天下の枪',
        career: 0,
        level: 85,
        pos: 1,
        attr: 7,
        group: 10025,
        make: 3,
        tips: '85级帮会套装,需要大量的帮会声望与顶级晶石进行锻造,集齐五件可激活权倾天下套。',
        make: {
            article: '1864-72',
            integral: 'gang-5000',
            yuanbao: 12000
        },
    },
    13127: {
        n: '权倾天下の盔',
        career: 0,
        level: 85,
        pos: 2,
        attr: 7,
        group: 10025,
        make: 3,
        tips: '85级帮会套装,需要大量的帮会声望与顶级晶石进行锻造,集齐五件可激活权倾天下套。',
        make: {
            article: '1868-72',
            integral: 'gang-5000',
            yuanbao: 12000
        },
    },
    13128: {
        n: '权倾天下の甲',
        career: 0,
        level: 85,
        pos: 3,
        attr: 7,
        group: 10025,
        make: 3,
        tips: '85级帮会套装,需要大量的帮会声望与顶级晶石进行锻造,集齐五件可激活权倾天下套。',
        make: {
            article: '1872-72',
            integral: 'gang-5000',
            yuanbao: 12000
        },
    },
    13129: {
        n: '权倾天下の带',
        career: 0,
        level: 85,
        pos: 4,
        attr: 7,
        group: 10025,
        make: 3,
        tips: '85级帮会套装,需要大量的帮会声望与顶级晶石进行锻造,集齐五件可激活权倾天下套。',
        make: {
            article: '1876-72',
            integral: 'gang-5000',
            yuanbao: 12000
        },
    },
    13130: {
        n: '权倾天下の靴',
        career: 0,
        level: 85,
        pos: 5,
        attr: 7,
        group: 10025,
        make: 3,
        tips: '85级帮会套装,需要大量的帮会声望与顶级晶石进行锻造,集齐五件可激活权倾天下套。',
        make: {
            article: '1880-72',
            integral: 'gang-5000',
            yuanbao: 12000
        },
    },
    13131: {
        n: '醉卧沙场の枪',
        career: 0,
        level: 65,
        pos: 1,
        attr: 7,
        group: 10026,
        make: 2,
        tips: '醉卧沙场君莫笑,古来征战几人回,以无数战场功勋凝聚而出的强大套装,激活后可获得大量属性加成。',
        make: {
            article: '1862-24',
            integral: 'exploit-1000',
            yuanbao: 4000
        },
    },
    13132: {
        n: '醉卧沙场の盔',
        career: 0,
        level: 65,
        pos: 2,
        attr: 7,
        group: 10026,
        make: 2,
        tips: '醉卧沙场君莫笑,古来征战几人回,以无数战场功勋凝聚而出的强大套装,激活后可获得大量属性加成。',
        make: {
            article: '1866-24',
            integral: 'exploit-1000',
            yuanbao: 4000
        },
    },
    13133: {
        n: '醉卧沙场の甲',
        career: 0,
        level: 65,
        pos: 3,
        attr: 7,
        group: 10026,
        make: 2,
        tips: '醉卧沙场君莫笑,古来征战几人回,以无数战场功勋凝聚而出的强大套装,激活后可获得大量属性加成。',
        make: {
            article: '1870-24',
            integral: 'exploit-1000',
            yuanbao: 4000
        },
    },
    13134: {
        n: '醉卧沙场の带',
        career: 0,
        level: 65,
        pos: 4,
        attr: 7,
        group: 10026,
        make: 2,
        tips: '醉卧沙场君莫笑,古来征战几人回,以无数战场功勋凝聚而出的强大套装,激活后可获得大量属性加成。',
        make: {
            article: '1874-24',
            integral: 'exploit-1000',
            yuanbao: 4000
        },
    },
    13135: {
        n: '醉卧沙场の靴',
        career: 0,
        level: 65,
        pos: 5,
        attr: 7,
        group: 10026,
        make: 2,
        tips: '醉卧沙场君莫笑,古来征战几人回,以无数战场功勋凝聚而出的强大套装,激活后可获得大量属性加成。',
        make: {
            article: '1878-24',
            integral: 'exploit-1000',
            yuanbao: 4000
        },
    },
    13136: {
        n: '天下无双の枪',
        career: 0,
        level: 80,
        pos: 1,
        attr: 10,
        group: 10027,
        make: 2,
        tips: '集无尽战场功勋打造而成的五大神器之一,持此任一件便可尽显无敌之姿,若集齐五件当成就天下至尊。',
        make: {
            article: '1864-72',
            integral: 'exploit-5000',
            yuanbao: 20000
        },
    },
    13137: {
        n: '天下无双の盔',
        career: 0,
        level: 80,
        pos: 2,
        attr: 10,
        group: 10027,
        make: 2,
        tips: '集无尽战场功勋打造而成的五大神器之一,持此任一件便可尽显无敌之姿,若集齐五件当成就天下至尊。',
        make: {
            article: '1868-72',
            integral: 'exploit-5000',
            yuanbao: 20000
        },
    },
    13138: {
        n: '天下无双の甲',
        career: 0,
        level: 80,
        pos: 3,
        attr: 10,
        group: 10027,
        make: 2,
        tips: '集无尽战场功勋打造而成的五大神器之一,持此任一件便可尽显无敌之姿,若集齐五件当成就天下至尊。',
        make: {
            article: '1872-72',
            integral: 'exploit-5000',
            yuanbao: 20000
        },
    },
    13139: {
        n: '天下无双の带',
        career: 0,
        level: 80,
        pos: 4,
        attr: 10,
        group: 10027,
        make: 2,
        tips: '集无尽战场功勋打造而成的五大神器之一,持此任一件便可尽显无敌之姿,若集齐五件当成就天下至尊。',
        make: {
            article: '1876-72',
            integral: 'exploit-5000',
            yuanbao: 20000
        },
    },
    13140: {
        n: '天下无双の靴',
        career: 0,
        level: 80,
        pos: 5,
        attr: 10,
        group: 10027,
        make: 2,
        tips: '集无尽战场功勋打造而成的五大神器之一,持此任一件便可尽显无敌之姿,若集齐五件当成就天下至尊。',
        make: {
            article: '1880-72',
            integral: 'exploit-5000',
            yuanbao: 20000
        },
    },
    13141: {
        n: '天定姻缘の杖',
        career: 0,
        level: 55,
        pos: 1,
        attr: 10,
        group: 10028,
        make: 4,
        tips: '你与对方乃是天定姻缘之人,成婚之日,就连上苍都送来了贺礼,蕴含着强大的力量。',
        make: {
            article: '18102-100',
            integral: 'world-500',
            yuanbao: 3000
        },
    },
    13142: {
        n: '天定姻缘の冠',
        career: 0,
        level: 55,
        pos: 2,
        attr: 10,
        group: 10028,
        make: 4,
        tips: '你与对方乃是天定姻缘之人,成婚之日,就连上苍都送来了贺礼,蕴含着强大的力量。',
        make: {
            article: '18102-100',
            integral: 'world-500',
            yuanbao: 3000
        },
    },
    13143: {
        n: '天定姻缘の甲',
        career: 0,
        level: 55,
        pos: 3,
        attr: 10,
        group: 10028,
        make: 4,
        tips: '你与对方乃是天定姻缘之人,成婚之日,就连上苍都送来了贺礼,蕴含着强大的力量。',
        make: {
            article: '18102-100',
            integral: 'world-500',
            yuanbao: 3000
        },
    },
    13144: {
        n: '天定姻缘の带',
        career: 0,
        level: 55,
        pos: 4,
        attr: 10,
        group: 10028,
        make: 4,
        tips: '你与对方乃是天定姻缘之人,成婚之日,就连上苍都送来了贺礼,蕴含着强大的力量。',
        make: {
            article: '18102-100',
            integral: 'world-500',
            yuanbao: 3000
        },
    },
    13145: {
        n: '天定姻缘の靴',
        career: 0,
        level: 55,
        pos: 5,
        attr: 10,
        group: 10028,
        make: 4,
        tips: '你与对方乃是天定姻缘之人,成婚之日,就连上苍都送来了贺礼,蕴含着强大的力量。',
        make: {
            article: '18102-100',
            integral: 'world-500',
            yuanbao: 3000
        },
    },
    13146: {
        n: '生死の相契の剑',
        career: 0,
        level: 70,
        pos: 1,
        attr: 10,
        group: 10029,
        make: 4,
        tips: '你与对方乃是天地姻缘之人,在无数岁月的见证下,你们再度向彼此许下不离不弃的诺言。',
        make: {
            article: '18102-200',
            integral: 'world-3000',
            yuanbao: 10000
        },
    },
    13147: {
        n: '生死の相契の冠',
        career: 0,
        level: 70,
        pos: 2,
        attr: 10,
        group: 10029,
        make: 4,
        tips: '你与对方乃是天地姻缘之人,在无数岁月的见证下,你们再度向彼此许下不离不弃的诺言。',
        make: {
            article: '18102-200',
            integral: 'world-3000',
            yuanbao: 10000
        },
    },
    13148: {
        n: '生死の相契の甲',
        career: 0,
        level: 70,
        pos: 3,
        attr: 10,
        group: 10029,
        make: 4,
        tips: '你与对方乃是天地姻缘之人,在无数岁月的见证下,你们再度向彼此许下不离不弃的诺言。',
        make: {
            article: '18102-200',
            integral: 'world-3000',
            yuanbao: 10000
        },
    },
    13149: {
        n: '生死の相契の带',
        career: 0,
        level: 70,
        pos: 4,
        attr: 10,
        group: 10029,
        make: 4,
        tips: '你与对方乃是天地姻缘之人,在无数岁月的见证下,你们再度向彼此许下不离不弃的诺言。',
        make: {
            article: '18102-200',
            integral: 'world-3000',
            yuanbao: 10000
        },
    },
    13150: {
        n: '生死の相契の靴',
        career: 0,
        level: 70,
        pos: 5,
        attr: 10,
        group: 10029,
        make: 4,
        tips: '你与对方乃是天地姻缘之人,在无数岁月的见证下,你们再度向彼此许下不离不弃的诺言。',
        make: {
            article: '18102-200',
            integral: 'world-3000',
            yuanbao: 10000
        },
    },
    13151: {
        n: '三生三世の剑',
        career: 0,
        level: 90,
        pos: 1,
        attr: 10,
        group: 10030,
        make: 4,
        tips: '你与对方乃是天地姻缘之人,长久陪伴之下感悟姻缘大道,当初上苍所赐之物沾染此道因果衍生出大道。',
        make: {
            article: '18102-500',
            integral: 'world-10000',
            yuanbao: 48000
        },
    },
    13152: {
        n: '三生三世の冠',
        career: 0,
        level: 90,
        pos: 2,
        attr: 10,
        group: 10030,
        make: 4,
        tips: '你与对方乃是天地姻缘之人,长久陪伴之下感悟姻缘大道,当初上苍所赐之物沾染此道因果衍生出大道。',
        make: {
            article: '18102-500',
            integral: 'world-10000',
            yuanbao: 48000
        },
    },
    13153: {
        n: '三生三世の甲',
        career: 0,
        level: 90,
        pos: 3,
        attr: 10,
        group: 10030,
        make: 4,
        tips: '你与对方乃是天地姻缘之人,长久陪伴之下感悟姻缘大道,当初上苍所赐之物沾染此道因果衍生出大道。',
        make: {
            article: '18102-500',
            integral: 'world-10000',
            yuanbao: 48000
        },
    },
    13154: {
        n: '三生三世の带',
        career: 0,
        level: 90,
        pos: 4,
        attr: 10,
        group: 10030,
        make: 4,
        tips: '你与对方乃是天地姻缘之人,长久陪伴之下感悟姻缘大道,当初上苍所赐之物沾染此道因果衍生出大道。',
        make: {
            article: '18102-500',
            integral: 'world-10000',
            yuanbao: 48000
        },
    },
    13155: {
        n: '三生三世の靴',
        career: 0,
        level: 90,
        pos: 5,
        attr: 10,
        group: 10030,
        make: 4,
        tips: '你与对方乃是天地姻缘之人,长久陪伴之下感悟姻缘大道,当初上苍所赐之物沾染此道因果衍生出大道。',
        make: {
            article: '18102-500',
            integral: 'world-10000',
            yuanbao: 48000
        },
    },
    13156: {
        n: '才子佳人の剑',
        career: 0,
        level: 77,
        pos: 1,
        attr: 8,
        group: 10031,
        integral: 1314,
        tips: '77级全职业活动套装,佩戴后可提供强大的属性加成,可以在神装活动内兑换成积分。'
    },
    13157: {
        n: '才子佳人の冠',
        career: 0,
        level: 77,
        pos: 2,
        attr: 8,
        group: 10031,
        integral: 1314,
        tips: '77级全职业活动套装,佩戴后可提供强大的属性加成,可以在神装活动内兑换成积分。'
    },
    13158: {
        n: '才子佳人の甲',
        career: 0,
        level: 77,
        pos: 3,
        attr: 8,
        group: 10031,
        integral: 1314,
        tips: '77级全职业活动套装,佩戴后可提供强大的属性加成,可以在神装活动内兑换成积分。'
    },
    13159: {
        n: '才子佳人の带',
        career: 0,
        level: 77,
        pos: 4,
        attr: 8,
        group: 10031,
        integral: 1314,
        tips: '77级全职业活动套装,佩戴后可提供强大的属性加成,可以在神装活动内兑换成积分。'
    },
    13160: {
        n: '才子佳人の靴',
        career: 0,
        level: 77,
        pos: 5,
        attr: 8,
        group: 10031,
        integral: 1314,
        tips: '77级全职业活动套装,佩戴后可提供强大的属性加成,可以在神装活动内兑换成积分。'
    },
    13161: {
        n: '君临天下の剑',
        career: 0,
        level: 99,
        pos: 1,
        attr: 10,
        group: 10032,
        integral: 3344,
        tips: '99级全职业活动套装,佩戴后可提供强大的属性加成,可以在神装活动内兑换成积分。'
    },
    13162: {
        n: '君临天下の冠',
        career: 0,
        level: 99,
        pos: 2,
        attr: 10,
        group: 10032,
        integral: 3344,
        tips: '99级全职业活动套装,佩戴后可提供强大的属性加成,可以在神装活动内兑换成积分。'
    },
    13163: {
        n: '君临天下の甲',
        career: 0,
        level: 99,
        pos: 3,
        attr: 10,
        group: 10032,
        integral: 3344,
        tips: '99级全职业活动套装,佩戴后可提供强大的属性加成,可以在神装活动内兑换成积分。'
    },
    13164: {
        n: '君临天下の带',
        career: 0,
        level: 99,
        pos: 4,
        attr: 10,
        group: 10032,
        integral: 3344,
        tips: '99级全职业活动套装,佩戴后可提供强大的属性加成,可以在神装活动内兑换成积分。'
    },
    13165: {
        n: '君临天下の靴',
        career: 0,
        level: 99,
        pos: 5,
        attr: 10,
        group: 10032,
        integral: 3344,
        tips: '99级全职业活动套装,佩戴后可提供强大的属性加成,可以在神装活动内兑换成积分。'
    },
    13166: {
        n: '海誓山盟の戒',
        career: 0,
        level: 35,
        pos: 6,
        attr: 7,
        group: 10033,
        make: 1,
        tips: '消耗世界声望打造的35级海誓山盟首饰套装,激活后可获得大量属性加成。',
        make: {
            article: '1881-12',
            integral: 'world-300',
            yuanbao: 700
        },
    },
    13167: {
        n: '海誓山盟の项链',
        career: 0,
        level: 35,
        pos: 7,
        attr: 7,
        group: 10033,
        make: 1,
        tips: '消耗世界声望打造的35级海誓山盟首饰套装,激活后可获得大量属性加成。',
        make: {
            article: '1885-12',
            integral: 'world-300',
            yuanbao: 700
        },
    },
    13168: {
        n: '吉祥如意の戒',
        career: 0,
        level: 55,
        pos: 6,
        attr: 5,
        group: 10034,
        make: 1,
        tips: '消耗世界声望打造的55级吉祥如意首饰套装,激活后可获得大量属性加成。',
        make: {
            article: '1882-24',
            integral: 'world-800',
            yuanbao: 1800
        },
    },
    13169: {
        n: '吉祥如意の项链',
        career: 0,
        level: 55,
        pos: 7,
        attr: 5,
        group: 10034,
        make: 1,
        tips: '消耗世界声望打造的55级吉祥如意首饰套装,激活后可获得大量属性加成。',
        make: {
            article: '1886-24',
            integral: 'world-800',
            yuanbao: 1800
        },
    },
    13170: {
        n: '造化五行の戒',
        career: 0,
        level: 70,
        pos: 6,
        attr: 5,
        group: 10035,
        make: 1,
        tips: '消耗世界声望打造的70级造化五行首饰套装,激活后可获得大量属性加成。',
        make: {
            article: '1883-36',
            integral: 'world-2000',
            yuanbao: 5000
        },
    },
    13171: {
        n: '造化五行の项链',
        career: 0,
        level: 70,
        pos: 7,
        attr: 5,
        group: 10035,
        make: 1,
        tips: '消耗世界声望打造的70级造化五行首饰套装,激活后可获得大量属性加成。',
        make: {
            article: '1887-36',
            integral: 'world-2000',
            yuanbao: 5000
        },
    },
    13172: {
        n: '不死不灭の戒',
        career: 0,
        level: 70,
        pos: 6,
        attr: 10,
        group: 10036,
        make: 2,
        tips: '消耗世界功勋打造的70级不死不灭首饰套装,激活后可获得大量属性加成。',
        make: {
            article: '1883-36',
            integral: 'exploit-2000',
            yuanbao: 10000
        },
    },
    13173: {
        n: '不死不灭の项链',
        career: 0,
        level: 70,
        pos: 7,
        attr: 10,
        group: 10036,
        make: 2,
        tips: '消耗世界功勋打造的70级不死不灭首饰套装,激活后可获得大量属性加成。',
        make: {
            article: '1887-36',
            integral: 'exploit-2000',
            yuanbao: 10000
        },
    },
    13174: {
        n: '幽冥碧落の戒',
        career: 0,
        level: 80,
        pos: 6,
        attr: 7,
        group: 10037,
        tips: '消耗世界声望打造的80级幽冥碧落首饰套装,激活后可获得大量属性加成。',
        make: {
            article: '1884-72',
            integral: 'world-5000',
            yuanbao: 12000
        },
    },
    13175: {
        n: '幽冥碧落の项链',
        career: 0,
        level: 80,
        pos: 7,
        attr: 7,
        group: 10037,
        tips: '消耗世界声望打造的80级幽冥碧落首饰套装,激活后可获得大量属性加成。',
        make: {
            article: '1888-72',
            integral: 'world-5000',
            yuanbao: 12000
        },
    },
    13176: {
        n: '诸神黄昏の戒',
        career: 0,
        level: 90,
        pos: 6,
        attr: 7,
        group: 10038,
        tips: '消耗世界声望打造的90级诸神黄昏首饰套装,激活后可获得大量属性加成。',
        make: {
            article: '18100-108',
            integral: 'world-8000',
            yuanbao: 20000
        },
    },
    13177: {
        n: '诸神黄昏の项链',
        career: 0,
        level: 90,
        pos: 7,
        attr: 7,
        group: 10038,
        tips: '消耗世界声望打造的90级诸神黄昏首饰套装,激活后可获得大量属性加成。',
        make: {
            article: '18100-108',
            integral: 'world-8000',
            yuanbao: 20000
        },
    },
    13178: {
        n: '大道同源の戒',
        career: 0,
        level: 99,
        pos: 6,
        attr: 7,
        group: 10039,
        tips: '消耗世界声望打造的99级大道同源首饰套装,激活后可获得大量属性加成。',
        make: {
            article: '18101-108',
            integral: 'world-15000',
            yuanbao: 35000
        },
    },
    13179: {
        n: '大道同源の项链',
        career: 0,
        level: 99,
        pos: 7,
        attr: 7,
        group: 10039,
        tips: '消耗世界声望打造的99级大道同源首饰套装,激活后可获得大量属性加成。',
        make: {
            article: '18101-108',
            integral: 'world-15000',
            yuanbao: 35000
        },
    },
    13180: {
        n: '九歌の戒',
        career: 0,
        level: 50,
        pos: 6,
        attr: 10,
        group: 10040,
        integral: 199,
        tips: '50级活动首饰套装,佩戴后可提供强大的属性加成,可以在神装活动内兑换成积分。'
    },
    13181: {
        n: '断魂の项链',
        career: 0,
        level: 50,
        pos: 7,
        attr: 10,
        group: 10040,
        integral: 199,
        tips: '50级活动首饰套装,佩戴后可提供强大的属性加成,可以在神装活动内兑换成积分。'
    },
    13182: {
        n: '上善若水の戒',
        career: 0,
        level: 99,
        pos: 6,
        attr: 10,
        group: 10041,
        integral: 3344,
        tips: '99级活动首饰套装,佩戴后可提供强大的属性加成,可以在神装活动内兑换成积分。'
    },
    13183: {
        n: '上善若水の项链',
        career: 0,
        level: 99,
        pos: 7,
        attr: 10,
        group: 10041,
        integral: 3344,
        tips: '99级活动首饰套装,佩戴后可提供强大的属性加成,可以在神装活动内兑换成积分。'
    },
    13184: {
        n: '嗜血枪',
        career: 0,
        level: 66,
        pos: 8,
        attr: 10,
        group: 10042,
        customAttr: ['atk_min', 'atk_max'],
        tips: '强大的法宝,拥有极致的毁灭力量,可消耗大量世界声望锻造也可通过某些奇遇获得。',
        make: {
            integral: 'world-1000',
            yuanbao: 2400
        },
    },
    13185: {
        n: '水月镜',
        career: 0,
        level: 66,
        pos: 9,
        attr: 10,
        group: 10042,
        customAttr: ['dfs_min', 'dfs_max'],
        tips: '强大的法宝,极致的防御力量,可消耗大量世界声望锻造也可通过某些奇遇获得。',
        make: {
            integral: 'world-1000',
            yuanbao: 2400
        },
    },
    13186: {
        n: '破空枪[冰]',
        career: 0,
        level: 66,
        pos: 8,
        attr: 5,
        group: 10043,
        customAttr: ['ice_atk_min', 'ice_atk_max'],
        tips: '强大的元素法宝,可对敌人造成大量的冰元素伤害。',
        make: {
            integral: 'world-1500',
            yuanbao: 3600
        },
    },
    13187: {
        n: '破空枪[雷]',
        career: 0,
        level: 66,
        pos: 8,
        attr: 5,
        group: 10044,
        customAttr: ['mine_atk_min', 'mine_atk_max'],
        tips: '强大的元素法宝,可对敌人造成大量的雷元素伤害。',
        make: {
            integral: 'world-1500',
            yuanbao: 3600
        },
    },
    13188: {
        n: '破空枪[风]',
        career: 0,
        level: 66,
        pos: 8,
        attr: 5,
        group: 10045,
        customAttr: ['wind_atk_min', 'wind_atk_max'],
        tips: '强大的元素法宝,可对敌人造成大量的风元素伤害。',
        make: {
            integral: 'world-1500',
            yuanbao: 3600
        },
    },
    13189: {
        n: '破空枪[水]',
        career: 0,
        level: 66,
        pos: 8,
        attr: 5,
        group: 10046,
        customAttr: ['water_atk_min', 'water_atk_max'],
        tips: '强大的元素法宝,可对敌人造成大量的水元素伤害。',
        make: {
            integral: 'world-1500',
            yuanbao: 3600
        },
    },
    13190: {
        n: '破空枪[火]',
        career: 0,
        level: 66,
        pos: 8,
        attr: 5,
        group: 10047,
        customAttr: ['fire_atk_min', 'fire_atk_max'],
        tips: '强大的元素法宝,可对敌人造成大量的火元素伤害。',
        make: {
            integral: 'world-1500',
            yuanbao: 3600
        },
    },
    13191: {
        n: '鬼脸镜[冰]',
        career: 0,
        level: 66,
        pos: 8,
        attr: 5,
        group: 10043,
        customAttr: ['ice_dfs_min', 'ice_dfs_max'],
        tips: '强大的元素法宝,可对敌人造成大量的冰元素防御。',
        make: {
            integral: 'world-1500',
            yuanbao: 3600
        },
    },
    13192: {
        n: '鬼脸镜[雷]',
        career: 0,
        level: 66,
        pos: 8,
        attr: 5,
        group: 10044,
        customAttr: ['mine_dfs_min', 'mine_dfs_max'],
        tips: '强大的元素法宝,可对敌人造成大量的雷元素防御。',
        make: {
            integral: 'world-1500',
            yuanbao: 3600
        },
    },
    13193: {
        n: '鬼脸镜[风]',
        career: 0,
        level: 66,
        pos: 8,
        attr: 5,
        group: 10045,
        customAttr: ['wind_dfs_min', 'wind_dfs_max'],
        tips: '强大的元素法宝,可对敌人造成大量的风元素防御。',
        make: {
            integral: 'world-1500',
            yuanbao: 3600
        },
    },
    13194: {
        n: '鬼脸镜[水]',
        career: 0,
        level: 66,
        pos: 8,
        attr: 5,
        group: 10046,
        customAttr: ['water_dfs_min', 'water_dfs_max'],
        tips: '强大的元素法宝,可对敌人造成大量的水元素防御。',
        make: {
            integral: 'world-1500',
            yuanbao: 3600
        },
    },
    13195: {
        n: '鬼脸镜[火]',
        career: 0,
        level: 66,
        pos: 8,
        attr: 5,
        group: 10047,
        customAttr: ['fire_dfs_min', 'fire_dfs_max'],
        tips: '强大的元素法宝,可对敌人造成大量的火元素防御。',
        make: {
            integral: 'world-1500',
            yuanbao: 3600
        },
    },
    13196: {
        n: '五法霹雳珠[冰]',
        career: 0,
        level: 75,
        pos: 8,
        attr: 7,
        group: 10048,
        customAttr: ['ice_atk_min', 'ice_atk_max'],
        tips: '强大的元素法宝,可对敌人造成大量的冰元素伤害。',
        make: {
            integral: 'world-4800',
            yuanbao: 12000
        },
    },
    13197: {
        n: '五法霹雳珠[雷]',
        career: 0,
        level: 75,
        pos: 8,
        attr: 7,
        group: 10049,
        customAttr: ['mine_atk_min', 'mine_atk_max'],
        tips: '强大的元素法宝,可对敌人造成大量的雷元素伤害。',
        make: {
            integral: 'world-4800',
            yuanbao: 12000
        },
    },
    13198: {
        n: '五法霹雳珠[风]',
        career: 0,
        level: 75,
        pos: 8,
        attr: 7,
        group: 10050,
        customAttr: ['wind_atk_min', 'wind_atk_max'],
        tips: '强大的元素法宝,可对敌人造成大量的风元素伤害。',
        make: {
            integral: 'world-4800',
            yuanbao: 12000
        },
    },
    13199: {
        n: '五法霹雳珠[水]',
        career: 0,
        level: 75,
        pos: 8,
        attr: 7,
        group: 10051,
        customAttr: ['water_atk_min', 'water_atk_max'],
        tips: '强大的元素法宝,可对敌人造成大量的水元素伤害。',
        make: {
            integral: 'world-4800',
            yuanbao: 12000
        },
    },
    13200: {
        n: '五法霹雳珠[火]',
        career: 0,
        level: 75,
        pos: 8,
        attr: 7,
        group: 10052,
        customAttr: ['fire_atk_min', 'fire_atk_max'],
        tips: '强大的元素法宝,可对敌人造成大量的火元素伤害。',
        make: {
            integral: 'world-4800',
            yuanbao: 12000
        },
    },
    13201: {
        n: '五法乾坤袋[冰]',
        career: 0,
        level: 75,
        pos: 8,
        attr: 7,
        group: 10048,
        customAttr: ['ice_dfs_min', 'ice_dfs_max'],
        tips: '强大的元素法宝,可对敌人造成大量的冰元素防御。',
        make: {
            integral: 'world-4800',
            yuanbao: 12000
        },
    },
    13202: {
        n: '五法乾坤袋[雷]',
        career: 0,
        level: 75,
        pos: 8,
        attr: 7,
        group: 10049,
        customAttr: ['mine_dfs_min', 'mine_dfs_max'],
        tips: '强大的元素法宝,可对敌人造成大量的雷元素防御。',
        make: {
            integral: 'world-4800',
            yuanbao: 12000
        },
    },
    13203: {
        n: '五法乾坤袋[风]',
        career: 0,
        level: 75,
        pos: 8,
        attr: 7,
        group: 10050,
        customAttr: ['wind_dfs_min', 'wind_dfs_max'],
        tips: '强大的元素法宝,可对敌人造成大量的风元素防御。',
        make: {
            integral: 'world-4800',
            yuanbao: 12000
        },
    },
    13204: {
        n: '五法乾坤袋[水]',
        career: 0,
        level: 75,
        pos: 8,
        attr: 7,
        group: 10051,
        customAttr: ['water_dfs_min', 'water_dfs_max'],
        tips: '强大的元素法宝,可对敌人造成大量的水元素防御。',
        make: {
            integral: 'world-4800',
            yuanbao: 12000
        },
    },
    13205: {
        n: '五法乾坤袋[火]',
        career: 0,
        level: 75,
        pos: 8,
        attr: 7,
        group: 10052,
        customAttr: ['fire_dfs_min', 'fire_dfs_max'],
        tips: '强大的元素法宝,可对敌人造成大量的火元素防御。',
        make: {
            integral: 'world-4800',
            yuanbao: 12000
        },
    },
    13206: {
        n: '山河社稷の图',
        career: 0,
        level: 90,
        pos: 8,
        attr: 20,
        group: 10053,
        customAttr: ['life_max', 'mana_max'],
        tips: '传说此图内有天地，滋养天人，拥有此法宝者可化生万物，法力浩荡。',
        make: {
            article: '18101-180',
            integral: 'world-10000',
            yuanbao: 24000
        },
    },
    13207: {
        n: '九纹大道の钟',
        career: 0,
        level: 90,
        pos: 8,
        attr: 20,
        group: 10053,
        customAttr: ['atk_min', 'atk_max', 'dfs_min', 'dfs_max'],
        tips: '传说此法宝先与天地诞生之前便以存在,蕴含混沌之力,完美无缺。',
        make: {
            article: '18101-180',
            integral: 'world-10000',
            yuanbao: 24000
        },
    },
    13208: {
        n: '青莲造化の盏',
        career: 0,
        level: 99,
        pos: 8,
        attr: 10,
        group: 10054,
        integral: 3344,
        customAttr: ['ice_atk_min', 'ice_atk_max', 'mine_atk_min', 'mine_atk_max', 'wind_atk_min', 'wind_atk_max', 'water_atk_min', 'water_atk_max', 'fire_atk_min', 'fire_atk_max'],
        tips: '据说乃是一株青莲所化的古灯,无人知晓其来历,神秘无比,可化万千大道。',
        make: {
            article: '18101-320',
            integral: 'world-15000',
            yuanbao: 36000
        },
    },
    13209: {
        n: '大道轮回の印',
        career: 0,
        level: 99,
        pos: 8,
        attr: 10,
        group: 10054,
        integral: 3344,
        customAttr: ['ice_dfs_min', 'ice_dfs_max', 'mine_dfs_min', 'mine_dfs_max', 'wind_dfs_min', 'wind_dfs_max', 'water_dfs_min', 'water_dfs_max', 'fire_dfs_min', 'fire_dfs_max'],
        tips: '据说持此印者,乃大道所定之人,承载了无尽因果,可包容万物。',
        make: {
            article: '18101-320',
            integral: 'world-15000',
            yuanbao: 36000
        },
    },
    13210: {
        n: '月华相思の戒',
        career: 0,
        level: 99,
        pos: 6,
        attr: 10,
        group: 10055,
        integral: 3344,
        tips: '99级活动首饰套装,佩戴后可提供强大的属性加成,可以在神装活动内兑换成积分。'
    },
    13211: {
        n: '月华相思の项链',
        career: 0,
        level: 99,
        pos: 7,
        attr: 10,
        group: 10055,
        integral: 3344,
        tips: '99级活动首饰套装,佩戴后可提供强大的属性加成,可以在神装活动内兑换成积分。'
    },
    13212: {
        n: '玄炎戒',
        career: 0,
        level: 25,
        pos: 6,
        attr: 1,
        tips: '蕴含一缕奇异火焰的戒指，佩戴后可获得大幅度增加命中。'
    },
    13213: {
        n: '青木镯',
        career: 0,
        level: 25,
        pos: 7,
        attr: 1,
        tips: '使用青木所铸造的手镯，佩戴后可获得极端的毁灭。'
    },
    13214: {
        n: '紫气戒',
        career: 0,
        level: 10,
        pos: 6,
        attr: 1,
        tips: '每日初晨采集紫霞之气,足足七七四十九日方铸造而成的戒指。'
    },
    13215: {
        n: '紫气镯',
        career: 0,
        level: 10,
        pos: 7,
        attr: 1,
        tips: '每日初晨采集紫霞之气,足足七七四十九日方铸造而成的手镯。'
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
            id
        }))
    },


}

