const os = require('os');

module.exports = {
    /**
     * 获取本机mac地址
     * @returns mac地址
     */
     getMacAdress:function(){
        var interfaces = os.networkInterfaces();
        for (var devName in interfaces) {
            var iface = interfaces[devName];
            for (var i = 0; i < iface.length; i++) {
                var alias = iface[i];
                if (alias.family === 'IPv4' && alias.address !== '127.0.0.1') {
                    return alias.mac;
                }
            }
        }
    }
}