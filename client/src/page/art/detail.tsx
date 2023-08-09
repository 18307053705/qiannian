import React from 'react';
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

export const ArtDetail = ({ art }) => {
    const { n, l, r, d, msg } = art;
    return (
        <div>
            <div>{n}{l === -1 && '(未领悟)'}</div>
            <div>重数：{l === -1 ? 0 : l}重</div>
            <div>转数：{RP_MEUN[r]}转</div>
            {d && <div>消耗：{d}法力</div>}
            <div>描述：{msg}</div>
        </div>
    )
}

export default ArtDetail;