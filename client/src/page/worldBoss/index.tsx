import React, { useState, useEffect } from 'react';
import { backGrand } from '@utils/grand';
import { getRoleInfo, initRoleInfo } from '@cgi/roleInfo';
import { getEquipName, EQUIP_POS_LIST } from '@utils/equip';
import { jumpDetail, jumpEquipList, jumpMakeEquip, jumpSuitDetail } from '@utils/jumpPage';
export const worldBoss = ({ history }) => {

    return (
        <div>
            世界boss
            <div><span onClick={backGrand} className="g_u_end">返回游戏</span></div>
        </div>
    )
}

export default worldBoss;