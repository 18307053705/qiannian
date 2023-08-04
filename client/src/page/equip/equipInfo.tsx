import React, { useState, useEffect } from 'react';
import { getRoleInfo, initRoleInfo } from '@cgi/roleInfo';

import { getEquipName, EQUIP_POS_LIST } from '@utils/equip';
export const Equip = ({ pageCheng, history }) => {
    const [roleInfo, setRoleInfo] = useState(initRoleInfo);
    useEffect(() => {
        getRoleInfo().then(({ data }) => {
            setRoleInfo(data);
        })
    }, [])
    const equip = roleInfo.equip_pool;

    const equipClick = (equip, in_x) => {
        history.push('/articleDetail', { id: equip['id'], in_x, kanapsackType: 2, p: 3 });
    }

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
                                    onClick={() => { equipClick(equip[value], index + 1); }}
                                >
                                    {getEquipName(equip[value].ext, equip[value].n)}
                                </span>
                            ) : '无'}
                            <span> | </span>
                            <span className="g_u_end" onClick={() => { pageCheng('list', index >= 7 ? 8 : index + 1, value) }}>换</span>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default Equip;