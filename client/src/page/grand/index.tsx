import React, { useState, useEffect, useCallback } from "react";
import { moveDir, initGrandInfo } from '@cgi/grand';
import { roleExit } from '@cgi/roleInfo';
import './index.less';

const Grand = ({ history }) => {
    const [grandInfo, setGrandInfo] = useState(initGrandInfo);
    const [updata, setUpdata] = useState(false);
    const { name, data, x, y, grand } = grandInfo;
    const players = grandInfo.players.slice(0, 4);
    const playersLen = players.length - 1;
    useEffect(() => {
        moveDir().then(({ data }: any) => {
            setGrandInfo(data);
        })
    }, [updata])
    const dirClick = useCallback((dir) => {
        moveDir({ dir }).then(({ data }: any) => {
            const { path, ext } = data;
            path ? history.push(path, { ...ext }) : setGrandInfo(data);
        })
    }, [])
    return (
        <div className="grand-page">
            <div className="g_b">{`${name}(${x}.${y})`}</div>
            <div>
                <span className="g_u"><span onClick={() => { setUpdata(!updata) }}>刷新</span></span>
                <span className="g_u"><span onClick={() => { history.push('/chat') }}>聊天</span></span>
                <span className="g_u"><span onClick={() => { history.push('/friends') }}>好友</span></span>
                <span className="g_u"><span onClick={() => { history.push('/task') }}>任务</span></span>
                <span className="g_u"><span onClick={() => { history.push('/worldMap') }}>腾云</span></span>
            </div>
            {/* 地图元素 */}
            <div className="ele-list">
                {
                    data.map((list, index) => {
                        return (
                            <div key={index}>
                                {
                                    list.map(({ name, dir, cs }) => {
                                        return (
                                            <span className={cs || "g_u"} key={dir}>
                                                <span onClick={() => { dirClick(dir) }}>
                                                    {name}
                                                </span>
                                            </span>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
            <div className="g_fgx"></div>
            {/* 地图 */}
            {
                grand.map(({ dir, lable, value }) => {
                    return (
                        <div key={dir}>
                            <span>{lable}：</span>
                            <span
                                className="g_u_end"
                                onClick={() => { dirClick(dir) }}
                            >
                                <span>{value}</span>
                            </span>
                        </div>
                    )
                })
            }
            {/* 玩友 */}
            <div>
                {
                    playersLen !== -1 && <span>玩友：</span>
                }
                {
                    players.map(({ role_name, role_id }) => (
                        <span
                            key={role_id}
                            className="g_u"
                            onClick={() => {
                                history.push('/player', { role_id, role_name })
                            }}>
                            <span>{role_name}</span>
                        </span>
                    ))
                }
                {
                    playersLen > 4 && <span className="g_u"><span>更多</span></span>
                }
            </div>
            <div className="g_fgx"></div>
            <div>
                <span className="g_b_u" onClick={() => { history.push('/roleInfo') }}>状态</span>
                <span className="g_b_u" onClick={() => { history.push('/knapsack', { type: 1 }) }}>背包</span>
            </div>
            <div>
                <span className="g_b_u" onClick={() => { history.push('/socialize', { type: 1 }) }}>帮会</span>
                <span className="g_b_u" onClick={() => { history.push('/socialize', { type: 2 }) }}>庄园</span>
                <span className="g_b_u" onClick={() => { history.push('/socialize', { type: 3 }) }}>队伍</span>
                <span className="g_b_u">情缘</span>
            </div>
            <div>
                <span className="g_b_u" onClick={() => { history.push('/equip') }}>装备</span>
                <span className="g_b_u" onClick={() => { history.push('/art') }}>技能</span>
                <span className="g_b_u" onClick={() => { history.push('/pet') }}>宠物</span>
                <span className="g_b_u">天榜</span>
            </div>
            <div>

                <span className="g_b_u" onClick={() => { history.push('/house') }}>房屋</span>
                <span className="g_b_u" onClick={() => { history.push('/treasure') }}>珍宝</span>
                <span className="g_b_u">活动</span>
            </div>
            <span className="g_b_u" onClick={() => {
                roleExit().then(() => {
                    history.push('/');
                })
            }}>返回首页</span>
        </div>
    )

}

export default Grand;