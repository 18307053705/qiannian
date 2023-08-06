import React from "react";
import { operate } from '@cgi/knapsack';
import { unloadEquipt } from '@cgi/equip';

// 头部操作
export const HeadActive = ({ query, history }) => {
    const { form, in_x, pos } = query;
    const operateClick = (type) => {
        operate({
            s: 1,
            in_x,
            type
        }).then(({ message }) => {
            if (!message) {
                history.goBack()
            }
        })
    }

    const unloadEquiptclick = () => {
        unloadEquipt({ pos }).then(({ message }) => {
            if (!message) {
                history.goBack()
            }
        })
    }


    if (form === 1) {
        return (
            <div>
                <span className='g_u_end' onClick={() => { operateClick(1) }}>装备</span>
                {" "}
                <span className='g_u_end' onClick={() => { operateClick(2) }}>入库</span>
                {" "}
                <span className='g_u_end' onClick={() => { operateClick(4) }}>丢弃</span>
            </div>
        )
    }

    if (form === 2) {
        return (
            <div>
                <span className='g_u'><span onClick={unloadEquiptclick}>卸下</span></span>
            </div>
        )
    }
    return null;
}