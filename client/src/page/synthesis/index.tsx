import React, { useState, useEffect, useMemo } from 'react';
import { backGrand, isDanYao, isDongTian } from '@utils';
import { getHandbook, manufacture } from '@cgi/synthesis';
import { Tab, List } from '@components';

const nva = [
    {
        label: '全部',
        value: 0
    },
    {
        label: '药品',
        value: 1
    },
    {
        label: '洞天',
        value: 2
    },
    {
        label: '其他',
        value: 3
    },
];


const Synthesis = () => {
    const [list, setList] = useState([]);
    const [uidInfo, setUidInfo] = useState([]);
    const [current, setCurrent] = useState(0);
    useEffect(() => {
        getHandbook().then(({ data, code }) => {
            if (code === 0) {
                setList(data)
            }
        })
    }, [])





    const prefix = ({ uid, article, materialInfo, tael }) => {
        const text = [...Object.values(materialInfo).map(({ name, s }: any) => `${name}x${s}`), `银两x${tael}`].join(',');
        return (
            <div>
                <div>
                    <span className='g_u'><span onClick={() => { setUidInfo(uid) }}>{article.name}</span></span>
                    <span className='g_u'><span onClick={() => { manufacture({ uid }) }}>合成</span></span>
                </div>
                {
                    uid === uidInfo && (
                        <div>
                            <div>简介：{article.tips}</div>
                            <div>合成材料：{text}</div>
                        </div>
                    )

                }
            </div>

        )
    }

    const data = useMemo(() => {
        if (current === 0) {
            return list;
        }
        if (current === 1) {
            return list.filter(({ uid }) => (uid + "").slice(0, 2) === '10');
        }
        if (current === 2) {
            return list.filter(({ uid }) => (uid + "").slice(0, 2) === '11');
        }
        return list.filter(({ uid }) => (uid + "").slice(0, 2) === '12');

    }, [current, list]);


    return (
        <div>
            <Tab list={nva} onCheng={setCurrent} currentKey={0} />
            <List data={data} prefix={prefix} />

            <div><span className='g_u_end' onClick={backGrand}>返回游戏</span></div>
        </div>
    )
}

export default Synthesis;