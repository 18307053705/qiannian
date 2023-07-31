var osFn = require("./osFn");
var cryptoFn = require("./cryptoFn");
var userFn = require("./userFn");

module.exports = {
  creatToken: function(user, pass) {
    const IP = osFn.getIPAdress();
    const content = `${user}1.${pass}2.${IP}`;
    return cryptoFn.encryption(content, user, IP);
  },
  analysToken: function(token, user, pass) {
    const IP = osFn.getIPAdress();
    const analys = cryptoFn.decrypt(token, user, IP);
    console.log(analys,'analys...')
    return `${user}1.${userFn.analysPass(pass)}2.${IP}` === analys;
  }
};
