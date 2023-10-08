import React, { useState, useEffect } from 'react';
import { backGrand } from '@utils/grand';
import { getRankInfo, getRankReward } from '@cgi/jinyindao';
import { List, TpBtn } from '@components';


function getRankList(rank) {
    return Object.values(rank).sort((pre: any, next: any) => {
        if (pre.v === next.v) {
            return pre.s - next.s;
        }
        return next.v - pre.v;
    })
}

export const JinYinDao = () => {
    const [data, setData]: any = useState(null);
    const [prizeInfo, setPrizeInfo]: any = useState([]);
    useEffect(() => {
        getRankInfo().then(({ data }) => {
            console.log(data)
            setData(data);
        })
    }, [])
    if (!data) {
        return null;
    }
    const rankReward = () => {
        getRankReward().then(({ data }) => {
            setPrizeInfo(data.textList);
            setData((per) => ({ ...per, ids: data.ids }));
        })
    }
    const { rank, role_id, ids } = data;
    [].length
    return (
        <div>
            {
                prizeInfo.length ? <div>恭喜你在金银岛找到了大量宝藏!</div> : ''
            }
            {prizeInfo.map(({ name, value }, index) => <div key={index}>{name}:{value}</div>)}
            <div>周六，周日22:00火热开启金银岛活动,进入金银岛外围砸宝箱积可获得帮会积分,积分排名前三的帮会即可登陆金银岛进行挖宝，更有机会获得1000元宝大奖！</div>
            <div><TpBtn name='进入金银岛' dir='60005,0,0' /></div>
            <div>=======积分排名信息=======</div>
            <List data={getRankList(rank)} prefix={({ n, v }, index) => <div className='g_u_end'>第{index}名：{n}[积分：{v}]</div>} />
            <span className='g_u_end' onClick={rankReward}>金银岛挖宝({ids[role_id] || 0})</span>
            <div><span onClick={backGrand} className="g_u_end">返回游戏</span></div>
        </div>
    )
}

export default JinYinDao;