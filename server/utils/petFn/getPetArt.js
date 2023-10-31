const { ArtTable } = require('../../table');
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
            artId = flair_x < 75 ? 18 : Math.floor(Math.random() * (18 - 15)) + 15;
        }

        const rating = getPetRating(flair_x);
        // 天赋技能
        const { v, n, effect, p } = ArtTable.getArt(artId);
        const talentArt = {
            id: artId,
            n,
            v: v * rating,
            p
        }
        if (effect) {
            const [key, value] = effect.split('-');
            talentArt['e'] = `${key}-${value * rating}`;
        }
        const art = [talentArt];
        // 附体技能
        const petArt = ArtTable.getArt(19);
        art.push({
            id,
            p: petArt.p,
            n: petArt.n,
            l: 0,
            r: 0,
            v: petArt.v,
        });
        // 天赋被动
        const artIds = [8, 9, 10, 11, 12, 13, 14];
        artIds.forEach((id) => {
            const { p, n, v } = ArtTable.getArt(id);
            const itme = {
                id,
                p,
                n,
                l: -1,
                r: 0,
                v,
            }
            art.push(itme);
        });

        return art;
    },
}