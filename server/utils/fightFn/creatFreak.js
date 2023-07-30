const { AttributeTable } = require("../../table");
module.exports = {
    /**
     * 创建怪物
     * @param {*} req 
     * @param {*} res 
     * @param {*} freak 怪物模板
     * @returns {*} rival 对手信息
     */
    creatFreak: function (req, res, freak) {
        console.log(freak,'freak...')
        const { name, ext } = freak;
        const { career, level, attr, boss } = ext;
    
        const attrs = AttributeTable.getFreakBaseAttr(career);
        const addition = level * attr;
        Object.keys(attrs).forEach((key) => {
            if (key == 'life' || key == 'mana') {
                attrs[key] *= addition * (boss ? 100 : 1);
                attrs[`${key}_max`] = attrs[key];
                return;
            }
            attrs[key] *= addition;
        });
        // boss只有一个,非boss存在多个
        let num = Math.floor(Math.random() * ((boss ? 1 : 5) - 1)) + 1;
        if (level < 20) {
            num = 1;
        }
        const rival = [];
        for (num; 0 < num; num--) {
            rival.push({
                attr: { ...attrs },
                name
            })
        }
        return rival;
    },

};
