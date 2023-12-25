import React, { useEffect, useState } from "react";
import { getFriendsList, friendsActive, friendsDelete } from "@cgi/friends";
import { List, Tab } from "@components/index";
import Style from "./index.less";

const tabList = [
    { value: 0, label: "好友列表" },
    { value: 1, label: "申请列表" }
];

export const Friends = ({ history }) => {
    const [isAdmini, setIsAdmini] = useState(false);
    const [current, setCurrent] = useState(0);
    const [friend, setFriend] = useState({ list: [], apply: [] });
    const updataFriendsList = () => {
        getFriendsList().then(({ data }) => {
            if (data) {
                const { list, apply } = data;
                setFriend({ list, apply  });
            }
        });
    };

    useEffect(() => {
        updataFriendsList();
    }, []);

    const currentCheng = current => {
        setCurrent(current);
    };
    const activeClick = (id, state = 0) => {
        friendsActive({ role_id: id, state }).then(updataFriendsList)
    }
    const deleteClick = (id) => {
        friendsDelete({ role_id: id }).then(updataFriendsList)
    }
    const data = current ? friend.apply : friend.list;

    const prefix = (row, index) => {
        return (
            <span
                key={index}
                className={current ? '' : "g_u_end"}
                onClick={() => {
                    history.push("/player", { role_id: row.id });
                }}
            >
                {index}.{row.n}
                {!current && `(亲密度:${row.i})`}
            </span>
        );
    };

    const active = (row, index) => {
        if (current === 0) {
            return (
                <div>
                    <span className="g_u_end" onClick={() => { setIsAdmini(!isAdmini) }}>{isAdmini ? "关闭" : "管理"}</span>
                    {' '}
                    {isAdmini && <span className="g_u_end" onClick={() => { deleteClick(row.id) }}>删除</span>}
                </div>
            );
        }
        return (
            <div key={index}>
                <span className="g_u_end" onClick={() => { activeClick(row.id, 1) }}>接受</span>
                {' '}
                <span className="g_u_end" onClick={() => { activeClick(row.id) }}>拒绝</span>
            </div>
        )
    }


    return (
        <div className={Style["friend-page"]}>
            <Tab list={tabList} onCheng={currentCheng} />
            <List
                data={data}
                prefix={prefix}
                emptyText={`暂无${current ? "申请" : "好友"}`}
                active={active}
            />
            <div className="g_fgx"></div>
            <div>
                <span
                    className="g_b_u"
                    onClick={() => {
                        history.push("/grand");
                    }}
                >
                    返回游戏
            </span>
            </div>
        </div>
    );
};

export default Friends;
