import React, { useState } from 'react';
import Tab from '@components/tab';
import GangDetail from './gangDetail';
import List from '@components/list';
const list = [
    { value: 1, label: '我的帮会' },
    { value: 2, label: '帮会列表' },
]
export const Gang = ({ history, data, socialize }) => {
    const [key, setKey] = useState(1);
    return (
        <div>
            <Tab list={list} currentKey={key} onCheng={setKey} />
            {
                key === 1 ? <GangDetail history={history} socialize={socialize} />
                    : <List
                        data={data}
                        prefix={(row, index) => (<span>{index}.{row.name}</span>)}
                        active={(row, index) => (<span>申请入帮</span>)}
                    />
            }


        </div>
    )


}

export default Gang;