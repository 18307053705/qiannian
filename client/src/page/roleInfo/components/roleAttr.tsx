import React from "react";
import { getEquipName, EQUIP_POS_LIST } from '@utils/equip';
import { jumpDetail, jumpSuitDetail } from '@utils/jumpPage';
import { SEX_MEUN } from '@meun';
const RoleAttr = ({ roleInfo, history }) => {
    const { attr, socialize_pool: socialize, equip_pool: equip, pet_pool: pet = { c: {} } } = roleInfo;
    const { suit = [] } = equip;
    return (
        <>
            <div>
                <div>
                    <span className="g_b">角色</span>：
                    <span>{`${roleInfo.role_name}(${roleInfo.role_title || '无'})`}</span>
                    <span className="g_u_end" onClick={() => { history.push('./title') }}>换</span>
                </div>
                <div><span className="g_b">等级</span>：<span>{`${roleInfo.role_level}级(${roleInfo.role_exp})`}</span></div>
                {roleInfo.role_level > 69 && <div><span className="g_b">境界</span>：<span>{roleInfo.role_realm}</span></div>}
                <div><span className="g_b">职业</span>：<span>{roleInfo.role_career}</span></div>
                <div><span className="g_b">性别</span>：<span>{SEX_MEUN[roleInfo.role_sex]}</span></div>
                {socialize.spouse && <div><span className="g_b">妻子</span>：<span>{socialize.spouse.name}</span></div>}
                {socialize.teacher && <div><span className="g_b">师父</span>：<span>{socialize.teacher.name}</span></div>}
                <div><span className="g_b">灵血</span>：<span>{roleInfo.role_lx}</span></div>
                <div><span className="g_b">生命</span>：<span>{`${roleInfo.life}/${attr.life_max}`}</span></div>
                <div><span className="g_b">法力</span>：<span>{`${roleInfo.mana}/${attr.mana_max}`}</span></div>
                <div><span className="g_b">攻击</span>：<span>{`${attr.atk_min}~${attr.atk_max}`}</span></div>
                <div><span className="g_b">防御</span>：<span>{`${attr.dfs_min}~${attr.dfs_max}`}</span></div>
                <div><span className="g_b">命中</span>：<span>{attr.hit}</span></div>
                <div><span className="g_b">闪避</span>：<span>{attr.dodge}</span></div>
                <div><span className="g_b">暴击</span>：<span>{attr.sudden}</span></div>
            </div>
            <div>
                <div>
                    <span className="g_b">宠物</span>：
                    {
                        pet.c.n ?
                            <span className="g_u_end" onClick={() => { history.push('/petDetail', { petId: pet.c.id }) }}>{pet.c.n}</span>
                            : "无"
                    }
                </div>
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
                                            p: 1,
                                            form: 2
                                        })
                                    }}
                                    className="g_u_end"
                                >
                                    {getEquipName(equip[value])}
                                </span> : '无'}
                            </div>
                        )
                    })
                }
                {
                    suit.map(({ n, id }) => (
                        <div key={id}>【套装】<span className="g_u_end" onClick={() => { jumpSuitDetail(id) }}>{n}</span></div>
                    ))
                }
            </div>
            <div></div>

        </>
    )

}

export default RoleAttr;