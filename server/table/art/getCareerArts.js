module.exports = {
    getCareerArts: function (career) {
        // 根据职业获取技能集
        const arts = [4, 8, 9, 10, 11, 12, 13, 14];
        if (career % 3 === 1) {
            return [1, 5, ...arts];
        }
        if (career % 3 === 2) {
            return [2, 6, ...arts];
        }
        return [3, 7, ...arts];
    }
}