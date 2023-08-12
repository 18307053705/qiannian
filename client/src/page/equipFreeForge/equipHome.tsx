import React from 'react';
export const EquipHome = ({ historyClick }) => {
    return (
        <div>
            <div>精炼装备,无需消耗任何材料,可大幅度提升装备属性,最高可提升200%,快来试试吧!</div>
            <div>
                <span className='g_u_end' onClick={() => { historyClick({ pageKey: 'list' }) }}>
                    选择装备精炼
                </span>
            </div>
            <div>提示：精炼装备有一定概率失败导致直接损坏。</div>
        </div>
    )
}

export default EquipHome;