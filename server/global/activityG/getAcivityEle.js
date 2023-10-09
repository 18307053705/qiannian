module.exports = {
    /**
     * 获取活动元素
     */
    getAcivityEle: function (req, res, address, eleList, eleDir) {
        const addressId = address.split(',')[0];
        // 判断是否为多人副本地图
        if (addressId === '60004') {
            


            return;
        }

        // getSpecificGrand(req, res, address, eleList, eleDir)
        return JSON.parse(JSON.stringify(CAI_LIN_DONG))
    }
}