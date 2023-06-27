import React, { useState, useEffect } from 'react';
import { backGrand } from '@utils/grand';
import { Tab } from '@components';
import { getTreasure, setTreasure } from '@cgi/treasure';

const tabList = [
    { value: 2, label: "勋章" },
    { value: 3, label: "令牌" },
    { value: 4, label: "徽标" }
];

const treasure_meun = {
    2: {
        name: '勋章',
        active: '打磨',
        integral: '帮会声望',
        exp: '荣誉',
        id: 'xz',
        getAttrText: (exp) => {
            const atk_max = Math.floor(exp / 500) + 100;
            const atk_min = Math.floor(exp / 1000) + 75;
            const hit = Math.floor(exp / 5000) + 10;
            return [
                `攻击[${atk_min}-${atk_max}]`,
                `命中[${hit}]`
            ]
        }
    },
    3: {
        name: '令牌',
        active: '精磨',
        integral: '结义声望',
        exp: '忠义',
        id: 'lp',
        getAttrText: (exp) => {
            const atk_max = Math.floor(exp / 500) + 100;
            const atk_min = Math.floor(exp / 1000) + 75;
            const hit = Math.floor(exp / 5000) + 10;
            return [
                `防御[${atk_min}-${atk_max}]`,
                `闪避[${hit}]`
            ]
        }
    },
    4: {
        name: '徽标',
        active: '雕刻',
        integral: '世界功勋',
        exp: '名望',
        id: 'hb',
        getAttrText: (exp) => {
            const attr = Math.floor(exp / 5000) + 10;
            return [
                `命中[${attr}]`,
                `闪避[${attr}]`,
                `暴击[${attr}]`,
            ]
        }
    },
}


const getName = (exp, name) => {
    if (exp < 5000) {
        return `黑铁${name}`;
    }
    if (exp < 10000) {
        return `青铜${name}`;
    }
    if (exp < 50000) {
        return `白银${name}`;
    }
    if (exp < 100000) {
        return `【黄金${name}】`;
    }
    if (exp < 500000) {
        return `【白金${name}】`;
    }
    if (exp < 1000000) {
        return `【钻石${name}】`;
    }
    if (exp < 5000000) {
        return `【星耀${name}】`;
    }
    if (exp < 10000000) {
        return `〓王者${name}〓`;
    }
    return `〓千年第一${name}〓`;

}

export const Treasure = () => {
    const [data, setData] = useState();
    const [key, setKey]: any = useState(2);

    const getData = () => {
        getTreasure().then(({ data }) => {
            setData(data);
        })
    }

    const setClick = (type) => {
        setTreasure({
            type,
            key
        }).then(({ message }) => {
            message || getData();
        })
    }
    useEffect(getData, [])
    if (!data) {
        return null;
    }
    if (!data.limits) {
        return (
            <div>
                <span>50级后可以开启珍宝功能,赶快去练级吧。</span>
                <div><span onClick={backGrand} className="g_u_end">返回游戏</span></div>
            </div>
        )
    }
    const treasure = treasure_meun[key];
    const { exp, s } = data[treasure.id];
    return (
        <div>
            <Tab list={tabList} currentKey={key} onCheng={setKey} />
            <div>{getName(exp, treasure.name)}</div>
            <div>{treasure.exp}:{exp}</div>
            {
                exp >= 10000000 ? <div>已达到顶级不能再操作。</div> :
                    (<div>
                        <div>
                            <span className='g_u_end' onClick={() => { setClick(1) }}>
                                {treasure.active}({s > 10 ? '25元宝' : `${10 - s}次免费`})
                            </span>
                        </div>
                        <div>
                            <span className='g_u_end' onClick={() => { setClick(2) }}>
                                {treasure.active}({s > 10 ? '50声望' : `${10 - s}次免费`})
                            </span>
                        </div>
                    </div>)
            }
            {treasure.getAttrText(exp).map((itme, index) => (<div key={index}>{itme}</div>))}

            <div><span onClick={backGrand} className="g_u_end">返回游戏</span></div>
        </div>
    )
}

export default Treasure;