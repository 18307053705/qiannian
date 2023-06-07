import React from "react";
const getUinxDay = (uinx: any) => {
    const time = uinx - new Date();
    let m = time / 60000;
    let h = 0;
    let d = 0;
    let text = "剩余";
    if (m > 60) {
        h = m / 60;
        m = m % 60;
    }
    if (h > 24) {
        d = h / 24;
        h = h % 24;
    }
    if (d) {
        text += `${parseInt(d)}天`;
    }
    if (h) {
        text += `${parseInt(h)}时`;
    }
    text += `${parseInt(m)}分。`;
    return text;
};

const RoleBuff = ({ roleInfo }) => {
    const { buff } = roleInfo;
    return (
        <>
            <div className="g_fgx"></div>
            <div><span className="g_b">月卡时间</span>：<span>{buff.month ? getUinxDay(buff.month.end) : '未激活'}</span></div>
            <div><span className="g_b">双倍经验</span>：<span>{buff.exp2 ? getUinxDay(buff.exp2.end) : '未激活'}</span></div>
            <div><span className="g_b">三倍经验</span>：<span>{buff.exp3 ? getUinxDay(buff.exp3.end) : '未激活'}</span></div>
            <div><span className="g_b">五倍经验</span>：<span>{buff.exp5 ? getUinxDay(buff.exp5.end) : '未激活'}</span></div>
            <div><span className="g_b">双倍金钱</span>：<span>{buff.money2 ? getUinxDay(buff.money2.end) : '未激活'}</span></div>
            <div><span className="g_b">三倍金钱</span>：<span>{buff.money3 ? getUinxDay(buff.money3.end) : '未激活'}</span></div>
            <div><span className="g_b">五倍金钱</span>：<span>{buff.money5 ? getUinxDay(buff.money5.end) : '未激活'}</span></div>
            <div><span className="g_b">生命上限{buff.life ? `+${buff.life.value}` : ''}</span>：<span>{buff.life ? getUinxDay(buff.life.end) : '未激活'}</span></div>
            <div><span className="g_b">法力上限{buff.mana ? `+${buff.mana.value}` : ''}</span>：<span>{buff.mana ? getUinxDay(buff.mana.end) : '未激活'}</span></div>
            <div><span className="g_b">攻击上限{buff.atk ? `+${buff.atk.value}` : ''}</span>：<span>{buff.atk ? getUinxDay(buff.atk.end) : '未激活'}</span></div>
            <div><span className="g_b">防御上限{buff.dfs ? `+${buff.dfs.value}` : ''}</span>：<span>{buff.dfs ? getUinxDay(buff.dfs.end) : '未激活'}</span></div>
            <div><span className="g_b">命中上限{buff.hit ? `+${buff.hit.value}` : ''}</span>：<span>{buff.hit ? getUinxDay(buff.hit.end) : '未激活'}</span></div>
            <div><span className="g_b">闪避上限{buff.dodge ? `+${buff.dodge.value}` : ''}</span>：<span>{buff.dodge ? getUinxDay(buff.dodge.end) : '未激活'}</span></div>
            <div><span className="g_b">暴击上限{buff.sudden ? `+${buff.sudden.value}` : ''}</span>：<span>{buff.sudden ? getUinxDay(buff.sudden.end) : '未激活'}</span></div>
        </>
    )

}

export default RoleBuff;