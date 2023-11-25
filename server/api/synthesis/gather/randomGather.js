function randomId(LevelIds, level) {
    console.log(LevelIds,'LevelIds..')
    const index = Math.floor(Math.random() * LevelIds[level].length);
    return {
        id: LevelIds[level][index].id,
    };
}


module.exports = {
    randomGather: function (LevelIds, address) {
        const rate = Math.floor(Math.random() * 100) + 1;
        // 一层
        if ('60006,0,0' === address) {
            // 百分之1概率 稀有材料
            if (rate === 100) {
                return randomId(LevelIds, 100);
            }
            // 百分之1概率 一阶材料
            if (rate === 1) {
                return randomId(LevelIds, 1);
            }
            return randomId(LevelIds, 0);
        }
        // 二层
        if ('60006,0,1' === address) {
            // 百分之1概率 稀有材料
            if (rate === 100) {
                return randomId(LevelIds, 100);
            }
            // 百分之1概率 二阶材料
            if (rate === 1) {
                return randomId(LevelIds, 2);
            }
            // 百分之9概率 一阶材料
            if (rate < 100 && rate >= 90) {
                return randomId(LevelIds, 1);
            }
            // 百分之10概率遇怪
            if (rate < 90 && rate >= 80) {
                return { type: 1, id: 20629 };
            }
            return randomId(LevelIds, 0);
        }
        // 三层
        if ('60006,0,2' === address) {
            // 百分之2概率 稀有材料
            if (rate >= 99) {
                return randomId(LevelIds, 100);
            }
            // 百分之1概率 三阶材料
            if (rate === 1) {
                return randomId(LevelIds, 3);
            }
            // 百分之9概率 二阶材料
            if (rate > 1 && rate < 10) {
                return randomId(LevelIds, 2);
            }
            // 百分之13概率 一阶材料
            if (rate < 99 && rate >= 85) {
                return randomId(LevelIds, 1);
            }
            // 百分之10概率遇怪
            if (rate < 85 && rate >= 70) {
                return { type: 1, id: 20630 };
            }
            return randomId(LevelIds, 0);
        }
        // 四层
        if ('60006,0,3' === address) {
            // 百分之3概率 稀有材料
            if (rate >= 98) {
                return randomId(LevelIds, 100);
            }
            // 百分之1概率 四阶材料
            if (rate === 1) {
                return randomId(LevelIds, 4);
            }
            // 百分之9概率 三阶材料
            if (rate > 1 && rate < 10) {
                return randomId(LevelIds, 3);
            }
            // 百分之13概率 二阶材料
            if (rate < 99 && rate >= 85) {
                return randomId(LevelIds, 2);
            }
            // 百分之20概率 一阶材料
            if (rate < 85 && rate >= 65) {
                return randomId(LevelIds, 1);
            }
            // 百分之10概率遇怪
            if (rate < 65 && rate >= 50) {
                return { type: 1, id: 20631 };
            }
            return randomId(LevelIds, 0);
        }
        // 五层
        if ('60006,0,4' === address) {
            // 百分之3概率 稀有材料
            if (rate >= 97) {
                return randomId(LevelIds, 100);
            }
            // 百分之1概率 五阶材料
            if (rate === 1) {
                return randomId(LevelIds, 5);
            }
            // 百分之9概率 四阶材料
            if (rate > 1 && rate < 10) {
                return randomId(LevelIds, 4);
            }
            // 百分之13概率 三阶材料
            if (rate < 99 && rate >= 85) {
                return randomId(LevelIds, 3);
            }
            // 百分之20概率 二阶材料
            if (rate < 85 && rate >= 65) {
                return randomId(LevelIds, 2);
            }
            // 百分之30概率 一阶材料
            if (rate < 65 && rate >= 35) {
                return randomId(LevelIds, 1);
            }
            // 百分之10概率遇怪
            if (rate < 35 && rate >= 25) {
                return { type: 1, id: 20632 };
            }
            return randomId(LevelIds, 0);
        }
        // 六层
        if ('60006,0,5' === address) {
            // 百分之4概率 稀有材料
            if (rate >= 96) {
                return randomId(LevelIds, 100);
            }
            // 百分之1概率 六阶材料
            if (rate === 1) {
                return randomId(LevelIds, 6);
            }
            // 百分之9概率 五阶材料
            if (rate > 1 && rate < 10) {
                return randomId(LevelIds, 5);
            }
            // 百分之13概率 四阶材料
            if (rate < 99 && rate >= 85) {
                return randomId(LevelIds, 4);
            }
            // 百分之20概率 三阶材料
            if (rate < 85 && rate >= 65) {
                return randomId(LevelIds, 3);
            }
            // 百分之30概率 二阶材料
            if (rate < 65 && rate >= 35) {
                return randomId(LevelIds, 2);
            }
            // 百分之10概率遇怪
            if (rate < 35 && rate >= 25) {
                return { type: 1, id: 20632 };
            }
            return randomId(LevelIds, 1);
        }
        // 七层
        if ('60006,0,6' === address) {
            // 百分之5概率 稀有材料
            if (rate >= 95) {
                return randomId(LevelIds, 100);
            }
            // 百分之1概率 七阶材料
            if (rate === 1) {
                return randomId(LevelIds, 7);
            }
            // 百分之9概率 六阶材料
            if (rate > 1 && rate < 10) {
                return randomId(LevelIds, 6);
            }
            // 百分之9概率 五阶材料
            if (rate < 99 && rate >= 90) {
                return randomId(LevelIds, 5);
            }
            // 百分之15概率 四阶材料
            if (rate < 90 && rate >= 75) {
                return randomId(LevelIds, 4);
            }
            // 百分之20概率 三阶材料
            if (rate < 75 && rate >= 55) {
                return randomId(LevelIds, 3);
            }
            // 百分之30概率 二阶材料
            if (rate < 55 && rate >= 25) {
                return randomId(LevelIds, 2);
            }
            // 百分之5概率遇怪
            if (rate < 25 && rate >= 20) {
                return { type: 1, id: 20633 };
            }
            return randomId(LevelIds, 1);
        }
    }
}
