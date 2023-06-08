import React, { useState, useEffect } from 'react';
import { List, Tab } from '@components/index';
import { getShopList, createShop, getDetail } from '@cgi/shopping';

import { backGrand } from '@utils/grand'

import DetailShop from './detail';
import ShopList from './shopList';
import Article from './article';
import ArticleList from './articleList';

type KeyType = 'detai' | 'shopList' | 'article' | 'pet' | 'articleList'

export const Shopping = ({ history }) => {
    const [key, setKey] = useState<KeyType>('detai');
    const [info, setInfo] = useState();
    const [roleId, setRoleId] = useState('');

    const updataDetail = () => {
        getDetail({ role_id: roleId }).then(({ data }) => {
            setInfo(data);
        })
    }

    useEffect(() => {
        setKey('detai');
        updataDetail()
    }, [roleId])

    return (
        <div>
            {key === 'detai' && <DetailShop info={info} setInfo={setInfo} setKey={setKey} roleId={roleId} />}
            {key === 'shopList' && <ShopList setRoleId={setRoleId} />}
            {key === 'article' && <Article history={history} />}
            {key === 'articleList' && <ArticleList history={history} data={info['article']} roleId={roleId} updataDetail={updataDetail}/>}
            <div>
                {key === 'detai' && <span className="g_u_end" onClick={() => { setKey('shopList') }}>店铺列表</span>}
                {key === 'shopList' && <span className="g_u_end" onClick={() => { setKey('detai'); setRoleId(''); }}>我的店铺</span>}
            </div>
            <div><span className="g_u_end" onClick={backGrand}>返回游戏</span></div>
        </div>
    )


}

export default Shopping;