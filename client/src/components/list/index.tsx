import React, { useState, useEffect } from 'react';
import Style from './index.less';
type ListType = {
    data: any[],
    onCheng?: (page, size) => void;
    prefix: (itme: any, in_x, index) => any;
    prefix_d?: boolean;
    active?: (itme: any, in_x) => any;
}

export const List = ({ data = [], onCheng, prefix, active, prefix_d }: ListType) => {
    const [page, setPage] = useState(0);
    const [size] = useState(20);
    const total = data.length;
    const list = data.slice(page, size);
    useEffect(() => { setPage(0) }, [data])
    useEffect(() => {
        onCheng && onCheng(page, size)
    }, [page])
    return (
        <div className={Style['g-list-page']}>
            {
                total ? list.map((itme, index) => {
                    return (
                        <div className={Style.row} key={index}>
                            {prefix(itme, index + (page * size) + 1, index)}
                            <span className="g_u">{active && active(itme, index + (page * size) + 1)}</span>
                        </div>
                    )
                })
                    : <div className={Style.empty}>暂无数据</div>
            }
            {
                total ? (
                    <div>
                        {page !== 0 && <span className="g_u"><span onClick={() => {
                            setPage(page - 1);
                        }}>上一页</span></span>}
                        {total > (page + 1) * size && <span className="g_u" onClick={() => {
                            setPage(page + 1);
                        }}><span>下一页</span></span>}
                    </div>
                ) : ''
            }
        </div>
    )


}

export default List;