import React, { useState } from 'react';

export const RanksDetail = ({ history }) => {
    return (
        <div>
            <div>【道君小队】</div>
            <div><span className="g_b">队长</span>：道君</div>
            <div><span className="g_b">成员</span>：5人</div>
            <div><span className="g_b">宣言</span>：我与诸君同在，当无敌诸天！</div>
            <div>
                <span className='g_u'><span onClick={() => { history.push('/grand') }}>退出队伍</span></span>
            </div>
        </div>
    )


}

export default RanksDetail;