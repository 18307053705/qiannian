import React, { useEffect, useState, useCallback, } from 'react';
import { playerApplyActive } from '@cgi/player';
import { getFriendsList } from '@cgi/friends';

import Style from './index.less';

const tabelConfig = {
    page: 0,
    size: 20
}

const STATE = {
    0: '待验证',
    1: '已通过',
    2: '已拒绝'
}



export const Friends = ({ history }) => {
    const [current, setCurrent] = useState(0);
    const [friend, setFriend] = useState({ list: [], apply: [] });
    const [table, setTable] = useState(tabelConfig);
    useEffect(() => {
        getFriendsList().then(({ data }) => {
            const { f_list, f_apply } = data;
            setFriend({ list: JSON.parse(f_list), apply: JSON.parse(f_apply) });
        })
    }, [])

    const currentCheng = useCallback((current) => {
        setCurrent(current);
        setTable(tabelConfig);
    }, [])

    const activeClick = useCallback((state, id) => {
        playerApplyActive({ state, role_id: id }).then(() => {
            getFriendsList().then(({ data }) => {
                const { f_list, f_apply } = data;
                setFriend({ list: JSON.parse(f_list), apply: JSON.parse(f_apply) });
            })
        })
    }, [])

    const data = current ? friend.apply : friend.list;
    const total = data.length;
    const { page, size } = table;
    const list = data.slice(page, size);
    return (
        <div className={Style['friend-page']}>
            <div>
                <span className={current === 0 ? "g_u g_u_d" : 'g_u'}>
                    <span onClick={() => { currentCheng(0); }}>好友列表</span>
                </span>
                <span className={current === 1 ? "g_u g_u_d" : 'g_u'}>
                    <span onClick={() => { currentCheng(1); }}>申请列表</span>
                </span>
            </div>
            <div className={Style.friendList}>
                {
                    total ? list.map(({ id, name, tagter, state }, index) => {
                        return (
                            <div key={index}>
                                <span className="g_u_end">
                                    <span onClick={() => {
                                        history.push('/player', { role_id: id })
                                    }}>
                                        {index + (page * size) + 1}.{name}
                                    </span>

                                </span>
                                {
                                    current && tagter === 1 && state === 0 ? (
                                        <span className="g_u">
                                            <span onClick={() => { activeClick(1, id) }}>接受</span>|
                                            <span onClick={() => { activeClick(2, id) }}>拒绝</span>
                                        </span>
                                    ) : (current ? `${STATE[state]}` : '')
                                }
                            </div>
                        )
                    })
                        : <div className={Style.empty}>暂无{current ? '申请' : '好友'}</div>
                }
            </div>
            {
                total ? (
                    <div>
                        {page !== 0 && <span className="g_u"><span onClick={() => {
                            setTable({ size, page: page - 1 });
                        }}>上一页</span></span>}
                        {total > (page + 1) * size && <span className="g_u" onClick={() => {
                            setTable({ size, page: page + 1 });
                        }}><span>下一页</span></span>}
                    </div>
                ) : ''
            }
            <div className="g_fgx"></div>
            <div> <span className="g_b_u" onClick={() => { history.push('/grand') }}>返回游戏</span></div>
        </div>
    )

}

export default Friends;

