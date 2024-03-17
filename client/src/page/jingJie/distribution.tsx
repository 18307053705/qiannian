import React, { useState, useEffect } from 'react';


import Style from './index.less';


const list = [
    {
        key: 'ti_zhi',
        text: '体魄',
    },
    {
        key: 'geng_gu',
        text: '根骨',
    },
    {
        key: 'bi_li',
        text: '臂力',
    },
    {
        key: 'nai_li',
        text: '耐力',
    },
    {
        key: 'shen_fa',
        text: '身法',
    }
]

export default ({ setPageKey, data, distributionPotentiaClick }) => {
    const [addNum, setAddNum] = useState({ ti_zhi: 0, geng_gu: 0, bi_li: 0, nai_li: 0, shen_fa: 0 });
    const [error, setError] = useState('');

    const { potential, qian_li } = data;

    const onChange = (key, e) => {
        let value = e.target.value;

        setAddNum({
            ...addNum,
            [key]: Math.floor(value)
        })
    }

    const check = () => {
        setError('');
        const num = Object.values(addNum).reduce((a, b) => a + b, 0);
        if (num === 0) {
            return;
        }
        if (num > qian_li) {
            setError('可分配潜力值不足')
            return;
        }
        distributionPotentiaClick(addNum);
    }
    return (
        <div>
            {error && <div className='g_error'>提示：{error}</div>}
            <div>可分配潜力：{qian_li}</div>
            {
                list.map(({ key, text }) => {
                    return (
                        <div className={Style.input} key={key}>
                            <span> {text}({potential[key]})：</span>
                            <input
                                className={Style.connet}
                                type='number'
                                value={addNum[key]}
                                onChange={(e) => { onChange(key, e) }}
                            />
                        </div>
                    )
                })
            }
            <div><span className='g_u_end' onClick={check}>确定分配</span></div>
            <div>========属性=========</div>
            <div>生命：{potential.ti_zhi * 100}</div>
            <div>法力：{potential.geng_gu * 100}</div>
            <div>攻击：{potential.bi_li * 8} - {potential.bi_li * 12}</div>
            <div>防御：{potential.nai_li * 4} - {potential.nai_li * 5}</div>
            <div>命中：{potential.shen_fa * 3}</div>
            <div>命中：{potential.shen_fa * 3}</div>
            <div>闪避：{potential.shen_fa * 2}</div>
            <div>暴击：{potential.shen_fa * 2}</div>
            <div><span className="g_u_end" onClick={() => { setPageKey('base') }}>返回上页</span></div>
        </div>
    )

}
