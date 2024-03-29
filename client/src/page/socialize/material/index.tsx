import React, { useState, useEffect } from 'react';
import { Input } from '@components';
import { getMaterialtl, setMaterialtl } from '@cgi/socialize';

export const Material = ({ type }) => {
    const [info, setInfo] = useState({});
    const [text, setText] = useState('');
    const getMaterialtlList = () => {
        getMaterialtl({ type }).then(({ data }) => {
            setInfo(data);
        })
    }

    useEffect(getMaterialtlList, [])
    const submit = (materialId, value) => {
        setMaterialtl({
            materialId,
            materialNum: Number(value),
            type
        }).then(({ data, message }) => {
            if (!message) {
                getMaterialtlList();
                setText(data);
            }

        })
    }

    if (type === 1) {
        return (
            <div>
                <div>{text}</div>
                <div><div>拥有木材:{info[53] || 0}</div><Input type='number' label='捐赠' submit={v => { submit(53, v) }} layout={false} /></div>
                <div><div>拥有石料:{info[54] || 0}</div><Input type='number' label='捐赠' submit={v => { submit(54, v) }} layout={false} /></div>
                <div><div>拥有战鼓:{info[55] || 0}</div><Input type='number' label='捐赠' submit={v => { submit(55, v) }} layout={false} /></div>
                <div><div>拥有水晶:{info[56] || 0}</div><Input type='number' label='捐赠' submit={v => { submit(56, v) }} layout={false} /></div>
                <div><div>拥有锦旗:{info[57] || 0}</div><Input type='number' label='捐赠' submit={v => { submit(57, v) }} layout={false} /></div>
                <div><div>拥有战车:{info[58] || 0}</div><Input type='number' label='捐赠' submit={v => { submit(58, v) }} layout={false} /></div>
                <div><div>拥有帮会创建令:{info[59] || 0}</div><Input label='捐赠' submit={v => { submit(59, v) }} layout={false} /></div>
                <div><span className='g_u_end' onClick={() => { submit('all', 0) }}>全部捐赠</span></div>
            </div>
        )
    }
    return null;


}

export default Material;