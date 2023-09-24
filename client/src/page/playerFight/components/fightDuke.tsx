import React from "react";

type fightType = {
    fightInfo: {
        players: any[],
        rivals: { attr: any, name: string }[],

    },
    fightMap: {
        player: any
    }
}

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
    attrs.forEach(({ attr, name }) => {
        const { life, life_max } = attr;
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

const FightPercent = ({ max, min, color = 'red' }) => {
    const percent = (min / max * 100).toFixed(0)
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
    const { myFightMap, tFightMap, fightRound = { life: '', mana: '', dps: '', message: '' } } = fight;
    // const { players, rivals, buffs } = fightInfo;
    const { player: myPalyer } = myFightMap;
    const { player: tPalyer } = tFightMap;
    const artList1 = myPalyer.art.slice(0, 3);
    const artList2 = myPalyer.art.slice(3, 6);
    const artList3 = myPalyer.art.slice(6, 9);
    return (
        <div className="duke">
            {/* 技能栏1 */}
            <div>{art(dirClick, artList1)}</div>
            {/* 敌方状态 */}
            <div>{tPalyer.name}(敌):[{tPalyer.attr.life}]{fightRound.dps}{fightRound.peDps}</div>
            {/* 敌方血量百分比 */}
            <FightPercent max={tPalyer.attr.life_max} min={tPalyer.attr.life} />
            {/* buff展示 */}
            {/* {
                Object.values(buffs).map(({ t, text }: any, index) => (<div key={index}>{`${text},剩余${t}回合。`}</div>))
            } */}
            {/* 我的状态 */}
            <div>你命:{`${myPalyer.attr.life}/${myPalyer.attr.life_max}${fightRound.life}`}</div>
            {/* 我方血量百分比 */}
            <FightPercent max={myPalyer.attr.life_max} min={myPalyer.attr.life} />
            <div>你法:{`${myPalyer.attr.mana}/${myPalyer.attr.mana_max}${fightRound.mana}`}</div>
            {/* 我方法力百分比 */}
            <FightPercent max={myPalyer.attr.mana_max} min={myPalyer.attr.mana} color='blue' />
            {/* 技能栏2 */}
            <div>{art(dirClick, artList2)}</div>
            {/* 技能栏3 */}
            <div>{art(dirClick, artList3)}</div>

            {/* 宠物 */}
            <div><span>宠物</span>:{myPalyer['pet'] ? myPalyer['pet'].name : '无'}</div>
            <div><span>战斗设置:</span><span className="g_u_end" onClick={() => { setPanel('set') }}>更换设置</span></div>

        </div>
    )
}

export default FightDuke;