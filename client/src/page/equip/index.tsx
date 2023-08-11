import React, { useState, useEffect } from 'react';
import { backGrand } from '@utils/grand';
import { getRoleInfo, initRoleInfo } from '@cgi/roleInfo';
import { getEquipName, EQUIP_POS_LIST } from '@utils/equip';
import { jumpDetail, jumpEquipList, jumpMakeEquip } from '@utils/jumpPage';
export const EquipList = ({ history }) => {
    const [roleInfo, setRoleInfo] = useState(initRoleInfo);
    useEffect(() => {
        getRoleInfo().then(({ data }) => {
            setRoleInfo(data);
        })
    }, [])


    const equipClick = (pos) => {
        jumpDetail(history, {
            p: 3,
            form: 2,
            pos,
        })
    }
    const { equip_pool: equip, role_level } = roleInfo;

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
                                jumpEquipList({ posInx: index + 1, form: 1 });
                            }}>换</span>
                        </div>
                    )
                })
            }
            {role_level >= 35 && (
                <div><span className='g_u_end' onClick={() => { jumpMakeEquip('world', role_level) }}>前往打造声望套装</span></div>
            )}

            {role_level >= 65 && (
                <div><span className='g_u_end' onClick={() => { jumpMakeEquip('exploit', role_level) }}>前往打造功勋套装</span></div>
            )}
            {role_level >= 66 && (
                <div><span className='g_u_end' onClick={() => { jumpMakeEquip('faBao', role_level) }}>前往打造法宝</span></div>
            )}
{/* 
            <div><span className='g_u_end' onClick={() => { jumpMakeEquip('gang', role_level) }}>前往打造帮会套装</span></div>
            <div><span className='g_u_end' onClick={() => { jumpMakeEquip('marriage', role_level) }}>前往打造情缘套装</span></div> */}

            <div><span onClick={backGrand} className="g_u_end">返回游戏</span></div>
        </div>
    )
}

export default EquipList;