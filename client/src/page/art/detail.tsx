import React, { useState, useEffect } from 'react';
import { artDetail } from '@cgi/art';

const RP_MEUN = {
    0: '零',
    1: '一',
    2: '二',
    3: '三',
    4: '四',
    5: '五',
    6: '六',
    7: '七',
}

export const ArtDetail = ({ id, chengId }) => {
    const [data, setData] = useState();
    useEffect(() => {
        artDetail({ id }).then(({ data }) => {
            setData(data)
        })
    }, [id])
    if (!data) {
        return null
    }
    return (
        <div>
            <div>{data.n}{data.l === -1 && '(未领悟)'}</div>
            <div>重数：{data.l === -1 ? 0 : data.l}重</div>
            <div>转数：{RP_MEUN[data.r]}转</div>
            {data.d && <div>消耗：{data.d}法力</div>}
            <div>描述：{data.msg}</div>
            <div><span className='g_u_end' onClick={() => { chengId() }}>返回上页</span></div>
        </div>
    )
}

export default ArtDetail;