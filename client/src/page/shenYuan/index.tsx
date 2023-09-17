import React, { useState, useEffect } from 'react';
import { backGrand } from '@utils/grand';
import { List } from '@components';
import { getShenRank, shenyuanFight } from '@cgi/shenyuan';
import { CAREER_TYPE, } from '@meun';

import Styles from './index.less';
const getIcons = (l) => {
    const num = Math.floor(l / 10)
    const icons = Array(num).fill('★');
    if (l % 10) {
        icons.push('☆')
    }
    return <span className={Styles.icon}>{icons.join('')}</span>

}

const ShenYuanItme = ({ data, index, role_id }) => {
    const { n, level, career, l, id } = data;
    return (
        <div>
            <div>第{index}名：{n}({level}级{CAREER_TYPE[career]})</div>
            <div>
                <span>深渊层数({l})：{getIcons(l)}</span>
                <span className='g_u_end' onClick={() => { shenyuanFight({ roleId: id }) }}>{role_id === id ? '挑战' : '协助'}</span>
            </div>
        </div>
    )
}


export const ShenYuan = () => {
    const [shenyuan, setShenyuan]: any = useState();
    useEffect(() => {
        getShenRank().then(({ data }) => {
            const { list, role_id } = data;;
            const rank = list.sort((a, b) => b.l - a.l);
            let index = 0;
            const roleInfo = rank.filter(({ id }, i) => {
                if (role_id === id) {
                    index = i;
                    return true;
                }
            });
            setShenyuan({
                ...data,
                list: rank,
                roleInfo: {
                    ...roleInfo[0],
                    index: index + 1
                },
            });
        })
    }, [])


    if (!shenyuan) {
        return null;
    }

    console.log(shenyuan, ' console.log(shenyuan)...')
    const { list, roleInfo } = shenyuan;
    const prefix = (data, index) => (<ShenYuanItme data={data} index={index} role_id={roleInfo.id} />)
    return (
        <div>
            <div>
                <div className={Styles.title} >
                    <div>今日挑战人数：{list.length}</div>
                    <div><span className='g_u_end'>积分商店</span></div>
                </div>
                <div>深渊排名：{roleInfo.index}</div>
                <div>
                    <span>深渊层数({roleInfo.l})：{getIcons(roleInfo.l)}</span>
                    <span className='g_u_end' onClick={() => { shenyuanFight() }}>挑战</span>
                </div>
                <div>可助人次数：{roleInfo.s}</div>
            </div>
            <div>=======深渊排名信息=======</div>
            <List
                data={list}
                prefix={prefix}
            />
            <div><span className="g_u_end" onClick={backGrand}>返回游戏</span></div>
        </div>
    )
}

export default ShenYuan;