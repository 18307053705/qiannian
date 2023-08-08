import React from "react";
export const PetFlair = ({ petRoom, petInfo }) => {

    const chengClick = (num) => {
        console.log(num)
    }
    // 判断是否携带宠物房的信息
    // 是则代表从宠物房跳转过来
    // 否则状态固定位休战,且不可操作
    if (!petRoom) {
        return <div>资质：{`${petInfo.flair}/${petInfo.flair_x}`}</div>
    }
    const { flair_x, flair, reborn, state } = petInfo;
    // 是否可提升资质
    const isFlair = flair_x > flair && state === 0;
    // 是否可转生
    const isReborn = reborn < 3 && flair_x === flair && state === 0;
    return (
        <div>
            <span>资质：{`${petInfo.flair}/${petInfo.flair_x}`}</span>
            {isFlair && <span className="g_u"><span onClick={() => { chengClick(0) }}>+</span></span>}
            {isReborn && <span className="g_u"><span onClick={() => { chengClick(0) }}>转生</span></span>}
        </div>
    )
}

