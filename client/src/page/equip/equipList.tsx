import React, { useState, useEffect } from 'react';
import { getEquipList, operate } from '@cgi/knapsack';
import { List } from '@components/list'
import { getEquipName } from '@utils/equip'
export const EquipList = ({ pageCheng, posInfo,history }) => {
    const [list, setList] = useState();
    useEffect(() => {
        getEquipList().then(({ data }) => {
            setList(data.filter((itme) => itme.pos === posInfo.pos));
        })

    }, [])
    const prefix = (itme, index) => {
        return (<span className='g_u'><span>{index}.{getEquipName(itme.ext, itme.n)}</span></span>)
    }
    const active = (itme) => {
        return (
            <span onClick={() => {
                operate({
                    id: itme.id,
                    in_x: itme.in_x,
                    s: 1,
                    p: 3,
                    type: 1,
                    posKey: posInfo.key
                }).then(() => {
                    pageCheng('info')
                })
            }}>换</span>
        )
    }

    return (
        <div>
            =====
            <List data={list} prefix={prefix} active={active} prefix_d={true} />
            <div><span className="g_b" onClick={() => { pageCheng('info') }}>返回装备</span></div>
        </div>
    )
}

export default EquipList;