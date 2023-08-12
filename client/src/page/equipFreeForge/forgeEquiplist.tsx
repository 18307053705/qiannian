import React, { useState, useEffect } from 'react';
import { List } from '@components/list';
import { getKnapsack } from '@cgi/knapsack';


export const Equiplist = ({ historyClick }) => {
    const [equipList, setEquipList]: any = useState([]);
    useEffect(() => {
        getKnapsack({ type: 1 }).then(({ data }) => {
            const list: any[] = [];
            data.list.forEach((itme, index) => {
                if (itme.p === 3) {
                    list.push({
                        ...itme,
                        in_x: index
                    })
                }
            })
            setEquipList(list);
        })
    }, [])
    const prefix = ({ n }) => {
        return <span>{n}</span>
    }
    const active = ({ in_x }) => {
        return <span className="g_u_end" onClick={() => { historyClick({ in_x, pageKey: 'forge' }) }}>选择</span>
    }
    return (
        <div>
            <List data={equipList} prefix={prefix} active={active} />
            <div><span className='g_u_end' onClick={() => { historyClick({ in_x: -1 }) }}>返回上页</span></div>
        </div>

    )
}

export default Equiplist;