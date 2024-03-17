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
    {
        label: '副本',
        value: 5
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
            label: '葬剑冢'
        },
    ],
    2: [
        {
            id: '20000,0,0',
            label: '盘丝洞'
        },
        {
            id: '20001,0,0',
            label: '妖魔寨'
        },
        {
            id: '20002,0,0',
            label: '不夜城'
        },
        {
            id: '20003,0,0',
            label: '迷雾森林'
        },
        {
            id: '20004,0,0',
            label: '妖魔岭'
        },
    ],
    3: [
        {
            id: '30000,0,0',
            label: '蓬莱仙岛'
        },
        {
            id: '30001,0,0',
            label: '九仙山'
        },
        {
            id: '30002,0,0',
            label: '九天虚无岛'
        },
        {
            id: '30003,0,0',
            label: '堕仙涧'
        },
        {
            id: '30004,0,0',
            label: '云顶天宫'
        },
    ],
    4: [
        {
            id: '40000,0,0',
            label: '云荒大陆'
        },
        {
            id: '40001,0,0',
            label: '无妄海'
        },
        {
            id: '40002,0,0',
            label: '十万大山'
        },
        {
            id: '40003,0,0',
            label: '南海琉璃宫'
        },
        {
            id: '40004,0,0',
            label: '幽冥地府'
        },
    ],
    5: [
        {
            id: '50000,0,0',
            label: '炼魂洞'
        },
        {
            id: '50001,0,0',
            label: '黑炎宗'
        },
        {
            id: '50002,0,0',
            label: '四海龙宫'
        },
        {
            id: '50003,0,0',
            label: '凤凰山'
        },
        {
            id: '50004,0,0',
            label: '御风宗'
        },
        {
            id: '50005,0,0',
            label: '海底魔宫'
        },
        {
            id: '50006,0,0',
            label: '天魔宫殿'
        },
        {
            id: '50007,0,0',
            label: '上古地府'
        },
        {
            id: '50008,0,0',
            label: '魔族遗迹'
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