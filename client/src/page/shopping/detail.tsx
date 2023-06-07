import React, { useState, useEffect } from 'react';
import { Input, Tab } from '@components/index';
import { createShop } from '@cgi/shopping';


const list = [
    { value: 1, label: '宠物摊' },
    { value: 2, label: '物品摊' },
]

export const DetailShop = ({ history, info, create }) => {

    const [key, setKey] = useState(1);
    return (
        <div>

            {
                !info ? (
                    <div style={{ marginLeft: '6px' }}>
                        <div>你还未拥有店铺。</div>
                        <div>创建店铺需要消耗500000银两。</div>
                        <Input label='店铺名' onOk={create} onText='点击创建' />
                    </div>
                ) : (
                        <div>
                            <div><span className="g_b">{info.name}</span></div>
                            <Tab list={list}
                                currentKey={key}
                                onCheng={setKey}
                            />

                        </div>
                    )
            }
        </div>
    )


}

export default DetailShop;