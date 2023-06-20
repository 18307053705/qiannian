import React from "react";
const FightAtt = ({ dirClick, attrInfo }) => {
    const { name, attr } = attrInfo;
    return (
        <>
            <div><span className="g_b">{name}</span></div>
            <div><span className="g_b">生命</span>：<span>{`${attr.life}/${attr.life_max}`}</span></div>
            <div><span className="g_b">法力</span>：<span>{`${attr.mana}/${attr.mana_max}`}</span></div>
            <div><span className="g_b">攻击</span>：<span>{`${attr.atk_min}~${attr.atk_max}`}</span></div>
            <div><span className="g_b">防御</span>：<span>{`${attr.dfs_min}~${attr.dfs_max}`}</span></div>
            <div><span className="g_b">命中</span>：<span>{attr.hit}</span></div>
            <div><span className="g_b">闪避</span>：<span>{attr.dodge}</span></div>
            <div><span className="g_b">暴击</span>：<span>{attr.sudden}</span></div>
            <div><span className="g_b">冰攻</span>：<span>{`${attr.ice_atk_min || 0}~${attr.ice_atk_max || 0}`}</span></div>
            <div><span className="g_b">冰防</span>：<span>{`${attr.ice_dfs_min || 0}~${attr.ice_dfs_max || 0}`}</span></div>
            <div><span className="g_b">雷攻</span>：<span>{`${attr.mine_atk_min || 0}~${attr.mine_atk_max || 0}`}</span></div>
            <div><span className="g_b">雷防</span>：<span>{`${attr.mine_dfs_min || 0}~${attr.mine_dfs_max || 0}`}</span></div>
            <div><span className="g_b">风攻</span>：<span>{`${attr.wind_atk_min || 0}~${attr.wind_atk_max || 0}`}</span></div>
            <div><span className="g_b">风防</span>：<span>{`${attr.wind_dfs_min || 0}~${attr.wind_dfs_max || 0}`}</span></div>
            <div><span className="g_b">水攻</span>：<span>{`${attr.water_atk_min || 0}~${attr.water_atk_max || 0}`}</span></div>
            <div><span className="g_b">水防</span>：<span>{`${attr.water_dfs_min || 0}~${attr.water_dfs_max || 0}`}</span></div>
            <div><span className="g_b">火攻</span>：<span>{`${attr.fire_atk_min || 0}~${attr.fire_atk_max || 0}`}</span></div>
            <div><span className="g_b">火防</span>：<span>{`${attr.fire_dfs_min || 0}~${attr.fire_dfs_max || 0}`}</span></div>

            <span className='g_b' onClick={() => { dirClick() }}>返回战斗</span>
        </>
    )
}

export default FightAtt;