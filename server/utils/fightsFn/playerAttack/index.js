const { attack } = require('./attack');
const { magicArts } = require('./magicArts');

module.exports = {
    /**
     * 玩家出招
     * @param req 
     * @param res 
     * @param artId 法术id
     */
    playerAttack: function (req, res, artId) {
        if (artId) {
            magicArts(req, res, artId);
        } else {
            attack(req,res,)
        }
        
    },

};
