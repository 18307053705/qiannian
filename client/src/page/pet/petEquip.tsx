import React from "react";
import { getEquipName, EQUIP_POS_LIST } from '@utils/equip';
const detail = ({ equip, level, state, history }) => {
    return (
        <div>
            {
                EQUIP_POS_LIST.map(({ label, value, condition = 0 }, index) => {
                    if (level < condition) {
                        return null;
                    }
                    return (
                        <div key={index}>
                            <span>{label}：</span>
                            {equip[value] ? <span
                                onClick={() => {
                                    history.push('/articleDetail', { id: equip[value]['id'], in_x: index + 1, kanapsackType: 2, p: 3 });
                                }}
                                className="g_u_end"
                            >
                                {getEquipName(equip[value].ext, equip[value].name)}
                            </span> : '无'}
                            {(state === 1 || state === 2) && (
                                <span><span> | </span>
                                    <span
                                        className="g_u_end"
                                    // onClick={() => { pageCheng('list', index >= 7 ? 8 : index + 1, value) }}
                                    >换</span></span>
                            )}


                        </div>
                    )
                })
            }

        </div>
    )

}

export default detail;

