import React from 'react';

export default ({ setPageKey, data, resetPotentialClick }) => {

    const { max_qian_li, qian_li, eles, role_realm, next } = data;

    return (
        <div>
            {next ? '' : <div>恭喜玩家已修炼至最高境界！</div>}
            <div>=================</div>
            <div>当前境界：{role_realm}</div>
            <div>元素属性</div>
            <div>冰攻：{eles}</div>
            <div>风攻：{eles}</div>
            <div>雷攻：{eles}</div>
            <div>水攻：{eles}</div>
            <div>火攻：{eles}</div>
            <div>冰防：{eles}</div>
            <div>风防：{eles}</div>
            <div>雷防：{eles}</div>
            <div>水防：{eles}</div>
            <div>火防：{eles}</div>
            <div>总潜力值：{max_qian_li}<span className='g_u_end' onClick={resetPotentialClick}>重置潜力</span></div>
            <div>可用潜力：{qian_li}<span className='g_u_end' onClick={() => { setPageKey('distribution') }}>分配潜力</span></div>
            <div>=================</div>
            {
                next && (
                    <div>
                        <div>下个境界需玩家达到10级方可开启！</div>
                        <div><span className='g_u_end'>突破{next.name}</span></div>
                    </div>
                )
            }

        </div>
    )

}
