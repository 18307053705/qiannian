const { getIPAdress } = require("../osFn/getIPAdress");
const { encryption } = require("../cryptoFn/encryption");

module.exports = {
    /**
     * 创建token
     * @param {*} user 
     * @param {*} pass 
     * @returns token
     */
    creatToken: function (user, pass) {
        const IP = getIPAdress();
        const content = `${user}1.${pass}2.${IP}`;
        return encryption(content, user, IP);
    }
};
