import React, { useState, useEffect, useCallback } from "react";
import { getRoleInfo, initRoleInfo } from '@cgi/roleInfo';
import { getFriendsList, friendsApply } from '@cgi/friends';
import { createFightDir } from '@cgi/grand';
import { chatSet } from "@cgi/chat";
import { getEquipName, EQUIP_POS_LIST } from '@utils/equip';
import { SEX_MEUN } from '@meun';
import { Input } from "@components";
const Plater = ({ history }) => {
    const [roleInfo, setRoleInfo] = useState(initRoleInfo);
    const [isFriend, setIsFriend] = useState(true);
    const [text, setText] = useState('');
    const { attr, socialize_pool: socialize, equip_pool: equip } = roleInfo as any;
    const { state } = history.location;
    useEffect(() => {
        getRoleInfo({ role_id: state.role_id }).then(({ data }) => {
            setRoleInfo(data);
        })
        getFriendsList().then(({ data }) => {
            let falg = false;
            if (data) {
                const { list } = data;
                falg = list.find(({ id }) => id === state.role_id);
            }
            setIsFriend(falg);
        })
    }, [])

    const applyClick = useCallback(() => {
        friendsApply({ role_id: state.role_id });
    }, [])
    const submit = (text, cbllback) => {
        chatSet({
            type: 1,
            text,
            t_role: state.role_id
        }).then(({ text }) => {
            setText(text);
            cbllback('')
        })
    }
    return (
        <>
            <div>{text}</div>
            <div>
                <Input
                    layout={false}
                    onText="私聊"
                    submit={submit}
                    length={[0, 100]}
                />
                <div>
                    <span className="g_u"><span onClick={() => { history.push('/shopping', { role_id: state.role_id }) }}>店铺</span></span>
                    <span className="g_u"><span>赠送</span></span>
                    {!isFriend && <span className="g_u"><span onClick={applyClick}>加好友</span></span>}
                    <span className="g_u"><span onClick={() => { createFightDir({ role_id: state.role_id, type: 3 }) }}>切磋</span></span>
                </div>
                <div>
                    <span className="g_u"><span>帮会</span></span>
                    <span className="g_u"><span>庄园</span></span>
                    <span className="g_u"><span>队伍</span></span>
                    <span className="g_u"><span onClick={() => { createFightDir({ role_id: state.role_id, type: 4 }) }}>攻击</span></span>
                </div>
            </div>
            <div>
                <div><span className="g_b">角色</span>：<span>{`${roleInfo.role_name}(${roleInfo.role_title || '无'})`}</span></div>
                <div><span className="g_b">等级</span>：<span>{`${roleInfo.role_level}级`}</span></div>
                {roleInfo.role_level > 69 && <div><span className="g_b">境界</span>：<span>{roleInfo.role_realm}境</span></div>}
                <div><span className="g_b">职业</span>：<span>{roleInfo.role_career}</span></div>
                <div><span className="g_b">性别</span>：<span>{SEX_MEUN[roleInfo.role_sex]}</span></div>
                {socialize.spouse && <div><span className="g_b">妻子</span>：<span>{socialize.spouse.name}</span></div>}
                {socialize.teacher && <div><span className="g_b">师父</span>：<span>{socialize.teacher.name}</span></div>}
            </div>
            <div><span className="g_b">生命</span>：<span>{`${roleInfo.life}/${attr.life_max}`}</span></div>
            <div><span className="g_b">法力</span>：<span>{`${roleInfo.mana}/${attr.mana_max}`}</span></div>
            <div><span className="g_b">攻击</span>：<span>{`${attr.atk_min}~${attr.atk_max}`}</span></div>
            <div><span className="g_b">防御</span>：<span>{`${attr.dfs_min}~${attr.dfs_max}`}</span></div>
            <div><span className="g_b">命中</span>：<span>{attr.hit}</span></div>
            <div><span className="g_b">闪避</span>：<span>{attr.dodge}</span></div>
            <div><span className="g_b">暴击</span>：<span>{attr.sudden}</span></div>
            <div>
                <div><span className="g_b">宠物</span>：<span>{equip.pet ? equip.pet.n : '无'}</span></div>
                {
                    EQUIP_POS_LIST.map(({ label, value, condition = 0 }, index) => {
                        if (roleInfo.role_level < condition) {
                            return null;
                        }
                        return (
                            <div key={index}>
                                <span className="g_b">{label}</span>
                                {getEquipName(equip[value])}
                            </div>
                        )
                    })
                }
            </div>
            <span className="g_b_u" onClick={() => { history.push('/grand') }}>返回游戏</span>

        </>
    )

}

export default Plater;