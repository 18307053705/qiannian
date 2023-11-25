import React, { useState } from 'react';
import { List, Input } from '@components';

export const MaterialList = ({ materialClick, materialType, setMaterialMap }) => {
    const [ele, setEle] = useState();
    const [error, setError] = useState('');
    if (!setMaterialMap) {
        return null;
    }

    const list = setMaterialMap[materialType];

    const prefix = (row) => <span>{row.name}[{row['value']}]x{row.s}</span>;
    const active = (row) => <span className='g_u_end' onClick={() => { setEle(row); submit(row) }}>[投]</span>;
    const submit = (ele) => {
        if (ele.s < 10) {
            setError(`${ele.name}数量不足`);
            return;
        }
        materialClick(ele, 10);

    }
    return (
        <div>
            {error && <div className='g_error'>提示：{error}</div>}
            {ele && <Input label='数量' type='number' submit={submit} layout={false} />}
            <List data={list} prefix={prefix} hiddenFooter={true} active={active} emptyText="元素材料为空" />
            <div><span onClick={() => { materialClick() }} className="g_u_end">返回上页</span></div>
        </div>
    )
}

export default MaterialList;