import React, { useState, useEffect } from 'react';
import { List } from '@components/index';
import { getShopList } from '@cgi/shopping';


export const Shopping = ({ historyClick }) => {
    const [list, setList] = useState([]);
    useEffect(() => {
        // 店铺列表
        getShopList().then(({ data }) => {
            setList(data)
        })
    }, [])

    const prefix = ({ role_id, name }, index) => (
        <span className='g_u_end'
            onClick={() => {
                historyClick({ page: 'detai', role_id })
            }}>
            {index}.{name}
        </span>
    )

    return (
        <List
            data={list}
            prefix_d={true}
            prefix={prefix}
        />
    )


}

export default Shopping;