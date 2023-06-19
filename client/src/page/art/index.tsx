import React, { useState, useCallback } from 'react';
import { backGrand } from '@utils/grand'
export const Art = () => {
    return (
        <div>
            <div>===技能===</div>
            <div className='g_color'>青元剑诀 零转0级</div>
            <div className='g_color'>太极剑诀 零转0级</div>
            <div>===天赋===</div>
            <div className='g_color'>道君心经 零转0级</div>
            <div className='g_color'>太阴心诀 零转0级</div>
            <div className='g_color'>太阳心诀 零转0级</div>
            <div className='g_color'>太上道经 零转0级</div>
            <div>===技能===</div>
            <div className='g_color'>道君真意 零转0级</div>
            <div className='g_color'>无上道法 零转0级</div>
            <div>===防御===</div>
            <div className='g_color'>荒古圣体 零转0级</div>
            <div><span className="g_u_end" onClick={backGrand}>返回游戏</span></div>
        </div>
    )
}

export default Art;