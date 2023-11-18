
import React from "react";
const ACTIVE_QUEUE_MAP = {
    CaiLingDong: {
        text: '彩灵洞活动已开启，赶紧去参加吧！',
        path: 'caiLingDong'
    },
    JinYindao: {
        text: '金银岛活动已开启，赶紧去参加吧！',
        path: 'jinYinDao'
    },
    WorldBoss: {
        text: '世界BOSS活动已开启，赶紧去参加吧！',
        path: 'worldBoss'
    },
    ZhanChang: {
        text: '上古战场活动已开启，赶紧去参加吧！',
        path: 'zhanChang'
    },
}

const Active = ({ ACTIVE_QUEUE }) => {

    let info: any = undefined;
    if (ACTIVE_QUEUE.CaiLingDong) {
        info = ACTIVE_QUEUE_MAP.CaiLingDong;
    }
    if (ACTIVE_QUEUE.JinYindao) {
        info = ACTIVE_QUEUE_MAP.JinYindao;
    }
    if (ACTIVE_QUEUE.ZhanChang) {
        info = ACTIVE_QUEUE_MAP.ZhanChang;
    }
    if (ACTIVE_QUEUE.WorldBoss) {
        info = ACTIVE_QUEUE_MAP.WorldBoss;
    }
    if (!info) {
        return null;
    }
    return (
        <div className="g_u_end" onClick={() => { window.QN.history.push(info.path) }} >{info.text}</div>
    );
}

export default Active;