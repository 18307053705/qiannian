import React, { useState, useEffect, useContext } from 'react';
import { Create } from '../create'

export const DetailShop = ({ history, info, setKey }) => {
    const [error, setError] = useState('');
    const [isCreate, setIsCreate] = useState(true);
    const createCb = ({ data, message }) => {
        if (message) {
            setError(message);
            return;
        }
        setIsCreate(false);
        setKey('detai');
    }



    return (
        <div>
            {error && <div style={{ color: 'red' }}>提示：{error}</div>}

            {
                isCreate ? (<Create type={1} createCb={createCb} />)
                    : (
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
        </div>
    )


}

export default DetailShop;