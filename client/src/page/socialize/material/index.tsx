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
                <div><div>拥有木材:{info[140] || 0}</div><Input type='number' label='捐赠' submit={v => { submit(140, v) }} layout={false} /></div>
                <div><div>拥有石料:{info[141] || 0}</div><Input type='number' label='捐赠' submit={v => { submit(141, v) }} layout={false} /></div>
                <div><div>拥有战鼓:{info[142] || 0}</div><Input type='number' label='捐赠' submit={v => { submit(142, v) }} layout={false} /></div>
                <div><div>拥有水晶:{info[143] || 0}</div><Input type='number' label='捐赠' submit={v => { submit(143, v) }} layout={false} /></div>
                <div><div>拥有锦旗:{info[144] || 0}</div><Input type='number' label='捐赠' submit={v => { submit(144, v) }} layout={false} /></div>
                <div><div>拥有战车:{info[145] || 0}</div><Input type='number' label='捐赠' submit={v => { submit(145, v) }} layout={false} /></div>
                <div><div>拥有帮会创建令:{info[146] || 0}</div><Input label='捐赠' submit={v => { submit(146, v) }} layout={false} /></div>
                <div><span className='g_u_end' onClick={() => { submit('all', 0) }}>全部捐赠</span></div>
            </div>
        )
    }
    return null;


}

export default Material;