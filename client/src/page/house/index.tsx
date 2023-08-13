import React, { useState, useEffect } from 'react';
import { backGrand } from '@utils/grand';
import { getTreasure, setTreasure, mosaic, atry } from '@cgi/treasure';

const decoration = [
    {
        text: '玉瓷百花瓶',
        id: 296,
    },
    {
        text: '檀木花纹桌',
        id: 297,
    },
    {
        text: '红杏闹春帘',
        id: 298,
    },
    {
        text: '日月春秋床',
        id: 299,
    },
    {
        text: '锦绣山河画',
        id: 300,
    },
    {
        text: '江山社稷图',
        id: 301,
    },
    {
        text: '九州观星台',
        id: 302,
    }
]

const getName = (exp) => {
    if (exp < 5000) {
        return '破旧草屋';
    }
    if (exp < 10000) {
        return '简陋木屋';
    }
    if (exp < 50000) {
        return '[红砖屋]';
    }
    if (exp < 100000) {
        return '【绿柳庄】';
    }
    if (exp < 500000) {
        return '【青云观】';
    }
    if (exp < 1000000) {
        return '【摘星楼】';
    }
    if (exp < 5000000) {
        return '【星辰阁】';
    }
    if (exp < 10000000) {
        return '〓问天府〓';
    }
    return '〓千年第一院〓';

}

export const House = () => {
    const [data, setData] = useState();
    const [updata, setUpdata] = useState(false);
    const [limits, setlimits] = useState(false);

    useEffect(() => {
        getTreasure().then(({ data }) => {
            setData(data.fw);
            setlimits(data.limits)
        })
    }, [updata])

    if (!data) {
        return null;
    }
    if (!limits) {
        return (
            <div>
                <span>50级后可以开启房屋功能,赶快去练级吧。</span>
                <div><span onClick={backGrand} className="g_u_end">返回游戏</span></div>
            </div>
        )
    }
    const { exp, ext, s, g } = data;
    const extList = ext.split('_');
    const attr = Math.floor(exp / 50) + 1000;

    const callback = ({ message }) => {
        !message && setUpdata(!updata);
    }

    const setClick = (key) => {
        setTreasure({
            type: 1,
            key
        }).then(callback)
    }

    return (
        <div>
            <div>{getName(exp)}</div>
            <div>清洁度:{exp}</div>
            {
                exp < 10000000 && (
                    <div>
                        <div>
                            <span className='g_u_end' onClick={() => { setClick(1) }}>
                                清洁({!s ? '25元宝' : `${s}次免费`})
                            </span>
                        </div>
                        <div>
                            <span className='g_u_end' onClick={() => { setClick(2) }}>
                                清洁({!s ? '50声望' : `${s}次免费`})
                            </span>
                        </div>
                    </div>
                )
            }

            <div>生命[+{attr}]</div>
            <div>法力[+{attr}]</div>
            {
                decoration.map(({ id, text }, index) => {
                    return (
                        <div key={index}>
                            <span>{text}({extList[index]})</span>
                            {extList[index] < 10 && <span> | </span>}
                            {extList[index] < 10 && <span className='g_u_end' onClick={() => { mosaic({ id }).then(callback) }}>摆放</span>}
                        </div>
                    )
                })
            }
            {g === 0 && (
                <div>
                    <span>只需200元宝既有机会获得豪华住宅,每个角色只有一次机会。</span>
                    <span className='g_u_end' onClick={() => { atry().then(callback) }}>搏一下</span>
                </div>
            )}
            <div><span onClick={backGrand} className="g_u_end">返回游戏</span></div>
        </div>
    )
}

export default House;