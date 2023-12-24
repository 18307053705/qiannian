const { ArtSystem } = require('@/system');
const { getPetRating } = require('./getPetRating');

module.exports = {
    /**
     * 获取宠物技能
     * @param {*} flair_x 先天资质
     * @param {*} id 技能id，可选，默认根据资质生成[15,16,17,18]
     */
    getPetArt: function (flair_x, id) {
        let artId = id;
        if (!artId) {
            const tianFu = [56, 57, 58, 59];
            artId = flair_x < 75 ? tianFu[0] : tianFu[Math.floor(Math.random() * 3) + 1];
        }
        const rating = getPetRating(flair_x);
        // 天赋技能
        const { v, n, effect, p, effectValue } = ArtSystem.getArt(artId);
        const talentArt = {
            id: artId,
            n,
            v: v[rating],
            p
        }
        if (effect) {
            talentArt['e'] = `${effect}-${effectValue[rating]}`;
        }
        const art = [talentArt];
        const artIds = [60, 49, 50, 51, 52, 53, 54, 55];
        artIds.forEach((id) => {
            const { p, n, v } = ArtSystem.getArt(id);
            const itme = {
                id,
                p,
                n,
                l: 0,
                r: 0,
                v,
            }
            art.push(itme);
        });

        return art;
    },
}