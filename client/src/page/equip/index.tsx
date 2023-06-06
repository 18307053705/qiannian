import React, { useEffect } from 'react';
import { getRoleInfo } from '@cgi/roleInfo';
import { backGrand } from '@utils/grand';

export const Equip = () => {
    useEffect(() => {
        getRoleInfo().then(res => {
            console.log(res, 'Equip....')
        })
    }, [])
    return (
        <div>

            <div>装备界面</div>
            <div onClick={backGrand}>返回游戏</div>
        </div>
    )
}

export default Equip;