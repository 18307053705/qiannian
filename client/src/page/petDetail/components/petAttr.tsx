import React from "react";
const petAttr = ({ attr }) => {
    return (
        <div>
            <div><span>生命：{`${attr.life}/${attr.life_max}`}</span></div>
            <div><span>法力：{`${attr.mana}/${attr.mana_max}`}</span></div>
            <div><span>攻击：{`${attr.atk_min}~${attr.atk_max}`}</span></div>
            <div><span>防御：{`${attr.dfs_min}~${attr.dfs_max}`}</span></div>
            <div><span>命中：{attr.hit}</span></div>
            <div><span>闪避：{attr.dodge}</span></div>
            <div><span>暴击：{attr.sudden}</span></div>
            <div><span>冰攻：{`${attr.ice_atk_min || 0}~${attr.ice_atk_max || 0}`}</span></div>
            <div><span>冰防：{`${attr.ice_dfs_min || 0}~${attr.ice_dfs_max || 0}`}</span></div>
            <div><span>雷攻：{`${attr.mine_atk_min || 0}~${attr.mine_atk_max || 0}`}</span></div>
            <div><span>雷防：{`${attr.mine_dfs_min || 0}~${attr.mine_dfs_max || 0}`}</span></div>
            <div><span>风攻：{`${attr.wind_atk_min || 0}~${attr.wind_atk_max || 0}`}</span></div>
            <div><span>风防：{`${attr.wind_dfs_min || 0}~${attr.wind_dfs_max || 0}`}</span></div>
            <div><span>水攻：{`${attr.water_atk_min || 0}~${attr.water_atk_max || 0}`}</span></div>
            <div><span>水防：{`${attr.water_dfs_min || 0}~${attr.water_dfs_max || 0}`}</span></div>
            <div><span>火攻：{`${attr.fire_atk_min || 0}~${attr.fire_atk_max || 0}`}</span></div>
            <div><span>火防：{`${attr.fire_dfs_min || 0}~${attr.fire_dfs_max || 0}`}</span></div>
        </div>
    )

}

export default petAttr;

