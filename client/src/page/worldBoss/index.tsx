import React, { useState, useEffect } from 'react';
import { backGrand } from '@utils/grand';
import { atkBoss, getBossInfo, getShedReward, getRankReward } from '@cgi/WorldBoss';
import { List } from '@components';

console.log(atkBoss, 'atkBoss...');
console.log(getBossInfo, 'getBossInfo...');
console.log(getRankReward, 'getRankReward...');
console.log(getRankReward, 'getRankReward...');
function getRankList(rank) {
    return Object.values(rank).sort((pre: any, next: any) => {
        if (pre.v === next.v) {
            return pre.s - next.s;
        }
        return next.v - pre.v;
    })
}

export const WorldBoss = () => {
    const [bossInfo, setBossInfo]: any = useState(null);
    const [prizeInfo, setPrizeInfo]: any = useState(null);

    useEffect(() => {
        getBossInfo().then(({ data }) => {
            console.log(data)
            setBossInfo(data);
        })
    }, [])
    if (!bossInfo) {
        return null;
    }

    const atkBossClick = () => {
        atkBoss().then(({ data }) => {
            setBossInfo({
                ...bossInfo,
                ...data,
            });
        })
    }

    const pickupClick = (id_x) => {
       
        getShedReward({ id_x }).then(({ data }) => {
            setBossInfo({
                ...bossInfo,
                ...data,
            });
        })
    }

    const rankReward = () => {
     
        getRankReward().then(({ data }) => {
            setPrizeInfo(data);
        })
    }



    const { boss, rank, dps, shed } = bossInfo;
    const { life } = boss;
    const dpsText = dps !== undefined ? `[-${dps}]` : '';
    return (
        <div>
            {
                prizeInfo && (
                    <div>
                        <div>成功领取奖励!</div>
                        <div>世界声望:{prizeInfo.world}</div>
                        <div>元宝:{prizeInfo.yuanbao}</div>
                        <div>银两:{prizeInfo.tael}</div>
                    </div>
                )
            }
            <div>世界BOSS活动，每日12:00,20:00火热开启,击杀BOSS可获得大量稀有道具掉落,更有大量伤害排名奖励！</div>
            <div>{life ? `世界BOSS(${life})${dpsText}` : '世界BOSS已死亡'}</div>
            {life ? <div><span className='g_u_end' onClick={atkBossClick}>攻击boss</span></div> : ''}
            {
                life ? '' : (
                    <div>
                        BOSS掉落：
                        {
                            shed.map(({ id_x, n, s }) => <span><span key={id_x} className='g_u_end' onClick={() => { pickupClick(id_x) }} >{n}x{s}</span>{' '}</span>)
                        }
                    </div>
                )
            }

            <div>=======伤害排名信息=======</div>
            {
                !life && <span className='g_u_end' onClick={rankReward}>领取排名奖励</span>
            }

            <List data={getRankList(rank)} prefix={({ n, v }, index) => <div className='g_u_end'>第{index}名：{n}[伤害：{v}]</div>} />
            <div><span onClick={backGrand} className="g_u_end">返回游戏</span></div>
        </div>
    )
}

export default WorldBoss;