import React, { useState, useEffect } from 'react';
import { Input } from '@components';
import { getMaterialtl, setMaterialtl } from '@cgi/socialize';

export const Tael = ({ type }) => {
    const [error, setError] = useState('');
    const [text, setText] = useState('');
    const submit = (value) => {
        setMaterialtl({
            materialId: -1,
            materialNum: Number(value),
            type
        }).then(({ data, message }) => {
            if (message) {
                setError(message);
            } else {
                error && setError('');
                setText(data.text);
            }

        })
    }
    const typeText = type === 1 ? '帮会' : '结义';
    if (type === 1 || type === 2) {
        return (
            <div>
                {error && <div style={{ color: 'red' }}>提示：{error}</div>}
                <div>{text}</div>
                {/* text.push(`捐献${materialNum}银两，获得${typeText}贡献${proffer * 10}点,个人${typeText}声望${proffer}点`); */}
                <div>每捐献100000银两可获得{typeText}贡献10点与个人{typeText}声望1点。</div>
                <div><Input type='number' label='捐献银两' submit={submit} layout={false} /></div>
            </div>
        )
    }
    return null;


}

export default Tael;