
module.exports = {
    /**
     * 获取势力信息
     * @param {*} req 
     * @param {*} res 
     * @param {*} id 势力id
     * @param {*} type 势力类型(1:帮会,2:结义,3:队伍)
     * @returns Promise | undefined
     * @returns  socialize.id 
     * @returns  socialize.name 名称
     * @returns  socialize.level 等级
     * @returns  socialize.exp 经验
     * @returns  socialize.text 描述
     * @returns  socialize.type 类型(1:帮会,2:结义,3:队伍)
     * @returns  socialize.compose 成员
     * @returns  socialize.apply 申请列表
     * @returns  socialize.soci_id 
     */
    getSocialize: async function (req, res, id, type) {
        const { results } = await res.asyncQuery(`select * from socialize  where soci_id="${id}" and type=${type}`);
        if (results[0]) {
            return {
                ...results[0],
                compose: JSON.parse(results[0]['compose']),
                apply: JSON.parse(results[0]['apply']),
            }
        }
        return undefined;
    },
}