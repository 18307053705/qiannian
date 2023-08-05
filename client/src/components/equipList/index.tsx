import React, { useState, useEffect } from 'react';
import { getEquipList } from '@cgi/equip';
import { List } from '@components/list'
import { getEquipName } from '@utils/equip'
import { jumpDetail } from '@utils/jumpDetail'


export const EquipList = ({ operate, pos, history }) => {
    const [list, setList] = useState();
    useEffect(() => {
        getEquipList().then(({ data }) => {
            const posv = pos > 7 ? 8 : pos;
            setList(data.filter((itme) => itme.pos === posv));
        })

    }, [])
    const prefix = (itme, index) => {
        return (
            <span
                className='g_u_end'
                key={index}
                onClick={() => {
                    jumpDetail(history, { form: 1, p: 3, in_x: itme['in_x']})
                }}
            >
                {index}.{getEquipName(itme.ext, itme.n)}
            </span>
        )
    }
    const active = (itme, index) => {
        return (
            <span key={`${index}_1`} className='g_u_end' onClick={() => { operate(itme, pos) }}>换</span>
        )
    }

    return (
        <List data={list} prefix={prefix} active={active} prefix_d={true} />
    )
}

export default EquipList;