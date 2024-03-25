module.exports = {
    /**
     * 计算伤害
     * @param attr1 进攻属性
     * @param attr2 防御属性
     * @param rise 伤害加成,默认100
     * @returns dps 伤害
     */
    computeFightDps: function (attr1, attr2, rise = 100) {
        const { atk, ice_atk = 0, mine_atk = 0, wind_atk = 0, water_atk = 0, fire_atk = 0, hit, sudden: sudden1 } = attr1;
        const { dfs, ice_dfs = 0, mine_dfs = 0, wind_dfs = 0, water_dfs = 0, fire_dfs = 0, dodge, sudden: sudden2 } = attr2;
        let isHit = hit >= dodge;
        // 闪避计算
        if (!isHit) {
            // 每多出100点 + 1%概率 闪避超过命中默认10闪避
            const rate = (dodge - hit) / 100 + 10;
            // 随机1-100的值，如果大于闪避值则命中
            isHit = Math.floor(Math.random() * (100 - 1)) + 1 > rate;
        }
        let dps = 0;
        let eleDps = 0;
        if (isHit) {
            dps = (atk - dfs) * (rise / 100);
            let rate = 10;
            let sudden = 100;
            eleDps += ice_atk - ice_dfs;
            eleDps += mine_atk - mine_dfs;
            eleDps += wind_atk - wind_dfs;
            eleDps += water_atk - water_dfs;
            eleDps += fire_atk - fire_dfs;
            if (eleDps > 0) {
                dps = dps > 0 ? dps + eleDps : eleDps;
            }
            if (sudden1 < 3000) {
                rate += sudden1 / 150;
            } else if (sudden1 < 10000) {
                rate += (sudden1 - 3000) / 350 + 15;
            } else if (sudden1 < 50000) {
                rate += (sudden1 - 10000) / 1300 + 45
            } else {
                rate += (sudden1 - 50000) / 5000 + 75
            }
            const isSudden = Math.floor(Math.random() * (100 - 1)) + 1 < rate;
            // 暴击
            if (isSudden) {
                sudden = 200;
                const diff = (sudden1 - sudden2) / 500;
                if (diff > 100) {
                    sudden += 100
                } else if (diff < -50) {
                    sudden -= 50
                } else {
                    sudden += diff;
                }
            }

            dps = parseInt(dps * sudden / 100);
        }
        return dps < 0 ? 0 : dps
    },

};
