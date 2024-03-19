import React, { useState, useEffect } from "react";
import { getFightAttr } from '@cgi/fight';

const FightAttrShow = ({ id, close }) => {
    const [data, setData]: any = useState();
    useEffect(() => {
        getFightAttr({ id }).then((res) => {
            setData(res.data);
        })
    }, [id])

    if (!data) {
        return null;
    }
    const { name, attr } = data;
    return (
        <div>
            <div>{name}</div>
            <div><span className="g_b">生命</span>：<span>{attr.life_max}</span></div>
            <div><span className="g_b">法力</span>：<span>{attr.mana_max}</span></div>
            <div><span className="g_b">攻击</span>：<span>{`${attr.atk_min}~${attr.atk_max}`}</span></div>
            <div><span className="g_b">防御</span>：<span>{`${attr.dfs_min}~${attr.dfs_max}`}</span></div>
            <div><span className="g_b">命中</span>：<span>{attr.hit}</span></div>
            <div><span className="g_b">闪避</span>：<span>{attr.dodge}</span></div>
            <div><span className="g_b">暴击</span>：<span>{attr.sudden}</span></div>
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
            <div><span className="g_u_end" onClick={close}>返回上页</span></div>
        </div>
    )
}

export default FightAttrShow;