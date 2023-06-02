import React from "react";

const RoleAttr = ({roleInfo}) => {
    const { attr, socialize_pool, equip_pool } = roleInfo;
    const socialize = socialize_pool ? JSON.parse(socialize_pool) : {};
    const equip = equip_pool ? JSON.parse(equip_pool) : {};
    return (
        <>
            <div>
                <div><span className="g_b">角色</span>：<span>{`${roleInfo.role_name}(${roleInfo.role_title || '无'})`}</span></div>
                <div><span className="g_b">等级</span>：<span>{`${roleInfo.role_level}级(${roleInfo.role_exp})`}</span></div>
                {roleInfo.role_level > 69 && <div><span className="g_b">境界</span>：<span>{roleInfo.role_realm}境</span></div>}
                <div><span className="g_b">职业</span>：<span>{roleInfo.role_career}</span></div>
                <div><span className="g_b">性别</span>：<span>{roleInfo.role_sex}</span></div>
                {socialize.spouse && <div><span className="g_b">妻子</span>：<span>{socialize.spouse.name}</span></div>}
                {socialize.teacher && <div><span className="g_b">师父</span>：<span>{socialize.teacher.name}</span></div>}
                <div><span className="g_b">生命</span>：<span>{`${roleInfo.life}/${attr.life_max}`}</span></div>
                <div><span className="g_b">法力</span>：<span>{`${roleInfo.mana}/${attr.mana_max}`}</span></div>
                <div><span className="g_b">攻击</span>：<span>{`${attr.atk_min}~${attr.atk_max}`}</span></div>
                <div><span className="g_b">防御</span>：<span>{`${attr.dfs_min}~${attr.dfs_max}`}</span></div>
                <div><span className="g_b">命中</span>：<span>{attr.hit}</span></div>
                <div><span className="g_b">闪避</span>：<span>{attr.dodge}</span></div>
                <div><span className="g_b">暴击</span>：<span>{attr.sudden}</span></div>
            </div>
            <div>
                <div><span className="g_b">宠物</span>：<span>{equip.pet ? equip.pet.name : '无'}</span></div>
                <div><span className="g_b">武器</span>：<span>{equip.weapon ? equip.weapon.name : '无'}</span></div>
                <div><span className="g_b">头盔</span>：<span>{equip.helmet ? equip.helmet.name : '无'}</span></div>
                <div><span className="g_b">衣服</span>：<span>{equip.clothing ? equip.clothing.name : '无'}</span></div>
                <div><span className="g_b">腰带</span>：<span>{equip.belt ? equip.belt.name : '无'}</span></div>
                <div><span className="g_b">鞋子</span>：<span>{equip.shoe ? equip.shoe.name : '无'}</span></div>
                <div><span className="g_b">戒指</span>：<span>{equip.ring ? equip.ring.name : '无'}</span></div>
                <div><span className="g_b">项链</span>：<span>{equip.necklace ? equip.necklace.name : '无'}</span></div>
                {roleInfo.role_level > 65 && <div><span className="g_b">法宝</span>：<span>{equip.treasure1 ? equip.treasure1.name : '无'}</span></div>}
                {roleInfo.role_level > 65 && <div><span className="g_b">法宝</span>：<span>{equip.treasure2 ? equip.treasure2.name : '无'}</span></div>}
                {roleInfo.role_level > 74 && <div><span className="g_b">法宝</span>：<span>{equip.treasure3 ? equip.treasure3.name : '无'}</span></div>}
                {roleInfo.role_level > 74 && <div><span className="g_b">法宝</span>：<span>{equip.treasure4 ? equip.treasure4.name : '无'}</span></div>}
            </div>
            <div></div>

        </>
    )

}

export default RoleAttr;