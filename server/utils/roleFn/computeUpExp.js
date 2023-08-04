module.exports = {
    /**
     * 计算升级所需经验
     * @param {*} level 当前等级 
     * @returns {number} exp
     * 
     */
    computeUpExp: function (level) {
        switch (parseInt(level / 10)) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
                return 100 * (10 ** parseInt(level / 10)) * (level % 10 + 1);
            case 5:
                return 10000000 + (level % 10 + 1) * 5000000;
            case 6:
                return 50000000 + (level % 10 + 1) * 5000000;
            case 7:
                return 100000000 + (level % 10 + 1) * 10000000;
            case 8:
                return 300000000 + (level % 10 + 1) * 20000000;
            case 9:
                return 500000000 + (level % 10 + 1) * 50000000;
            default:
                return 1000000000 + (level % 10 + 1) * 500000000;
        }
    }
};
