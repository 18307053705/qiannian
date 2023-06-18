import React from 'react';
export const Detail = ({ socialize, setPageName, setPage }) => {
    return (
        <div>
            <div>{socialize.name}</div>
            <div><span>帮主</span>：{socialize.mianInfo.name}</div>
            <div><span>等级</span>：{socialize.level}级({socialize.exp})</div>
            <div><span>成员</span>：{socialize.list.length}人</div>
            <div><span>宣言</span>：{socialize.text || '暂无'}</div>
            <div>
                <span className='g_u'><span onClick={() => { setPage('tael') }}>捐献银两</span></span>
                <span className='g_u'><span onClick={() => { setPage('material') }}>捐献材料</span></span>
                <span className='g_u'><span>帮会装备</span></span>
                {socialize.level === 5 && <span className='g_u'><span>修炼房</span></span>}
            </div>
            <div>
                <span className='g_u'><span onClick={() => { setPageName('member') }}>帮会成员</span></span>
                <span className='g_u'><span onClick={() => { setPageName('adjust') }}>人员调整</span></span>
                <span className='g_u'><span onClick={() => { setPageName('apply') }}>入帮申请</span></span>
            </div>
        </div>
    )

}

export default Detail;