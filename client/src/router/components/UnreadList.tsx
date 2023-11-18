
import React from "react";

const CHAT_TYPE_MEUN = {
    1: '私',
    2: '帮',
    3: '义',
    4: '队',
}

const UnreadList = ({ unread = [] }) => {
    return (
        <div>
            {
                unread.map((id, index) => (
                    <span
                        onClick={() => { window.QN.history.push('./chat', { type: id }) }}
                        className='g_u_end'
                    >
                        {CHAT_TYPE_MEUN[id]}({index + 1})
                    </span>
                ))
            }
        </div>
    );
}

export default UnreadList;