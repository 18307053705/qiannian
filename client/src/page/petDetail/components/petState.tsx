import React from "react";
const PET_STATE = {
    0: '休战中',
    1: '参战中',
    2: '附体中',
    3: '出售中',
}

export const PetState = ({ petRoom, petId }) => {
    const chengClick = (num) => {
        console.log(num)
    }
    // 判断是否为宠物房跳转
    if (!petRoom) {
        return <div>状态：{PET_STATE[0]}</div>
    }
    const { s:state } = petRoom;
    // 判断是否为出战宠物
    if (state === 1 || state === 2) {
        // 判断是否附体
        return (
            <div>
                <span>状态：{PET_STATE[1]}</span>
                <span className="g_u"><span onClick={() => { chengClick(0) }}>休战</span></span>
                {state === 1 && <span className='g_u' onClick={() => { chengClick(2) }}>附体</span>}
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

