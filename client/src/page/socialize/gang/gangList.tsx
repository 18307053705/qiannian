import React, { useState, useEffect } from 'react';
import { List } from '@components/index';
import { getsocializeList } from '@cgi/socialize';


export const gangList = ({ setRoleId }) => {
    const [list, setList] = useState([]);
    useEffect(() => {
        // 店铺列表
        getsocializeList({ type: 1 }).then(({ data }) => {
            setList(data)
        })
    }, [])



    return (
        <List
            data={list}
            prefix_d={true}
            prefix={(row, index) => (<span className='g_u_end' onClick={() => { setRoleId(row.role_id) }}>{index}.{row.name}</span>)}
        />
    )


}

export default gangList;