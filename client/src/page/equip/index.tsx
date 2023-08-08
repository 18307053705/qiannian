import React, { useState, useEffect } from 'react';
import { backGrand } from '@utils/grand';
import { getRoleInfo, initRoleInfo } from '@cgi/roleInfo';
import { getEquipName, EQUIP_POS_LIST } from '@utils/equip';
import { jumpDetail, jumpEquipList } from '@utils/jumpPage';
export const Equip = ({ history }) => {
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
    const equip = roleInfo.equip_pool;
    return (
        <div>
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

            </div>
            <div><span onClick={backGrand} className="g_u_end">返回游戏</span></div>
        </div>
    )
}

export default Equip;