import React, { useState, useEffect, useContext } from 'react';
import { Input, Tab } from '@components/index';
import moment from 'moment';
import { createShop, modifyShop } from '@cgi/shopping';

export const DetailShop = ({ setKey, info, setInfo, roleId }) => {
    const [error, setError] = useState('')
    const [modify, setModify] = useState(false);
    const create = (name) => {
        const request = modify ? modifyShop : createShop;
        request({ name }).then(({ data, message }) => {
            if (message) {
                setError(message);
            } else {
                setError('');
                setInfo(data);
                setModify(false);
            }
        })
    }
    return (
        <div>
            {error && <div style={{ color: 'red' }}>提示：{error}</div>}
            {
                !info || modify ? (
                    <div style={{ marginLeft: '6px' }}>
                        {!modify && <div>你还未拥有店铺。</div>}
                        <div>{modify ? '修改' : '创建'}店铺需要消耗500000银两。</div>
                        <Input label='店铺名' submit={create} onText={`点击${modify ? '修改' : '创建'}`} />
                    </div>
                ) : (
                        <div>
                            <div><span className="g_u_end" onClick={() => { setKey('articleList') }}>9件货物</span></div>
                            <div><span className="g_u_end">9只宠物</span></div>
                            {
                                !roleId && (
                                    <div>
                                        <span className="g_u"><span onClick={() => { setKey('article') }}>物品上架</span></span>
                                        <span className="g_u"><span onClick={() => { setKey('pet') }}>宠物上架</span></span>
                                    </div>
                                )
                            }
                            <div>
                                <span>店铺：{info.name}</span>
                                {!roleId && <span className="g_u_end" onClick={() => { setModify(true) }}>更换招牌</span>}
                            </div>
                            <div><span>店主：{info.role_name}</span></div>
                            <div><span>开店日期：{moment(Number(info.date)).format('YYYY-MM-DD')}</span></div>
                        </div>
                    )
            }
        </div>
    )


}

export default DetailShop;