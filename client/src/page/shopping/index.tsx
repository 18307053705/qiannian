import React, { useState, useEffect } from 'react';
import { getDetail } from '@cgi/shopping';

import { backGrand } from '@utils/grand';

import DetailShop from './detail';
import ShopList from './shopList';
import Article from './article';
import ArticleList from './articleList';

type KeyType = 'detai' | 'shopList' | 'article' | 'pet' | 'articleList';

export const Shopping = ({ history }) => {
    const { state }: any = history.location;
    const { page = 'detai', role_id = '' } = state || {};
    const historyClick = (parmas: { page: KeyType, role_id?: string }) => {
        history.push('./shopping', { ...state, ...parmas });
    }
    console.log(state)
    return (
        <div>
            {/* 店铺详情 */}
            {page === 'detai' && <DetailShop historyClick={historyClick} history={history} />}
            {/* 店铺列表 */}
            {page === 'shopList' && <ShopList historyClick={historyClick} />}
            {/* 物品上架 */}
            {page === 'article' && <Article history={history} historyClick={historyClick} />}
            {/* 上架物品列表 */}
            {page === 'articleList' && <ArticleList history={history} historyClick={historyClick}  />
            }

            {/* 店铺列表  */}
            {
                page === 'detai' && (
                    <div>
                        <span
                            className="g_u_end"
                            onClick={() => {
                                historyClick({ page: 'shopList' });
                            }}>
                            店铺列表
                        </span>
                    </div>
                )
            }
            {/* 我的店铺  */}
            {
                (page !== 'detai' || role_id) && (
                    <div>
                        <span
                            className="g_u_end"
                            onClick={() => {
                                historyClick({ page: 'detai', role_id: '' })
                            }}>
                            我的店铺
                            </span>
                    </div>
                )
            }
            <div><span className="g_u_end" onClick={backGrand}>返回游戏</span></div>
        </div>
    )


}

export default Shopping;