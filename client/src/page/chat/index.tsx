import React, { useState, useEffect } from 'react';
import { backGrand } from '@utils/grand';
import { List, Tab, Input } from "@components/index";
import { chatGet, chatSet } from "@cgi/chat";
import moment from 'moment';

const tabList = [
    { value: 0, label: "系统" },
    { value: 1, label: "私聊" },
    { value: 2, label: "帮会" },
    { value: 3, label: "结义" },
    { value: 4, label: "队伍" },
    { value: 5, label: "世界" },
    // { value: 6, label: "广播" }, // 暂关闭入口

];

const CHAT_TYPE_MEUN = {
    1: '私聊',
    2: '帮会',
    3: '结义',
    4: '队伍',
    5: '世界',
    6: '广播',
};

const emptyText = (type, socializeName) => {
    if ([2, 3, 4].includes(type)) {
        return socializeName ? '暂无聊天' : `你还未加入${CHAT_TYPE_MEUN[type]}`;
    }
    return '暂无聊天';

}


export const Chat = ({ history }) => {
    const { state = {} } = history.location;
    const [list, setList] = useState([]);
    const [tabKey, seTabKey] = useState(state.type || 1);
    const [text, setText] = useState('');
    const [socializeName, setSocializeName] = useState('');
    const [role, setRole] = useState({
        id: '',
        name: '',
    });

    useEffect(() => {
        setText('');
        setRole({
            id: '',
            name: '',
        })
        chatGet({ type: tabKey }).then(({ data, socializeName }) => {
            setList(data ? data.reverse() : []);
            setSocializeName(socializeName);
        })
    }, [tabKey])

    useEffect(() => {
        setRole({
            id: state.role_id,
            name: state.role_name
        })
    }, [])


    const submit = (value, cbllback) => {
        chatSet(({
            text: value,
            type: tabKey,
            t_role: role.id
        })).then(({ data, text, socializeName }) => {

            setText(text)
            if (data) {
                setList(data.reverse());
            }
            setSocializeName(socializeName);
            cbllback('');
        })
    }

    const prefix = ({ s, t, n, id }, index) => {
        return (
            <div key={index}>
                <div>
                    <span className='g_u_end' onClick={() => { history.push('./player', { role_id: id }) }}>{n}</span>
                    <span>({moment(s).format('hh:mm')})</span>
                    <span>:{t}</span>

                    {tabKey === 1 && <span className='g_color' onClick={() => { setRole({ id, name: n }) }}>回复</span>}
                </div>
            </div>
        )
    }
    return (
        <div>
            <div>{text}</div>
            <Tab list={tabList} currentKey={tabKey} onCheng={seTabKey} />
            {
                tabKey === 1 && role.id && (
                    <Input
                        label={`私聊${role.name}`}
                        layout={false}
                        onText="发送"
                        submit={submit}
                        length={[0, 100]}
                    />
                )
            }
            {
                [2, 3, 4].includes(tabKey) && socializeName && (
                    <Input
                        label={socializeName}
                        layout={false}
                        onText="发送"
                        submit={submit}
                        length={[0, 100]}
                    />
                )
            }
            {
                [5, 6].includes(tabKey) && (
                    <Input
                        label={CHAT_TYPE_MEUN[tabKey]}
                        layout={false}
                        onText="发送"
                        submit={submit}
                        length={[0, 100]}
                    />
                )
            }

            <List data={list} prefix={prefix} emptyText={emptyText(tabKey, socializeName)} />
            <div><span className="g_u_end" onClick={backGrand}>返回游戏</span></div>
        </div>
    )
}

export default Chat;