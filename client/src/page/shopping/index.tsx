import React, { useState, useEffect } from 'react';
import { getDetail } from '@cgi/shopping';

import { backGrand } from '@utils/grand'

import DetailShop from './detail';
import ShopList from './shopList';
import Article from './article';
import ArticleList from './articleList';

type KeyType = 'detai' | 'shopList' | 'article' | 'pet' | 'articleList'

export const Shopping = ({ history }) => {
    const { state } = history.location;
    const [key, setKey] = useState<KeyType>('detai');
    const [info, setInfo] = useState();

    const [roleId, setRoleId] = useState(state.role_id);

    const updataDetail = (roleId) => {
        getDetail({ role_id: roleId }).then(({ data }) => {
            setInfo(data);
        })
    }
    const shopClick = (role_id) => {
        setKey('detai');
        setRoleId(role_id);
    }

    useEffect(() => {
        updataDetail(roleId);
    }, [roleId, key]);
    return (
        <div>
            {key === 'detai' && <DetailShop info={info} setInfo={setInfo} setKey={setKey} roleId={roleId} />}
            {key === 'shopList' && <ShopList setRoleId={shopClick} />}
            {key === 'article' && <Article history={history} />}
            {key === 'articleList' && (
                <ArticleList history={history} data={info['article']} roleId={roleId} updataDetail={updataDetail} />)
            }
            <div>
                {key === 'detai' && <span className="g_u_end" onClick={() => { setKey('shopList') }}>店铺列表</span>}
                {
                    (key !== 'detai' || roleId) && (
                        <div>
                            <span
                                className="g_u_end"
                                onClick={() => {
                                    setKey('detai');
                                    setRoleId('');
                                }}>
                                我的店铺
                            </span>
                        </div>
                    )
                }
            </div>
            <div><span className="g_u_end" onClick={backGrand}>返回游戏</span></div>
        </div>
    )


}

export default Shopping;