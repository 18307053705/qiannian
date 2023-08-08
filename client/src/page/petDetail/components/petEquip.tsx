import React from "react";
import { getEquipName, EQUIP_POS_LIST } from '@utils/equip';
import { jumpDetail, jumpEquipList } from '@utils/jumpPage';

export const PetEquip = ({ petInfo, history }) => {
    const { equip, level, id ,state} = petInfo;
    const isFight = state === 1 || state === 2;
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
                                isFight && (
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


