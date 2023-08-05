import React, { useState } from "react";
import { Input } from '@components';
import { operate } from '@cgi/knapsack';


const TYPE_TEXT = {
    1: '使用',
    2: '入库',
    3: '出库',
    4: '丢弃',
}

// 头部操作
export const HeadActive = ({ query, history }) => {
    const [type, setType] = useState(0);
    const { form, in_x } = query;
    const operateClick = (s) => {
        operate({
            s,
            in_x,
            type
        }).then(({ message }) => {
            if (!message) {
                history.goBack()
            }
        })
    }

    if (form === 1) {
        return (
            <div>
                {
                    type ?
                        (
                            <Input
                                label={`${TYPE_TEXT[type]}数量`}
                                layout={false}
                                submit={operateClick}
                                type='number'
                                // onText='改名'
                                close={() => { setType(0); }} />
                        )
                        : ''
                }
                <span className='g_u'> <span onClick={() => { setType(1) }}>使用</span></span>
                <span className='g_u'> <span onClick={() => { setType(2) }}>入库</span></span>
                <span className='g_u'> <span onClick={() => { setType(4) }}>丢弃</span></span>
            </div>
        )
    }
    if (form === 3) {
        return (
            <div>
                {
                    type ?
                        (
                            <Input
                                label={`${TYPE_TEXT[type]}数量`}
                                layout={false}
                                submit={operateClick}
                                // onText='改名'
                                close={() => { setType(0); }} />
                        )
                        : ''
                }
                <span className='g_u_end' onClick={() => { setType(3) }}>出库</span>
            </div>
        )
    }
    return null;
}