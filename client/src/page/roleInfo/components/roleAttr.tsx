import React from "react";
import { getEquipName, EQUIP_POS_LIST } from '@utils/equip';
import { jumpDetail } from '@utils/jumpDetail';
const RoleAttr = ({ roleInfo, history }) => {
    const { attr, socialize_pool: socialize, equip_pool: equip } = roleInfo;
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
                {
                    EQUIP_POS_LIST.map(({ label, value, condition = 0 }, index) => {
                        if (roleInfo.role_level < condition) {
                            return null;
                        }
                        return (
                            <div key={index}>
                                <span className="g_b">{label}</span>
                                {equip[value] ? <span
                                    onClick={() => {
                                        jumpDetail(history, {
                                            pos: value,
                                            p: 3,
                                            form: 2
                                        })
                                    }}
                                    className="g_u_end"
                                >
                                    {getEquipName(equip[value].ext, equip[value].n)}
                                </span> : '无'}
                            </div>
                        )
                    })
                }
            </div>
            <div></div>

        </>
    )

}

export default RoleAttr;