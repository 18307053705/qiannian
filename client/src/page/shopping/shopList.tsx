import React, { useState, useEffect } from 'react';
import { List } from '@components/index';
import { getShopList } from '@cgi/shopping';


export const Shopping = ({ setRoleId }) => {
    const [list, setList] = useState([]);
    useEffect(() => {
        // 店铺列表
        getShopList().then(({ data }) => {
            setList(data)
        })
    }, [])



    return (
        <List
            data={list}
            prefix_d={true}
            prefix={(row, index) => (<span  className='g_u_end' onClick={() => { setRoleId(row.role_id) }}>{index}.{row.name}</span>)}
        />
    )


}

export default Shopping;