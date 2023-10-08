import React, { useState, useEffect } from 'react';
import { backGrand } from '@utils/grand';
import { getRankInfo, getRankReward } from '@cgi/cailingdong';
import { List, TpBtn } from '@components';

function getRankList(rank) {
    return Object.values(rank).sort((pre: any, next: any) => {
        if (pre.v === next.v) {
            return pre.s - next.s;
        }
        return next.v - pre.v;
    })
}

export const CaiLingDong = () => {
    const [data, setData]: any = useState(null);
    const [prizeInfo, setPrizeInfo]: any = useState(null);
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
            setPrizeInfo(data);
        })
    }

    const { rank, rankId } = data;
    return (
        <div>
            {
                prizeInfo && (
                    <div>
                        <div>成功领取奖励!</div>
                        <div>世界声望:{prizeInfo.world}</div>
                        <div>元宝:{prizeInfo.yuanbao}</div>
                        <div>银两:{prizeInfo.tael}</div>
                        <div>灵血:{prizeInfo.lingXue}</div>
                    </div>
                )
            }
            <div>彩灵洞活动，每日21:00火热开启,击杀彩灵可获得队伍积分,积分排名前三的队伍即可领奖丰富奖励！</div>
            <div><TpBtn name='进入彩灵洞' dir='60004,0,0' /></div>
            <div>=======积分排名信息=======</div>

            <List data={getRankList(rank)} prefix={({ n, v }, index) => <div className='g_u_end'>第{index}名：{n}[积分：{v}]</div>} />
            {rank[rankId] && <span className='g_u_end' onClick={rankReward}>排名奖励</span>}
            <div><span onClick={backGrand} className="g_u_end">返回游戏</span></div>
        </div>
    )
}

export default CaiLingDong;