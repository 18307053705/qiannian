import React, { useState, useEffect } from 'react';
import { getDetail } from '@cgi/shopping';
import { backGrand } from '@utils/grand'
import Detail from './detail';
import ShopList from './gangList';
import { getsocializeDetail } from '@cgi/socialize';
type KeyType = 'detai' | 'shopList' | 'article' | 'pet' | 'articleList'

export const Shopping = ({ history }) => {
    const { state } = history.location;
    const [key, setKey] = useState<KeyType>('detai');
    const [info, setInfo] = useState();

    const [roleId, setRoleId] = useState(state.role_id);

    const updataDetail = () => {
        getsocializeDetail({ type: 1 }).then(({ data }) => {
            setInfo(data);
        })
    }
    const shopClick = (role_id) => {
        setKey('detai');
        setRoleId(role_id);
    }

    useEffect(() => {
        updataDetail()
    }, [roleId])
    return (
        <div>
            {key === 'detai' && <Detail history={history} info={info} setKey={setKey}/>}
            {key === 'shopList' && <ShopList setRoleId={shopClick} />}
            <div><span className="g_u_end" onClick={() => { setKey('shopList') }}>帮会列表</span></div>
            <div><span className="g_u_end" onClick={() => { setKey('detai') }}>我的帮会</span></div>
            <div><span className="g_u_end" onClick={backGrand}>返回游戏</span></div>
        </div>
    )


}

export default Shopping;