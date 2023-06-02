import React from "react";

const RoleEle = ({ roleInfo }) => {
    const { attr } = roleInfo;
    return (
        <>
            <div className="g_fgx"></div>
            <div><span className="g_b">冰攻</span>：<span>{`${attr.ice_atk_min}~${attr.ice_atk_max}`}</span></div>
            <div><span className="g_b">冰防</span>：<span>{`${attr.ice_dfs_min}~${attr.ice_dfs_max}`}</span></div>
            <div><span className="g_b">雷攻</span>：<span>{`${attr.mine_atk_min}~${attr.mine_atk_max}`}</span></div>
            <div><span className="g_b">雷防</span>：<span>{`${attr.mine_dfs_min}~${attr.mine_dfs_max}`}</span></div>
            <div><span className="g_b">风攻</span>：<span>{`${attr.wind_atk_min}~${attr.wind_atk_max}`}</span></div>
            <div><span className="g_b">风防</span>：<span>{`${attr.wind_dfs_min}~${attr.wind_dfs_max}`}</span></div>
            <div><span className="g_b">水攻</span>：<span>{`${attr.water_atk_min}~${attr.water_atk_max}`}</span></div>
            <div><span className="g_b">水防</span>：<span>{`${attr.water_dfs_min}~${attr.water_dfs_max}`}</span></div>
            <div><span className="g_b">火攻</span>：<span>{`${attr.fire_atk_min}~${attr.fire_atk_max}`}</span></div>
            <div><span className="g_b">火防</span>：<span>{`${attr.fire_dfs_min}~${attr.fire_dfs_max}`}</span></div>
        </>
    )

}

export default RoleEle;