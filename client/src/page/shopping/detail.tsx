import React, { useState, useEffect } from 'react';
import { Input } from '@components/index';
import moment from 'moment';
import { createShop, modifyShop, getDetail } from '@cgi/shopping';

export const DetailShop = ({ historyClick, history }) => {
    const { state } = history.location;
    const [shopInfo, setShopInfo] = useState()
    const [modify, setModify] = useState(false);
    // 创建店铺或者更换招聘
    const create = (name) => {
        const request = modify ? modifyShop : createShop;
        request({ name }).then(({ data, message }) => {
            if (!message) {
                setShopInfo(data);
                setModify(false);
            }
        })
    }

    useEffect(() => {
        getDetail({ role_id: state.role_id }).then(({ data }) => {
            setShopInfo(data)
        })
    }, [state.role_id])


    if (!shopInfo || modify) {
        return (
            <div style={{ marginLeft: '6px' }}>
                {!modify && <div>你还未拥有店铺。</div>}
                <div>{modify ? '修改' : '创建'}店铺需要消耗500000银两。</div>
                <Input label='店铺名' submit={create} onText={`点击${modify ? '修改' : '创建'}`} />
            </div>
        )
    }

    const { article, pet } = shopInfo;

    return (
        <div>
            {
                article.length ? (
                    <div>
                        <span
                            className="g_u_end"
                            onClick={() => {
                                historyClick({ page: 'articleList' });
                            }}>
                            {article.length}件货物
                        </span>
                    </div>
                ) : ''
            }
            {
                pet.length ? (
                    <div>
                        <span
                            className="g_u_end"
                            onClick={() => {
                                historyClick({ page: 'articleList' });
                            }}>
                            {pet.length}只宠物
                    </span>
                    </div>
                ) : ''
            }
            {
                !state.role_id ? (
                    <div>
                        <span className="g_u">
                            <span onClick={() => {
                                historyClick({ page: 'article' });
                            }}>物品上架</span>
                        </span>
                        <span className="g_u">
                            <span onClick={() => {
                                historyClick({ page: 'pet' });
                            }}>宠物上架</span>
                        </span>
                    </div>
                ) : ''
            }
            <div>
                <span>店铺：{shopInfo.name}</span>
                {!state.role_id ? <span className="g_u_end" onClick={() => { setModify(true) }}>更换招牌</span> : ''}
            </div>
            <div><span>店主：{shopInfo.role_name}</span></div>
            <div><span>开店日期：{moment(Number(shopInfo.date)).format('YYYY-MM-DD')}</span></div>
        </div>
    )


}

export default DetailShop;