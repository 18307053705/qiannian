module.exports = {
    /**
     * 根据职业获取技能iD集
     * @param {*} career 
     * @returns ids[]
     */
    getCareerArts: function (career) {
        // 法皇
        if (career === 1) {
            return [1, 10, 19, 28, 29, 30, 31, 32, 33, 34];
        }
        // 战尊
        if (career === 2) {
            return [4, 13, 22, 28, 29, 30, 31, 32, 33, 34];
        }
        // 羽圣
        if (career === 3) {
            return [7, 16, 25, 28, 29, 30, 31, 32, 33, 34];
        }
        // 血煞
        if (career === 4) {
            return [3, 12, 21, 42, 43, 44, 45, 46, 47, 48];
        }
        // 战狂
        if (career === 5) {
            return [6, 15, 24, 42, 43, 44, 45, 46, 47, 48];
        }
        // 赤魅
        if (career === 6) {
            return [9, 18, 27, 42, 43, 44, 45, 46, 47, 48];
        }
        // 星君
        if (career === 7) {
            return [2, 11, 20, 35, 36, 37, 38, 39, 40, 41];
        }
        // 战神
        if (career === 8) {
            return [5, 14, 23, 35, 36, 37, 38, 39, 40, 41];
        }
        // 剑仙
        if (career === 9) {
            return [8, 17, 26, 35, 36, 37, 38, 39, 40, 41];
        }

    }
}