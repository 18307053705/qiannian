import React, { useState } from 'react';
import { List, Tab } from '@components';
import { tpDir } from '@cgi/grand';
import { backGrand } from '@utils/grand';
const tabList = [
    {
        label: '人族',
        value: 1
    },
    {
        label: '妖族',
        value: 2
    },
    {
        label: '仙族',
        value: 3
    },
    {
        label: '中立',
        value: 4
    },
]

const mapList = {
    1: [
        {
            id: '10000,0,0',
            label: '隐仙村'
        },
        {
            id: '10001,0,0',
            label: '剑舞城'
        },
        {
            id: '10002,0,0',
            label: '大泽谷'
        },
        {
            id: '10003,0,0',
            label: '映月崖'
        },
        {
            id: '10004,0,0',
            label: '不归谷'
        },
    ],
    2: [
        {
            id: '20000,0,0',
            label: '蓬莱岛'
        },
        {
            id: '20001,0,0',
            label: '九仙山'
        },
        {
            id: '20002,0,0',
            label: '九天虚无岛'
        },
        {
            id: '20003,0,0',
            label: '九重天'
        },
        {
            id: '20004,0,0',
            label: '云顶天宫'
        },
    ],
    3: [
        {
            id: '30000,0,0',
            label: '盘丝洞'
        },
        {
            id: '30001,0,0',
            label: '妖魔寨'
        },
        {
            id: '30002,0,0',
            label: '不夜城'
        },
        {
            id: '30003,0,0',
            label: '迷雾之谷'
        },
        {
            id: '30004,0,0',
            label: '封魔之地'
        },
    ],
    4: [
        {
            id: '30000,0,0',
            label: '云荒大陆'
        },
        {
            id: '30001,0,0',
            label: '无妄海'
        },
        {
            id: '30002,0,0',
            label: '南海琉璃宫'
        },
        {
            id: '30003,0,0',
            label: '十万大山'
        },
    ],
}

const WorldMap = () => {
    const [page, setPage] = useState(1)

    const data = mapList[page];

    const tpClick = (address) => {
        tpDir({ dir: address }).then(() => {
            backGrand();
        })

    }


    const prefix = ({ id, label }) => {
        return (
            <span key={id} className="g_u_end" onClick={() => { tpClick(id) }}>{label}</span>
        )
    }

    return (
        <div>
            <Tab list={tabList} currentKey={page} onCheng={setPage} />
            <List data={data} prefix={prefix} hiddenFooter={true} />
            <div>=================</div>
            <div>
                <span className="g_u_end" onClick={backGrand}>返回游戏</span>
            </div>
        </div>
    )

}

export default WorldMap;