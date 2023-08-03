import React, { useState, useEffect, useCallback } from "react";
import { getRoleInfo, initRoleInfo } from '@cgi/roleInfo';
import { getFriendsList, friendsApply } from '@cgi/friends';
import { createFightDir } from '@cgi/grand';
import { getEquipName } from '@utils/equip';
import { Input } from "@components";
const Plater = ({ history }) => {
    const [roleInfo, setRoleInfo] = useState(initRoleInfo);
    const [isFriend, setIsFriend] = useState(true);
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
                falg = JSON.parse(list).find(({ id }) => id === state.role_id);
            }
            setIsFriend(falg);
        })
    }, [])

    const applyClick = useCallback(() => {
        friendsApply({ role_id: state.role_id });
    }, [])
    const submit = () => {

    }
    return (
        <>
            <div>
                <Input
                    // label={`私聊${role.name}`}
                    layout={false}
                    onText="私聊"
                    submit={submit}
                    length={[0, 100]}
                />
                {/* <div><span className="g_u"><span onClick={() => { history.push('/chat', { role_id: state.role_id, role_name: roleInfo.role_name }) }}>私聊</span></span></div> */}
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
                    <span className="g_u"><span>攻击</span></span>
                </div>
            </div>
            <div>
                <div><span className="g_b">角色</span>：<span>{`${roleInfo.role_name}(${roleInfo.role_title || '无'})`}</span></div>
                <div><span className="g_b">等级</span>：<span>{`${roleInfo.role_level}级`}</span></div>
                {roleInfo.role_level > 69 && <div><span className="g_b">境界</span>：<span>{roleInfo.role_realm}境</span></div>}
                <div><span className="g_b">职业</span>：<span>{roleInfo.role_career}</span></div>
                <div><span className="g_b">性别</span>：<span>{roleInfo.role_sex}</span></div>
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
                <div>
                    <span className="g_b">宠物</span>：<span>{equip.pet ? equip.pet.name : '无'}</span></div>
                <div><span className="g_b">武器</span>：<span>{equip.weapon ? getEquipName(equip.weapon.ext, equip.weapon.name) : '无'}</span></div>
                <div><span className="g_b">头盔</span>：<span>{equip.helmet ? getEquipName(equip.helmet.ext, equip.helmet.name) : '无'}</span></div>
                <div><span className="g_b">衣服</span>：<span>{equip.clothing ? getEquipName(equip.clothing.ext, equip.clothing.name) : '无'}</span></div>
                <div><span className="g_b">腰带</span>：<span>{equip.belt ? getEquipName(equip.belt.ext, equip.belt.name) : '无'}</span></div>
                <div><span className="g_b">鞋子</span>：<span>{equip.shoe ? getEquipName(equip.shoe.ext, equip.shoe.name) : '无'}</span></div>
                <div><span className="g_b">戒指</span>：<span>{equip.ring ? getEquipName(equip.ring.ext, equip.ring.name) : '无'}</span></div>
                <div><span className="g_b">项链</span>：<span>{equip.necklace ? getEquipName(equip.necklace.ext, equip.necklace.name) : '无'}</span></div>
                {roleInfo.role_level > 65 && <div><span className="g_b">法宝</span>：<span>{equip.treasure1 ? getEquipName(equip.treasure1.ext, equip.treasure1.name) : '无'}</span></div>}
                {roleInfo.role_level > 65 && <div><span className="g_b">法宝</span>：<span>{equip.treasure2 ? getEquipName(equip.treasure2.ext, equip.treasure2.name) : '无'}</span></div>}
                {roleInfo.role_level > 74 && <div><span className="g_b">法宝</span>：<span>{equip.treasure3 ? getEquipName(equip.treasure3.ext, equip.treasure3.name) : '无'}</span></div>}
                {roleInfo.role_level > 74 && <div><span className="g_b">法宝</span>：<span>{equip.treasure4 ? getEquipName(equip.treasure4.ext, equip.treasure4.name) : '无'}</span></div>}
            </div>
            <span className="g_b_u" onClick={() => { history.push('/grand') }}>返回游戏</span>

        </>
    )

}

export default Plater;