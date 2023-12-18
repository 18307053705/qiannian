module.exports = {
    /**
     * 计算宠物属性
     * @param {*} potential 潜力
     * @returns attr
     */
    computePotentialAttr: function (potential) {
        const attr = {};
        if (potential.ti_zhi) {
            attr.life += potential.ti_zhi * 100;
            attr.life_max += potential.ti_zhi * 100;
        }
        if (potential.ti_zhi) {
            attr.life += potential.ti_zhi * 100;
            attr.max_life += potential.ti_zhi * 100;
        }
        if (potential.bi_li) {
            attr.atk_max += potential.bi_li * 12;
            attr.atk_min += potential.bi_li * 8;
        }
        if (potential.bi_li) {
            attr.atk_max += potential.bi_li * 12;
            attr.atk_min += potential.bi_li * 8;
        }
        if (potential.nai_li) {
            attr.dfs_max += potential.nai_li * 5;
            attr.dfs_min += potential.nai_li * 4;
        }
        if (potential.shen_fa) {
            attr.hit += potential.shen_fa * 3;
            attr.dodge += potential.shen_fa * 2;
            attr.sudden += potential.shen_fa * 2;
        }
        return attr;
    }
}