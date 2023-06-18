import React, { useState, useRef } from 'react';
import { Input } from '@components/index';
import { socializeCreate } from '@cgi/socialize';

const TYPE_MEUN = {
    1: '帮会',
    2: '庄园',
    3: '队伍',
}

type CreateProps = {
    type: 1 | 2 | 3,
    createCb: any,
    modify?: boolean
}

export const Create = ({ type, createCb, modify }: CreateProps) => {
    const [name, setName] = useState('');
    const InputRef = useRef({ sub: () => '' });
    const create = (text) => {
        if (!InputRef.current.sub()) {
            socializeCreate({ type, name, text }).then(createCb)
        }
    }
    return (
        <div>
            <div style={{ marginLeft: '6px' }}>
                <div>你还未加入任何{TYPE_MEUN[type]}。</div>
                {
                    type !== 3 ? <div>可以消耗5000000银两或者{type === 1 ? '帮会创建令' : '庄园创建灵'}进行{modify ? '修改' : '创建'}{TYPE_MEUN[type]}。</div>
                        : <div>可以消耗100000银两进行{modify ? '修改' : '创建'}{TYPE_MEUN[type]}。</div>
                }

                <Input label={`${TYPE_MEUN[type]}名`} onChange={setName} InputRef={InputRef} />
                <Input label={`${TYPE_MEUN[type]}宣言`} submit={create} onText={`点击${modify ? '修改' : '创建'}`} type="textarea" />
            </div>

        </div>
    )
}


export default Create;