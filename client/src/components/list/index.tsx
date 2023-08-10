import React, { useState, useEffect } from 'react';
import Style from './index.less';
type ListType = {
    data: any[],
    onCheng?: (page, size) => void;
    prefix: (itme: any, in_x, index) => any;
    prefix_d?: boolean;
    active?: (itme: any, in_x) => any;
    emptyText?: string,
    hiddenFooter?: boolean,
    listRef?: { current: any }
}

const size = 20;
export const List = ({ data = [], onCheng, prefix, active, emptyText, hiddenFooter }: ListType) => {
    const { history } = window.QN;
    const { state = { listPage: 0 }, pathname } = history.location;
    console.log(state, 'state...')
    const [page, setPage] = useState(state.listPage || 0);
    const total = data.length;
    const list = data.slice(page * size, (page + 1) * size);
    const numPage = [...new Array(Math.ceil(total / size))];
    useEffect(() => {
        const pages = Math.ceil(data.length / size);
        const { listPage = 0 } = state;
        if (pages && listPage >= pages) {
            setPage(pages - 1);
        }
    }, [data]);

    useEffect(() => {
        history.push(pathname, { ...state, listPage: page });
        onCheng && onCheng(page, size);
    }, [page])


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