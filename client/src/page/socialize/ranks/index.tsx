import React from 'react';
import Member from '../member';
export const Detail = ({ type, pageName, adjustClick, socialize, eixt,setPageName }) => {
    if (!socialize) {
        return null;
    }
    return (
        <div>
            <div>{socialize.name}</div>
            <div><span>队长</span>：{socialize.mianInfo.name}</div>
            <div><span>宣言</span>：{socialize.text || '暂无'}</div>
            <Member socialize={socialize} pageName={pageName} adjustClick={adjustClick} type={type} eixt={eixt} />
            <div><span className='g_u'><span onClick={() => { setPageName('apply') }}>入队申请</span></span></div>
        </div>
    )

}

export default Detail;