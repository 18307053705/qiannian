module.exports = {
    /**
     * 获取宠物星级加成
     * @param {*} flair_x x先天资质
     */
    getPetRating: function (flair_x) {
        // 1:0-29 2:30-49 3:50-69 4:70-79 5:80-89 7:90-99 10:100
        switch (parseInt(flair_x / 10)) {
            case 3:
            case 4:
                return 2;
            case 5:
            case 6:
                return 3;
            case 7:
                return 4;
            case 8:
                return 5;
            case 9:
                return 7;
            case 10:
            case 11:
                return 10 + ((flair_x - 100) * 0.5);
            case 12:
                return 25 + (flair_x - 100);
            default:
                return 1;
        }
    },
}