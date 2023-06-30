import React, { useCallback } from "react";
import { backGrand } from '@utils/grand';
import { fightGive } from '@cgi/fight';

const FightDuke = ({ fightInfo, dirClick, fightDirInfp }) => {
    const { dps=[], text,rival_text, mana, life, buffText = [] } = fightDirInfp;
    // const buff = Object.keys(fightInfo.buffs);
    const backClick = useCallback(() => {
        fightGive().then(() => {
            backGrand()
        })
    }, [])
    if(!fightInfo.player.length){
        return null;
    }
    console.log(fightInfo)
    return (
        <div className="duke">
            <div>
                {
                    fightInfo.art.map(({ name, s }, index) => (
                        <>
                            <span className={(index === 2 || index === 5) ? "g_u_end" : "g_u"} onClick={() => { dirClick(index) }}>
                                <span>{name}{(s === 0 || s) ? `(${s})` : ''}</span>
                            </span>
                            {(index === 2 || index === 5) && <br />}
                        </>
                    ))
                }
            </div>
            <div>{text}</div>
            <div>{rival_text}</div>
            {/* 敌方状态 */}
            <div>----------------敌人状态--------------</div>
            <div>
                {
                    fightInfo.rival.map(({ attr, name }, index) => (
                        <div key={index}>
                            <span className="g_b">{name}(命)</span>：<span>{`${attr.life}/${attr.life_max}`}</span>
                            {dps.length && <span>{dps[index] ? `[${dps[index]}]` : ''}</span>}
                        </div>
                    ))
                }
            </div>
            <div>----------------玩家状态--------------</div>
            {/* 我方状态 */}
            <div>
                {
                    fightInfo.player.map(({ attr, name }, index) => (
                        <div key={index}>
                            <div>
                                <span className="g_b">{name}(命)</span>：<span>{`${attr.life}/${attr.life_max}`}</span>
                                {life && <span>[{life}]</span>}
                            </div>
                            <div>
                                <span className="g_b">{name}(法)</span>：<span>{`${attr.mana}/${attr.mana_max}`}</span>
                                {mana && <span>[{mana}]</span>}
                            </div>
                        </div>
                    ))
                }
            </div>
            {/* buff展示 */}
            {buffText.length ? <div>----------------战斗buff--------------</div> : ''}
            {buffText.map((itme, index) => (<div key={index}>{itme}</div>))}
            <div>----------------状态详情--------------</div>
            {/* 敌方成员 */}
            <div>
                <span className="g_b">状态(敌)</span>：
                {
                    fightInfo.rival.map(({ name }, index) => (
                        <span className="g_u" onClick={() => { dirClick('rival', index) }}><span>{name}</span></span>
                    ))
                }
            </div>
            {/* 我方成员 */}
            <div>
                <span className="g_b">状态(友)</span>：
                {
                    fightInfo.list.map(({ name }, index) => (
                        <span className="g_u" onClick={() => { dirClick('player', index) }}><span>{name}</span></span>
                    ))
                }
            </div>
            {/* 宠物 */}
            <div>
                <div><span className="g_b">宠物</span>：{fightInfo.player[0]['pet'] ? fightInfo.player[0]['pet'].name : '无'}</div>
            </div>
            <div>
                <span className="g_b">战斗设置</span>：
                <span className="g_u"><span onClick={backClick}>放弃战斗</span></span>
                <span className="g_u"><span onClick={() => { dirClick(-2) }}>御宠之术</span></span>
                <span className="g_u"><span onClick={() => { dirClick('set') }}>更换设置</span></span>

            </div>

        </div>
    )
}

export default FightDuke;