const { getIPAdress } = require("../osFn/getIPAdress");
const { decrypt } = require("../cryptoFn/decrypt");
const { decryptPass } = require('./decryptPass')

module.exports = {
    /**
     * 校验token是否有效
     * @param {*} token 
     * @param {*} user 
     * @param {*} pass 
     * @returns true有效
     */
    checkToken: function (token, user, pass) {
        const IP = getIPAdress();
        const analys = decrypt(token, user, IP);
        return `${user}1.${decryptPass(pass)}2.${IP}` === analys;
    }
};
