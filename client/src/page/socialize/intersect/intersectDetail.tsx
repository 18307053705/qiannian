import React, { useState } from 'react';

export const IntersectDetail = ({ history }) => {
    return (
        <div>
            <div>【★道君府★】</div>
            <div><span className="g_b">庄主</span>：道君</div>
            <div><span className="g_b">等级</span>：10级</div>
            <div><span className="g_b">成员</span>：50人</div>
            <div><span className="g_b">宣言</span>：我与诸君同在，当无敌诸天！</div>
            <div>
                <span className='g_u'><span>捐献材料</span></span>
                <span className='g_u'><span>庄园装备</span></span>
                <span className='g_u'><span>修炼房</span></span>
                <span className='g_u'><span>任职</span></span>
            </div>
            <div>
                <span className='g_u'><span onClick={() => { history.push('/grand') }}>退出庄园</span></span>
            </div>
        </div>
    )


}

export default IntersectDetail;