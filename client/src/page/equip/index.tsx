import React, { useState, useEffect } from 'react';
import { backGrand } from '@utils/grand';
import { getRoleInfo, initRoleInfo } from '@cgi/roleInfo';
import { getEquipName, EQUIP_POS_LIST } from '@utils/equip';
import { jumpDetail, jumpEquipList, jumpMakeEquip, jumpSuitDetail } from '@utils/jumpPage';
export const EquipList = () => {
    const [roleInfo, setRoleInfo] = useState(initRoleInfo);
    useEffect(() => {
        getRoleInfo().then(({ data }) => {
            setRoleInfo(data);
        })
    }, [])


    const equipClick = (pos) => {
        jumpDetail({
            isEquip: true,
            form: 2,
            pos,
        })
    }
    const { equip_pool: equip, role_level } = roleInfo;
    const { suit = [] } = equip as any;
    return (
        <div>
            {
                EQUIP_POS_LIST.map(({ label, value, condition = 0 }, index) => {
                    if (role_level < condition) {
                        return null;
                    }
                    return (
                        <div key={index}>
                            {index === 7 && <div>==法宝==</div>}
                            <span className="g_b">{label}</span>
                            {equip[value] ? (
                                <span
                                    className="g_u_end"
                                    onClick={() => { equipClick(value); }}
                                >
                                    {getEquipName(equip[value])}
                                </span>
                            ) : '无'}
                            <span> | </span>
                            <span className="g_u_end" onClick={() => {
                                jumpEquipList({ posInx: index + 1, form: 1, path: '/equip' });
                            }}>换</span>
                        </div>
                    )
                })
            }
            {
                suit.map(({ n, id }) => (
                    <div key={id}>【套装】<span className="g_u_end" onClick={() => { jumpSuitDetail(id) }}>{n}</span></div>
                ))
            }
            {role_level >= 30 && (
                <div><span className='g_u_end' onClick={() => { jumpMakeEquip('world', role_level) }}>前往打造声望套装</span></div>
            )}

            {role_level >= 60 && (
                <div><span className='g_u_end' onClick={() => { jumpMakeEquip('exploit', role_level) }}>前往打造功勋套装</span></div>
            )}
            {role_level >= 66 && (
                <div><span className='g_u_end' onClick={() => { jumpMakeEquip('faBao', role_level) }}>前往打造法宝</span></div>
            )}
            <span className='g_u'><span onClick={() => { jumpMakeEquip('gang') }}>帮会装备</span></span>
            <div><span className="g_u_end" onClick={() => { jumpMakeEquip('marriage') }}>情缘装备</span></div>
            <div><span onClick={backGrand} className="g_u_end">返回游戏</span></div>
        </div>
    )
}

export default EquipList;