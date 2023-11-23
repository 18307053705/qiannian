import React from "react";
import { operate } from '@cgi/knapsack';
import { unloadEquipt, decomposeEquip } from '@cgi/equip';
import { petUnloadEquip } from '@cgi/pet';

// 头部操作
export const HeadActive = ({ query, history }) => {
    const { form,  pos, petId, uid } = query;
    const operateClick = (type) => {
        operate({
            s: 1,
            uid,
            type
        }).then(({ message }) => {
            if (!message) {
                history.goBack()
            }
        })
    }

    const unloadEquiptclick = () => {
        let requst: any = undefined;
        if (form === 2) {
            requst = unloadEquipt({ pos });
        }
        if (form === 6) {
            requst = petUnloadEquip({ posKey: pos, petId });
        }
        requst.then(({ message }) => {
            if (!message) {
                history.goBack()
            }
        })
    }

    const decomposeEquipClick = () => {
        decomposeEquip({ uid }).then(({ message }) => {
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
                <span className='g_u_end' onClick={decomposeEquipClick}>分解</span>
                {" "}
                <span className='g_u_end' onClick={() => { operateClick(4) }}>丢弃</span>

            </div>
        )
    }

    if (form === 2 || form === 6) {
        return (
            <div>
                <span className='g_u'><span onClick={unloadEquiptclick}>卸下</span></span>
            </div>
        )
    }
    return null;
}