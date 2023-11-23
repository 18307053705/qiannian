import React, { useState, useEffect } from 'react';
import { getEquipList } from '@cgi/equip';
import { petWearEquip } from '@cgi/pet';
import { List } from '@components/list'
import { getEquipName, EQUIP_POS_LIST } from '@utils/equip';
import { operate } from '@cgi/knapsack';
import { jumpDetail } from '@utils/jumpPage'


export const EquipList = ({ history }) => {
    const { state } = history.location;
    const { posInx, form, petId } = state;
    const [list, setList] = useState();
    useEffect(() => {
        getEquipList().then(({ data }) => {
            const posv = posInx > 7 ? 8 : posInx;
            setList(data.filter((itme) => itme.pos === posv));
        })

    }, [])


    const operateClick = (in_x) => {
        const posKey = EQUIP_POS_LIST[posInx - 1].value;
        const resquet = form === 2 ? petWearEquip : operate;
        resquet({
            s: 1,
            posKey,
            type: 1,
            in_x,
            petId
        }).then(({ message }) => {
            if (!message) {
                history.goBack();
            }
        })
    }

    const prefix = (itme, index) => {
        return (
            <span
                className='g_u_end'
                key={index}
                onClick={() => {
                    jumpDetail( { form: 1, uid: itme['uid'],isEquip:true })
                }}
            >
                {index}.{getEquipName(itme)}
            </span>
        )
    }
    const active = ({ in_x }, index) => {
        return (
            <span key={`${index}_1`} className='g_u_end' onClick={() => { operateClick(in_x) }}>换</span>
        )
    }

    return (
        <div>
            <List data={list} prefix={prefix} active={active} prefix_d={true} />
            <div><span className='g_u_end' onClick={() => { history.goBack(); }}>返回上页</span></div>
        </div>

    )
}

export default EquipList;