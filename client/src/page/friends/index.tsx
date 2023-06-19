import React, { useEffect, useState } from "react";
import { getFriendsList, friendsActive } from "@cgi/friends";
import { List, Tab } from "@components/index";
import Style from "./index.less";

const tabList = [
    { value: 0, label: "好友列表" },
    { value: 1, label: "申请列表" }
];

export const Friends = ({ history }) => {
    const [current, setCurrent] = useState(0);
    const [friend, setFriend] = useState({ list: [], apply: [] });
    const [error, setError] = useState("");
    const updataFriendsList = () => {
        getFriendsList().then(({ data }) => {
            if (data) {
                const { list, apply } = data;
                setFriend({ list: JSON.parse(list), apply: JSON.parse(apply) });
            }
        });
    };

    useEffect(() => {
        updataFriendsList();
    }, []);

    const currentCheng = current => {
        setCurrent(current);
    };
    const activeClick = (id,state=0)=>{
        friendsActive({role_id:id,state}).then(({message})=>{
            if(message){
                setError(message);
            }else{
                setError("");
                updataFriendsList();  
            }
        })
    }
    const data = current ? friend.apply : friend.list;

    const prefix = (row, index) => {
        return (
            <span
                key={index}
                className="g_u_end"
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
            return null;
        }
        return (
            <div>
                <span>{index}.{row.n}</span>
                <span onClick={() => { activeClick(row.id, 1) }}>接受</span>|
                <span onClick={() => { activeClick(row.id) }}>拒绝</span>
            </div>
        )
    }


    return (
        <div className={Style["friend-page"]}>
            {error && <div style={{ color: "red" }}>提示：{error}</div>}
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
