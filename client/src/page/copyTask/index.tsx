import React, { useState, useEffect, useMemo } from 'react';
import { Tab, BackGrand } from '@components';
import Styles from '@components/list/index.less';
import { CAREER_TYPE, REALM_TYPE_MEUN } from '@meun';
import { getRankList, getRankReward } from '@cgi/ranking';
// 1:消耗品 2:buff丹药 3:装备 4:卷轴 5:材料 6:任务 7:杂物
const nva = [
    {
        title: '炼魂洞',
        value: 1
    },
    {
        label: '境界',
        value: 2
    }, {
        label: '生命',
        value: 3
    }, {
        label: '法力',
        value: 4
    },
    {
        label: '攻击',
        value: 5
    },
    {
        label: '防御',
        value: 6
    },
    {
        label: '命中',
        value: 7
    },
    {
        label: '闪避',
        value: 8
    },
    {
        label: '暴击',
        value: 9
    },
    {
        label: '姻缘树',
        value: 100
    },
    {
        label: '财富',
        value: 101
    },
];

type RankItemType = {
    name: string,
    career: number,
    level: number,
    rank: number,
}

type RoleType = {
    frontName?: string,
    rankIndex: number,
}




export default () => {
    const [data, setData] = useState<{ list: RankItemType[], role?: RoleType, total: number }>({
        list: [],
        total: 0
    });

    const [type, setType] = useState(1);
    const [page, setPage] = useState(0);

    const prefix = useMemo(() => {
        if (type === 1) {
            return ({ name, level, career, rank }) => <div>第{rank + 1}名：{name}({level}级{CAREER_TYPE[career]})</div>
        }
        if (type === 2) {
            return ({ name, realm, rank }) => <div>第{rank + 1}名：{name}({REALM_TYPE_MEUN[realm]})</div>
        }
        if (type === 3) {
            return ({ name, life, rank }) => <div>第{rank + 1}名：{name}({life})</div>
        }
        if (type === 4) {
            return ({ name, mana, rank }) => <div>第{rank + 1}名：{name}({mana})</div>
        }
        if (type === 5) {
            return ({ name, atk_max, atk_min, rank }) => <div>第{rank + 1}名：{name}({atk_min}~{atk_max})</div>
        }
        if (type === 6) {
            return ({ name, dfs_max, dfs_min, rank }) => <div>第{rank + 1}名：{name}({dfs_min}~{dfs_max})</div>
        }
        if (type === 7) {
            return ({ name, hit, rank }) => <div>第{rank + 1}名：{name}({hit})</div>
        }
        if (type === 8) {
            return ({ name, dodge, rank }) => <div>第{rank + 1}名：{name}({dodge})</div>
        }
        if (type === 9) {
            return ({ name, sudden, rank }) => <div>第{rank + 1}名：{name}({sudden})</div>
        }
        if (type === 100) {
            return ({ name, level, rank }) => <div>第{rank + 1}名：{name}的姻缘树({level}级)</div>
        }
        if (type === 101) {
            return ({ name, tael, rank }) => <div>第{rank + 1}名：{name}({tael})</div>
        }
        return () => { }

    }, [type])



    useEffect(() => {
        getRankList({
            type,
            page
        }).then((res) => {
            setData(res.data);
        })
    }, [type, page])

    const { role, list, total } = data;

    const pageNum = Math.ceil(total / 20) - 1;

    // 上页
    // page-up
    const upPage = total && page > 0;
    const nextPage = total && page !== pageNum;

    // const getRankRewardClick = () => {
    //     getRankReward({ type }).then((res) => {
    //         console.log(res, 'res...天榜')

    //     })
    // }

    return (
        <div>
            <div>
                <span>当前排名为：{(role?.rankIndex || 0) + 1} {' '}</span>
                {/* <span className='g_u_end' onClick={getRankRewardClick}>领奖</span> */}
                {role?.frontName && (<div>还差一名即可追上玩家{role?.frontName}。</div>)}
            </div>
            <Tab list={nva} currentKey={type} onCheng={setType} />
            <div>=======================</div>
            <div className={Styles['g-list-page']}>
                {
                    total ? list.map((itme: any, index) => (<div className={Styles.row} key={index}>
                        {prefix(itme)}
                    </div>)) : <div className={Styles.empty}>暂无数据</div>
                }
            </div>
            <div>
                {upPage && <span className='g_u_end' onClick={() => { setPage(page - 1) }}>上一页</span>}
                {'  '}
                {nextPage && <span className='g_u_end' onClick={() => { setPage(page + 1) }}>下一页</span>}
            </div>
            {/* <div>=======================</div>
            <div>提示：排名奖励以每周六晚上22点结算为准,周日22点可领取。</div> */}
            <BackGrand />
        </div>
    )
}