import React, { useState } from "react";
import { petStatu } from '@cgi/pet';
const PET_STATE = {
    0: '休战中',
    1: '参战中',
    2: '附体中',
    3: '出售中',
}

export const PetState = ({ petInfo, callback, petId }) => {
    const { state, isRole } = petInfo;
    const chengClick = (s) => {
        petStatu({
            state: s,
            petId
        }).then(({ data }) => {
            if (data) {
                callback();
            }
        })
    }
    // 判断是否为宠物房跳转
    if (!isRole) {
        return <div>状态：{PET_STATE[0]}</div>
    }
    // 附体技能
    const art = petInfo.art.find(({ id }) => id === 19) || { l: -1 }
    // 判断是否为出战宠物
    if (state === 1 || state === 2) {
        // 判断是否附体
        return (
            <div>
                <span>状态：{PET_STATE[1]}</span>
                <span className="g_u"><span onClick={() => { chengClick(0) }}>休战</span></span>
                {(state === 1 && art.l !== -1) && <span className='g_u'><span onClick={() => { chengClick(2) }}>附体</span></span>}
            </div>
        )
    }

    // 非出战宠物
    return (
        <div>
            <span>状态：{PET_STATE[state]}</span>
            {state === 0 && <span className="g_u"><span onClick={() => { chengClick(1) }}>出战</span></span>}
        </div>
    )
}

