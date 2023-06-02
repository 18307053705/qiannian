import React, { useState } from 'react';
import Tab from '@components/tab';
import RanksDetail from './ranksDetail';
import List from '@components/list';
const list = [
    { value: 1, label: '我的队伍' },
    { value: 2, label: '队伍列表' },
]
export const Gang = ({ history, data, socialize }) => {
    const [key, setKey] = useState(1);
    return (
        <div>
            <Tab list={list} currentKey={key} onCheng={setKey} />
            {
                key === 1 ? <RanksDetail history={history} />
                    : <List
                        data={data}
                        prefix={(row, index) => (<span>{index}.{row.name}</span>)}
                        active={(row, index) => (<span>申请入队</span>)}
                    />
            }


        </div>
    )


}

export default Gang;