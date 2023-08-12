import React, { useState } from 'react';
import { Input } from '@components';
import { setMaterialtl } from '@cgi/socialize';

export const Tael = ({ type }) => {
    const [text, setText] = useState('');
    const submit = (value) => {
        setMaterialtl({
            materialId: -1,
            materialNum: Number(value),
            type
        }).then(({ data }) => {
            if (data) {
                setText(data);
            }

        })
    }
    const typeText = type === 1 ? '帮会' : '结义';
    if (type === 1 || type === 2) {
        return (
            <div>
                <div>{text}</div>
                <div>每捐献100000银两可获得{typeText}贡献10点与个人{typeText}声望1点。</div>
                <div><Input type='number' label='捐献银两' submit={submit} layout={false} /></div>
            </div>
        )
    }
    return null;


}

export default Tael;