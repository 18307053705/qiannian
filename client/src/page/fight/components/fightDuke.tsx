import React from "react";

const art = (dirClick, artList) => {
    return artList.map(({ n, s, id, p }, index) => (
        <span
            key={index}
            className="g_u"
            onClick={() => { dirClick({ id, p }) }}>
            <span>{n}{(s === 0 || s) ? `(${s})` : ''}</span>
        </span>
    ))
}

const getAttrIfno = (attrs: any[]) => {
    const lifeList: any[] = [];
    const stateList: any[] = [];
    attrs.forEach(({ life, life_max, name }) => {
        lifeList.push(life);
        stateList.push({
            percent: (life / life_max * 100).toFixed(0),
            state: life > 0 ? 1 : 0,
            name
        });
    })
    return {
        lifeText: lifeList.join(','),
        stateList
    }
}

const percentStyle: any = {
    width: '100px',
    border: '1px solid #ccc',
    height: '6px',
    position: 'relative',
}

const FightPercent = ({ percent, color = 'red' }) => {
    const styleItme: any = {
        width: `${percent}px`,
        backgroundColor: color,
        border: `1px solid ${color}`,
        height: '6px',
        position: 'absolute',
        top: '-2px',
        left: '-2px'
    }
    return (
        <div style={percentStyle}>
            <div style={styleItme}>
            </div>
        </div>
    )
}


const FightDuke = ({ dirClick, fight, setPanel }) => {
    const { buffs, players, player, rivals, roundText = {} } = fight;
    const artList1 = player.art.slice(0, 3);
    const artList2 = player.art.slice(3, 6);
    const artList3 = player.art.slice(6, 9);
    const rivalAttr = getAttrIfno(rivals);
    const playerAttr = getAttrIfno(players);
    const { dps, pet_dps, drain_life, restore_life, drain_mana, restore_mana, message } = roundText;

    return (
        <div className="duke">
            <div>{message}</div>
            <div>{rivals[0].name}</div>
            {/* 技能栏1 */}
            <div>{art(dirClick, artList1)}</div>
            {/* 敌方状态 */}
            <div>敌命:[{rivalAttr.lifeText}]{dps}{pet_dps}</div>
            {/* 敌方血量百分比 */}
            {rivalAttr.stateList.map(({ percent }, index) => <FightPercent key={index} percent={percent} />)}
            {/* 我的状态 */}
            <div>你命:{`${player.life}/${player.life_max}`}{drain_life}{restore_life ? `[+${restore_life}]` : ''}</div>
            {/* 我方血量百分比 */}
            <FightPercent percent={(player.life / player.life_max * 100).toFixed(0)} />
            <div>你法:{`${player.mana}/${player.mana_max}`}{drain_mana}{restore_mana ? `[+${restore_mana}]` : ''}</div>
            {/* 我方法力百分比 */}
            <FightPercent percent={(player.mana / player.mana_max * 100).toFixed(0)} color='blue' />
            {/* 技能栏2 */}
            <div>{art(dirClick, artList2)}</div>
            {/* 技能栏3 */}
            <div>{art(dirClick, artList3)}</div>
            {/* buff展示 */}
            {
                Object.values(buffs).map(({ t, text }: any, index) => (<div key={index}>{`${text},剩余${t}回合。`}</div>))
            }

            {/* 我方成员状态 */}
            <div>
                <span>状态</span>:
                {
                    playerAttr.stateList.map(({ name, percent }, index) => (
                        <span key={index} >{name}({percent}%)</span>
                    ))
                }
            </div>
            {/* 宠物 */}
            <div><span>宠物</span>:{player['pet'] ? player['pet'].name : '无'}</div>
            <div><span>战斗设置:</span><span className="g_u_end" onClick={() => { setPanel('set') }}>更换设置</span></div>

        </div>
    )
}

export default FightDuke;