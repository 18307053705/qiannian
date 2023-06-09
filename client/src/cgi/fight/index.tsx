import { post } from "@request";
import { AttrType } from "../base";
const getFightInfoUrl = '/fight/getFightInfo';
const setFightDirUrl = '/fight/setFightDir';
const getFightDirUrl = '/fight/getFightDir';
const fightDirUrl = '/fight/fightDir';
const fightCleanUrl = '/fight/clean';
const fightContinueUrl = '/fight/continue';
const fightGiveUrl = '/fight/give';

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

//获取角色战斗信息
export async function getFightInfo() {
    return await post(getFightInfoUrl);
}


//获取角色战斗指令列表
export async function getFightDri() {
    return await post(getFightDirUrl);
}


type setFightDirReq = {
    index: number, // 下标
    type: number, // 更换类型 1技能 2 物品
    dir: number
}
// 更换角色战斗指令
export async function setFightDir(data: setFightDirReq) {
    return await post(setFightDirUrl, data);
}



// 发送战斗指令
export async function fightDir(data: { index: number }) {
    return await post(fightDirUrl, data);
}

// 清除战斗元素
export async function fightClean() {
    return await post(fightCleanUrl);
}

// 清除战斗元素
export async function fightContinue() {
    return await post(fightContinueUrl);
}
// 放弃战斗战斗
export async function fightGive() {
    return await post(fightGiveUrl);
}
