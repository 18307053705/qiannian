import React, { useState, useEffect } from "react";
import { List } from "@components";
import { tpDir } from '@cgi/grand';
import { rank, prize } from '@cgi/zhanchang';
import { backGrand } from '@utils/grand';
import Styles from './index.less';

const ZhanChang = () => {

    const [page, setPage] = useState('');
    const [list, setList] = useState([]);
    const [role, setRole]: any = useState();
    const [prizeInfo, setPrizeInfo]: any = useState();
    useEffect(() => {
        if (page === 'rank') {
            rank().then(({ data }) => {
                const { role_id, list } = data;
                const index = list.findIndex(({ id }) => id === role_id)
                if (index !== -1) {
                    setRole({
                        ...list[index],
                        index: index + 1
                    });
                }
                setList(list);
            })
        }

    }, [page])

    const prizeClick = () => {
        prize().then(({ data }) => {
            setPrizeInfo(data);
        })
    }
    if (page === 'rank') {
        const prefix = ({ j, name }, index) => (<div>第{index}名：{name}，  战场积分：{j}</div>);
        return (
            <div>
                {
                    prizeInfo && (
                        <div>
                            <div>成功领取奖励!</div>
                            {prizeInfo.title && <div>称号:【{prizeInfo.title}】</div>}
                            <div>功勋:{prizeInfo.exploit}</div>
                            <div>元宝:{prizeInfo.yuanbao}</div>
                            <div>银两:{prizeInfo.tael}</div>
                        </div>
                    )
                }

                <div>
                    <span>战场排名：{role ? role.index : '暂无'}</span>
                    {role && <span className="g_u_end" onClick={prizeClick}>领奖</span>}
                </div>
                <div>战场积分：{role ? role.j : 0}</div>
                <div>=======战场排名信息=======</div>
                <List
                    data={list}
                    prefix={prefix}
                />
                <div><span onClick={() => { setPage('') }} className="g_u_end">返回上页</span></div>
            </div>
        )

    }


    return (
        <div>
            <div className={Styles.tips}>
                每日19:00开启上古战场,凡是达到50级的玩家即可加入战场,击败异族不仅可获得大量功勋，更可获得丰富奖励。
            </div>
            <div><span className="g_u_end" onClick={() => { tpDir({ dir: '60003,0,0' }).then(backGrand) }}>进入战场</span></div>
            <div><span className="g_u_end" onClick={() => { setPage('rank') }}>战场排名</span></div>
            <div className={Styles.tips}>
                自上古便流传下来的战场,在战场中表现优异者可获得限时称号【无上至尊】【无上王者】【一方霸主】
            </div>
            <div><span onClick={backGrand} className="g_u_end">返回游戏</span></div>
        </div>
    )

}

export default ZhanChang;