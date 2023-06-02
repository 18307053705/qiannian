import React, { useState } from 'react';
import Tab from '@components/tab';
import IntersectDetail from './intersectDetail';
import List from '@components/list';
const list = [
    { value: 1, label: '我的庄园' },
    { value: 2, label: '庄园列表' },
]
export const Intersect = ({ history, data, socialize }) => {
    const [key, setKey] = useState(1);
    return (
        <div>
            <Tab list={list} currentKey={key} onCheng={setKey} />
            {
                key === 1 ? <IntersectDetail history={history} />
                    : <List
                        data={data}
                        prefix={(row, index) => (<span>{index}.{row.name}</span>)}
                        active={(row, index) => (<span>申请入庄</span>)}
                    />
            }


        </div>
    )


}

export default Intersect;