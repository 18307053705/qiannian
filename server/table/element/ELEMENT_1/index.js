const freak = require('./freak');
const npc = require('./npc');


module.exports = {
    getNpc: function (npcId) {
        const eleType = (npcId + "").slice(0, 2);
        switch (eleType) {
            case '10':
                return npc.getNpc(npcId);
            case '11':
                return freak.getNpc(npcId);
            default:
                console.log('异常NPC:::', npcId);
                return undefined;
        }
    }
}
