import React, { useState, useEffect } from 'react';
import { backGrand } from '@utils/grand';
import { List, Tab, Input } from "@components/index";

const tabList = [
    { value: 0, label: "私聊" },
    { value: 1, label: "帮会" },
    { value: 2, label: "结义" },
    { value: 3, label: "队伍" },
    { value: 4, label: "系统" },
];

export const Chat = ({history }) => {
    return (
        <div>
            <Tab list={tabList} />
            <Input label="" onText="发送" submit={() => { }} />
            <List data={[]} prefix={() => ''} emptyText='暂无记录' />
            <div><span className="g_u_end" onClick={backGrand}>返回游戏</span></div>
        </div>
    )
}

export default Chat;