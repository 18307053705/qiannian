import React from 'react';
import { backGrand } from '@utils/grand';

export const UnknownCapability = ({ history }) => {
    console.log(history, 'history....');
    const { id } = history.location.state || {};
    if (id === 44) {
        return (
            <div>
                <div>一棵看不到尽头的千年古树，直入云端，隐隐中似乎有一股古老的力量。</div>
                <div><span className="g_u_end" onClick={backGrand}>离开</span></div>
            </div>
        )
    }
    if (id === 442) {
        return (
            <div>
                <div>海边的一个小村庄，人烟稀少，偶尔可见几缕青烟升起。</div>
                <div><span className="g_u_end" onClick={backGrand}>离开</span></div>
            </div>
        )
    }

    if (id === 443) {
        return (
            <div>
                <div>一处神秘阵眼，仿佛直通九幽，你仅仅看了一眼便觉得灵魂都在颤抖。</div>
                <div><span className="g_u_end" onClick={backGrand}>离开</span></div>
            </div>
        )
    }
    return <div><span className="g_u_end" onClick={backGrand}>返回游戏</span></div>;
}

export default UnknownCapability;

