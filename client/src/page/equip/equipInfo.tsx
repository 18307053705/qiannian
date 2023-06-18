import React, { useState, useEffect } from 'react';
import { getRoleInfo, initRoleInfo } from '@cgi/roleInfo';
import { backGrand } from '@utils/grand';
import { getEquipName } from '@utils/equip';
export const Equip = ({ pageCheng, history }) => {
    const [roleInfo, setRoleInfo] = useState(initRoleInfo);
    useEffect(() => {
        getRoleInfo().then(({ data }) => {
            setRoleInfo(data);
        })
    }, [])
    const equip = roleInfo.equip_pool;

    const clickEquip = (key) => {
        const { id } = equip[key];
        history.push('/knapsackDetail', { id, p: 3, posKey: key })
    }

    return (
        <div>
            <div>=======</div>
            <div>
                <span className="g_b">武器</span>：
                {
                    equip.weapon ?
                        <span className="g_u">
                            <span
                                onClick={() => {
                                    clickEquip('weapon')
                                }}>
                                {getEquipName(equip.weapon.ext, equip.weapon.name)}
                            </span>
                        </span>
                        : <span >无</span>
                }
                <span className="g_u"><span onClick={() => { pageCheng('list', 1, 'weapon') }}>换</span></span>
            </div>
            <div>
                <span className="g_b">头盔</span>：
                {
                    equip.helmet ?
                        <span className="g_u">
                            <span
                                onClick={() => {
                                    clickEquip('helmet')
                                }}>
                                {getEquipName(equip.helmet.ext, equip.helmet.name)}
                            </span>
                        </span>
                        : <span >无</span>
                }
                <span className="g_u"><span onClick={() => { pageCheng('list', 2, 'helmet') }}>换</span></span>
            </div>
            <div>
                <span className="g_b">衣服</span>：
                {
                    equip.clothing ?
                        <span className="g_u">
                            <span
                                onClick={() => {
                                    clickEquip('clothing')
                                }}>
                                {getEquipName(equip.clothing.ext, equip.clothing.name)}
                            </span>
                        </span>
                        : <span >无</span>
                }
                <span className="g_u"><span onClick={() => { pageCheng('list', 3, 'clothing') }}>换</span></span>
            </div>
            <div>
                <span className="g_b">腰带</span>：
                {
                    equip.belt ?
                        <span className="g_u">
                            <span
                                onClick={() => {
                                    clickEquip('belt')
                                }}>
                                {getEquipName(equip.belt.ext, equip.belt.name)}
                            </span>
                        </span>
                        : <span >无</span>
                }
                <span className="g_u"><span onClick={() => { pageCheng('list', 4, 'belt') }}>换</span></span>
            </div>
            <div>
                <span className="g_b">鞋子</span>：
                {
                    equip.shoe ?
                        <span className="g_u">
                            <span
                                onClick={() => {
                                    clickEquip('shoe')
                                }}>
                                {getEquipName(equip.shoe.ext, equip.shoe.name)}
                            </span>
                        </span>
                        : <span >无</span>
                }
                <span className="g_u"><span onClick={() => { pageCheng('list', 5, 'shoe') }}>换</span></span>
            </div>
            <div>
                <span className="g_b">戒指</span>：
                {
                    equip.ring ?
                        <span className="g_u">
                            <span
                                onClick={() => {
                                    clickEquip('ring')
                                }}>
                                {getEquipName(equip.ring.ext, equip.ring.name)}
                            </span>
                        </span>
                        : <span >无</span>
                }
                <span className="g_u"><span onClick={() => { pageCheng('list', 6, 'ring') }}>换</span></span>
            </div>
            <div>
                <span className="g_b">项链</span>：
                {
                    equip.necklace ?
                        <span className="g_u">
                            <span
                                onClick={() => {
                                    clickEquip('necklace')
                                }}>
                                {getEquipName(equip.necklace.ext, equip.necklace.name)}
                            </span>
                        </span>
                        : <span >无</span>
                }
                <span className="g_u"><span onClick={() => { pageCheng('list', 7, 'necklace') }}>换</span></span>
            </div>
            <div>==法宝==</div>
            {roleInfo.role_level > 65 && (
                <div>
                    <span className="g_b">法宝</span>：
                    {
                        equip.treasure1 ?
                            <span className="g_u">
                                <span
                                    onClick={() => {
                                        clickEquip('treasure1')
                                    }}>
                                    {getEquipName(equip.treasure1.ext, equip.treasure1.name)}
                                </span>
                            </span>
                            : <span >无</span>
                    }
                    <span className="g_u"><span onClick={() => { pageCheng('list', 8, 'treasure1') }}>换</span></span>
                </div>
            )}
            {roleInfo.role_level > 65 && (
                <div>
                    <span className="g_b">法宝</span>：
                    {
                        equip.treasure2 ?
                            <span className="g_u">
                                <span
                                    onClick={() => {
                                        clickEquip('treasure2')
                                    }}>
                                    {getEquipName(equip.treasure2.ext, equip.treasure2.name)}
                                </span>
                            </span>
                            : <span >无</span>
                    }
                    <span className="g_u"><span onClick={() => { pageCheng('list', 8, 'treasure2') }}>换</span></span>
                </div>
            )}
            {roleInfo.role_level > 74 && (
                <div>
                    <span className="g_b">法宝</span>：
                    {
                        equip.treasure3 ?
                            <span className="g_u">
                                <span
                                    onClick={() => {
                                        clickEquip('treasure3')
                                    }}>
                                    {getEquipName(equip.treasure3.ext, equip.treasure3.name)}
                                </span>
                            </span>
                            : <span >无</span>
                    }
                    <span className="g_u"><span onClick={() => { pageCheng('list', 8, 'treasure3') }}>换</span></span>
                </div>
            )}
            {roleInfo.role_level > 74 && (
                <div>
                    <span className="g_b">法宝</span>：
                    {
                        equip.treasure4 ?
                            <span className="g_u">
                                <span
                                    onClick={() => {
                                        clickEquip('treasure4')
                                    }}>
                                    {getEquipName(equip.treasure4.ext, equip.treasure4.name)}
                                </span>
                            </span>
                            : <span >无</span>
                    }
                    <span className="g_u"><span onClick={() => { pageCheng('list', 8, 'treasure4') }}>换</span></span>
                </div>
            )}
            <div><span onClick={backGrand} className="g_b">返回游戏</span></div>
        </div>
    )
}

export default Equip;