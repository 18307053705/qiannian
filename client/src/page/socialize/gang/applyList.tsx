import React, { useState, useEffect } from 'react';
import { List } from '@components/index';
import { getsocializeList } from '@cgi/socialize';


export const gangList = ({ setRoleId,info }) => {
    // const [list, setList] = useState([]);
    useEffect(() => {
        // // 店铺列表
        // getsocializeList({ type: 1 }).then(({ data }) => {
        //     setList(data)
        // })
        console.log('挂载申请....')
    }, [])
    console.log(info,'gangList.info...')
    return (
        <List
            data={info.apply}
            prefix_d={true}
            prefix={(row, index) => (<span className='g_u_end' onClick={() => { setRoleId(row.role_id) }}>{index}.{row.name}</span>)}
        />
    )


}

export default gangList;