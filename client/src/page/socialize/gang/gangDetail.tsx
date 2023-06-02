import React, { useState } from 'react';
import { backGrand } from '@utils/grand';
import Input from '@components/input';

const Detail = ({ socialize }) => {
    return (
        <div>
            <div>【道★宫】</div>
            <div><span className="g_b">帮主</span>：道君</div>
            <div><span className="g_b">等级</span>：10级</div>
            <div><span className="g_b">成员</span>：50人</div>
            <div><span className="g_b">宣言</span>：我与诸君同在，当无敌诸天！</div>
            <div>
                <span className='g_u'><span>捐献材料</span></span>
                <span className='g_u'><span>帮会装备</span></span>
                <span className='g_u'><span>修炼房</span></span>
                <span className='g_u'><span>任职</span></span>
            </div>
            <div>
                <span className='g_u'><span onClick={backGrand}>退出帮会</span></span>
            </div>
        </div>
    )
}

export const GangDetail = ({ history, socialize }) => {
    const [value, setValue] = useState('');
    console.log(socialize, 'socialize...')
    console.log(socialize, 'socialize...')

    if (!socialize) {
        return <div>
            <div className="g_empty">暂无帮会</div>
            <div className='g_b' onClick={() => { history.push('/createSocialize', { type: 1 }) }}>创建帮会</div>
            <Input />
            {/* <input
                type="text"
                value={value}
                onChange={(e) => { setValue(e.target.value) }}
            />
            <span className="g_btn">确认</span>
            <span className="g_btn">取消</span> */}
        </div>
    }
    return (
        <div>
            <div>【道★宫】</div>
            <div><span className="g_b">帮主</span>：道君</div>
            <div><span className="g_b">等级</span>：10级</div>
            <div><span className="g_b">成员</span>：50人</div>
            <div><span className="g_b">宣言</span>：我与诸君同在，当无敌诸天！</div>
            <div>
                <span className='g_u'><span>捐献材料</span></span>
                <span className='g_u'><span>帮会装备</span></span>
                <span className='g_u'><span>修炼房</span></span>
                <span className='g_u'><span>任职</span></span>
            </div>
            <div>
                <span className='g_u'><span onClick={() => { history.push('/grand') }}>退出帮会</span></span>
            </div>
        </div>
    )


}

export default GangDetail;