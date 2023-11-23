import React, { useState, useEffect } from 'react';
import { List } from '@components/list';
import { getKnapsack } from '@cgi/knapsack';
import { getEquipName, isEquip } from '@utils';

export const Equiplist = ({ historyClick }) => {
    const [equipList, setEquipList]: any = useState([]);
    useEffect(() => {
        getKnapsack({ type: 1 }).then(({ data }) => {
            setEquipList(data.list.filter(({ id }) => isEquip(id)));
        })
    }, [])
    const prefix = (equip) => {
        return <span>{getEquipName(equip)}</span>
    }
    const active = ({ uid }) => {
        return <span className="g_u_end" onClick={() => { historyClick({ uid, pageKey: 'forge' }) }}>选择</span>
    }
    return (
        <div>
            <List data={equipList} prefix={prefix} active={active} />
            <div><span className='g_u_end' onClick={() => { historyClick({ uid: -1 }) }}>返回上页</span></div>
        </div>

    )
}

export default Equiplist;