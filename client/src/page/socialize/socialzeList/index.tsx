import React, { useState, useEffect } from 'react';
import { List } from '@components/index';
import { getsocializeList, socializeApply } from '@cgi/socialize';


export const gangList = ({ history }) => {
    const [list, setList] = useState([]);
    useEffect(() => {
        const { state } = history.location;
        // 势力列表
        getsocializeList({ type: 1 }).then(({ data }) => {
            setList(data)
        })
    }, [])
    const prefix = (row, index) => {
        return (
            <span onClick={() => { }}>{index}.{row.name}({row.level}级)</span>
        )
    }
    const active = (row) => {
        return (<span key={row.id} onClick={() => { }}>加入帮会</span>)
    }


    return (
        <List
            data={list}
            prefix_d={true}
            prefix={prefix}
            active={active}
        />
    )


}

export default gangList;