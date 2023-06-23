import React, { useState, useEffect } from 'react';
import { getRoleInfo, initRoleInfo } from '@cgi/roleInfo';
import { backGrand } from '@utils/grand';
import { getEquipName, EQUIP_POS_LIST } from '@utils/equip';

export const Equip = ({ pageCheng, history }) => {
    const [roleInfo, setRoleInfo] = useState(initRoleInfo);
    useEffect(() => {
        getRoleInfo().then(({ data }) => {
            setRoleInfo(data);
        })
    }, [])
    const equip = roleInfo.equip_pool;

    // const clickEquip = (key) => {
    //     const { id } = equip[key];
    //     history.push('/articleDetail', { id, p: 3, posKey: key })
    // }

    return (
        <div>
            {
                EQUIP_POS_LIST.map(({ label, value, condition = 0 }, index) => {
                    if (roleInfo.role_level < condition) {
                        return null;
                    }
                    return (
                        <div key={index}>
                            {index === 7 && <div>==法宝==</div>}
                            <span className="g_b">{label}</span>
                            {equip[value] ? (
                                <span
                                    className="g_u_end"
                                    onClick={() => {
                                        history.push('/articleDetail', { id: equip[value]['id'], in_x: index + 1, kanapsackType: 2,p:3 });
                                    }}
                                >
                                    {getEquipName(equip[value].ext, equip[value].name)}
                                </span>
                            ) : '无'}
                            <span> | </span>
                            <span className="g_u_end" onClick={() => { pageCheng('list', index >= 7 ? 8 : index + 1, value) }}>换</span>
                        </div>
                    )
                })
            }
            <div><span onClick={backGrand} className="g_u_end">返回游戏</span></div>
        </div>
    )
}

export default Equip;