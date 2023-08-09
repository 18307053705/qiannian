module.exports = {
    /**
     * 计算技能等级与转数
     * @param {*} l 等级
     * @param {*} r 转数
     * @return l 升级后等级
     * @return r 升级后转数
     * @return p 升级类型l,r
     */
    artLevelCompute: function (l, r) {
        if (r === 0) {
            return l === 13 ? { l, r: r + 1, p: 'r' } : { l: l + 1, r, p: 'l' };
        }
        if (r === 1) {
            return l === 32 ? { l, r: r + 1, p: 'r' } : { l: l + 1, r, p: 'l' };
        }
        if (r === 2) {
            return l === 50 ? { l, r: r + 1, p: 'r' } : { l: l + 1, r, p: 'l' };
        }
        if (r === 3) {
            return l === 70 ? { l, r: r + 1, p: 'r' } : { l: l + 1, r, p: 'l' };
        }
        if (r === 4) {
            return l === 80 ? { l, r: r + 1, p: 'r' } : { l: l + 1, r, p: 'l' };
        }
        if (r === 5) {
            return l === 90 ? { l, r: r + 1, p: 'r' } : { l: l + 1, r, p: 'l' };
        }
        if (r === 6) {
            return l === 100 ? { l, r: r + 1, p: 'r' } : { l: l + 1, r, p: 'l' };
        }
        // 七转便是极限
        if (r === 7) {
            return undefined;
        }
       
    }
};
