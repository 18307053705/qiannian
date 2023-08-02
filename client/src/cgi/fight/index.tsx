import { post } from "@request";
import { AttrType } from "../base";

const creatFightUrl = '/fight/creatFight';
const fightDirUrl = '/fight/fightDir';
const exitFightUrl = '/fight/exitFight';
const getFightConfigUrl = '/fight/getFightConfig';
const setFightConfigUrl = '/fight/setFightConfig';
const fightContinueUrl = '/fight/continue';

type FightInfoType = {
    rival: {
        name: string,
        attr: AttrType
    }[],
    player: {
        name: string,
        attr: AttrType,
    }[],
    buffs: any,
    art: { id: string, name: string }[],
    list: { id: string, name: string }[],
}

export const initFightInfo: FightInfoType = {
    rival: [],
    player: [],
    buffs: {},
    art: [],
    list: []
}

// 创建战斗
export async function creatFight() {
    return await post(creatFightUrl);
}

// 发送战斗指令
export async function fightDir(data: { id: number, p: number }) {
    return await post(fightDirUrl, data);
}
// 继续
export async function fightContinue() {
    return await post(fightContinueUrl);
}
// 退出战斗 
export async function exitFight() {
    return await post(exitFightUrl);
}


//获取角色战斗指令
export async function getFightConfig() {
    return await post(getFightConfigUrl);
}


type setFightDirReq = {
    dir_type: number, // 指令类型 1技能 2 物品 
    dir_inx: number, // 更换的指令下标
    dir_id: number //替换的指令id
}

// 更换角色战斗指令
export async function setFightConfig(data: setFightDirReq) {
    return await post(setFightConfigUrl, data);
}
