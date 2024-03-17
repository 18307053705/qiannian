import React, { useEffect, useState } from 'react';
import { BackGrand } from '@components';
import { getTianJie, tianJieFight } from '@cgi/jingJie';
export default () => {
    const [data, setData]: any = useState();
    useEffect(() => {
        getTianJie().then((res) => {
            setData(res.data);
        })
    }, [])
    if (!data) {
        return null;
    }
    return (
        <div>
            渡劫台
            <div>=================</div>
            <div>{data.name}</div>
            <div>等级：{data.level}</div>
            <div>境界：{data.realm || '无'}</div>
            <div>当前层数：{data.num}/{data.max}</div>
            <div><span className='g_u_end' onClick={tianJieFight}>开始渡劫</span></div>
            <div>=================</div>
            <div>
                灵气充沛的渡劫台，周围布下了玄奥的阵法，周围还残余着天劫的痕迹。
            </div>
            <BackGrand />
        </div>
    )

}
