import React, { useState, useEffect } from 'react';
import Style from './index.less';
type ListType = {
    data: any[],
    onCheng?: (page, size) => void;
    prefix: (itme: any, in_x, index) => any;
    prefix_d?: boolean;
    active?: (itme: any, in_x) => any;
    emptyText?: string,
    hiddenFooter?: boolean
}

export const List = ({ data = [], onCheng, prefix, active, emptyText, hiddenFooter }: ListType) => {
    const [page, setPage] = useState(0);
    const [size] = useState(20);
    const total = data.length;
    const list = data.slice(page * size, (page + 1) * size);
    // const list = data.slice(page, size);
    useEffect(() => { setPage(0) }, [data])
    useEffect(() => {
        onCheng && onCheng(page, size)
    }, [page])

    const numPage = [...new Array(Math.ceil(total / size))];
    return (
        <div className={Style['g-list-page']}>
            {
                total ? list.map((itme, index) => {
                    const Suffix = active ? active(itme, index + (page * size) + 1) : '';
                    return (
                        <div className={Style.row} key={index}>
                            {prefix(itme, index + (page * size) + 1, index)}
                            {Suffix && <span style={{ margin: '0 2px' }}>|</span>}
                            {Suffix}
                        </div>
                    )
                })
                    : <div className={Style.empty}>{emptyText || '暂无数据'}</div>
            }
            {
                total && !hiddenFooter ? (
                    <div>
                        第{
                            numPage.map((_, index) => (
                                <span key={index} className={page === index ? '' : 'g_u'}>
                                    <span onClick={() => { setPage(index) }}>{index + 1}</span>
                                </span>
                            ))
                        }页
                    </div>
                ) : ''
            }
        </div>
    )


}

export default List;