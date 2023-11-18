
import React, { useEffect, useState } from "react";
import RouterGuard from './components/RouterGuard';
import Active from './components/Active';
import SystemText from './components/SystemText';
import UnreadList from './components/UnreadList';

import { chatGetUnread } from "@cgi/chat";

interface ExtsFace {
    activeQueue?: any,
    roleBase?: any,
}


const Root = () => {
    const [unread, setUnread] = useState([]);
    const [system, setSystem] = useState('');
    const [exts, setExts] = useState<ExtsFace>({});
    // 请求世界戳
    const [_, setOldTime] = useState<number>(0);
    useEffect(() => {
        window.QN.setTips = ({ tips, time }) => {
            const curTime = new Date(time) as any * 1;
            let falg = false;
            setOldTime((oldTime) => {
                falg = curTime - oldTime < 50;
                return curTime;
            });

            if (falg) {
                return;
            }
            window.QN.tips = tips;
        };
        // 监听全局点击事件,处理错误信息
        window.addEventListener("click", () => {
            const { location } = window.QN.history;
            const { pathname } = location;
            if (pathname !== '/' && pathname !== '/login' && pathname !== '/reactRole') {
                chatGetUnread().then(({ data, system, exts }: any) => {
                    setUnread(data);
                    setSystem(system);
                    setExts(exts)
                })
            } else {
                setUnread([]);
            }
        });
    }, [])
    return (
        <div>
            <Active ACTIVE_QUEUE={exts.activeQueue || {}} />
            {/* 系统公告 */}
            <SystemText system={system} />
            {/* 聊天信息提示 */}
            <UnreadList unread={unread} />
            {/* 路由组件 */}
            <RouterGuard />
        </div>
    );
}

export default Root;