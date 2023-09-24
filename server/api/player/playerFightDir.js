const { fightFn, playerFn } = require('../../utils');
const { FightG, GrandG } = require('../../global');

module.exports = {
    /**
     * 发送战斗指令
     */
    playerFightDir: async (req, res) => {
        const { id = 0, p = 0 } = req.body;
        // 多人pk的情况下,对方可能被其人击杀了,自己也可能被人击杀了
        if (playerFn.getDeathResulst(req, res)) {
            return;
        }
        // 开始计算战斗

        const { fightMap } = FightG.getFightGlobal(req, res);
        FightG.updataFightMapGlobal(req, res, { dps: 0 });
        // 战斗指令信息
        const { currentDir } = GrandG.getDirGlobal(req, res);
        // 判断出招间隔
        if (!playerFn.computeTime(req, res, currentDir)) {
            return;
        }
        // 定义回合文案
        const fightRound = {
            message: '', // 错误提示
            dps: '', // 造成的伤害
            rivalDps: 0, // 怪物伤害
            life: -fightMap.dps, // 恢复的生命
            mana: 0, // 恢复的法力
        }

        // 放弃战斗
        if (p === 9 && id === 1) {
            if (playerFn.escapeFight(req, res, fightRound, currentDir)) {
                return;
            }
        }
        // buffs计算
        playerFn.computeBuffs(req, res);
        // 捉宠物
        if (p === 9 && id === 2) {
            fightRound.message = "无法进行捕捉";
        }

        // 使用物品
        if (p === 2) {
            fightRound.message = fightFn.drugDir(req, res, id);
        }

        // 普通攻击
        if (p === 0 && id === 0) {
            if (playerFn.playerNormalDir(req, res, fightRound)) {
                return;
            }
        }

        // 技能攻击
        if (p === 1) {
            if (playerFn.playerArtDir(req, res, fightRound, id)) {
                return;
            }
        }
        if (playerFn.petArtDir(req, res, fightRound)) {
            return;
        }
        // 设置出招间隔,每秒可出招一次
        const myFightMap = FightG.updataFightMapGlobal(req, res, { intervalTime: new Date() * 1 });
        const { fightMap: tFightMap } = FightG.getFightGlobal(req, res, currentDir.role_id);
        const { mana, life } = fightRound;
        let lifeText = '';
        let manaText = '';
        if (life) {
            lifeText = life > 0 ? `[+${life}]` : `[${life}]`;
        }
        if (mana) {
            manaText = mana > 0 ? `[+${mana}]` : `[${mana}]`;
        }
        res.send({
            code: 0,
            data: {
                myFightMap,
                tFightMap,
                fightRound: {
                    ...fightRound,
                    life: lifeText,
                    mana: manaText,
                }
            }
        })

    }
};