import React from "react";
import { getEquipName, EQUIP_POS_LIST } from '@utils/equip';
import { jumpDetail, jumpEquipList } from '@utils/jumpPage';

const detail = ({ petRoom, petInfo, history }) => {
    const { equip, level, id } = petInfo;
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
                            <span className="g_u">
                                {
                                    equip[value] ? (
                                        <span onClick={() => {
                                            jumpDetail(history, {
                                                p: 3,
                                                form: 6,
                                                pos: value,
                                                petId: id
                                            });
                                        }}> {getEquipName(equip[value])}</span>
                                    ) : '无'
                                }
                            </span>
                            {
                                petRoom && (
                                    <span className="g_u">
                                        <span onClick={() => {
                                            jumpEquipList({
                                                posInx: index + 1,
                                                form: 2,
                                                petId: id
                                            });
                                        }}>换</span>
                                    </span>
                                )
                            }
                        </div>
                    )
                })
            }
        </div>
    )

}

export default detail;

