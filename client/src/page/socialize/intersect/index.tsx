import React from 'react';
export const Detail = ({ socialize, setPageName }) => {
    if (!socialize) {
        return null;
    }
    return (
        <div>
            <div>{socialize.name}</div>
            <div><span>庄主</span>：{socialize.mianInfo.name}</div>
            <div><span>等级</span>：{socialize.level}级({socialize.exp})</div>
            <div>
                <span>成员</span>：
                <span className='g_u_end' onClick={() => { setPageName('member') }}>{socialize.list.length}</span>人
            </div>
            <div><span>宣言</span>：{socialize.text || '暂无'}</div>
            <div>
                <span className='g_u'><span onClick={() => { setPageName('tael') }}>捐献银两</span></span>
                <span className='g_u'><span onClick={() => { setPageName('material') }}>捐献材料</span></span>
                <span className='g_u'><span onClick={() => { setPageName('adjust') }}>人员调整</span></span>
            </div>
            <div>
                <span className='g_u'><span onClick={() => { setPageName('apply') }}>入庄申请</span></span>
            </div>
        </div>
    )

}

export default Detail;