import React, { useState } from 'react';
import { List, Input } from '@components';

export const MaterialList = ({ materialClick, materialType, setMaterialMap }) => {
    const [ele, setEle] = useState();
    const [error, setError] = useState('');
    if (!setMaterialMap) {
        return null;
    }

    const list = setMaterialMap[materialType];

    const activeClick = (index) => {
        setEle({
            ...list[index],
            in_x: index
        })
    }
    const prefix = (row) => <span>{row.n}[{row['value']}]x{row.s}</span>;
    const active = (_, index) => <span className='g_u_end' onClick={() => { activeClick(index - 1) }}>[投]</span>;

    const submit = (num) => {
        if (ele.s < num) {
            setError(`${ele.n}数量不足`);
            return;
        }

        materialClick({
            ...ele,
            s: ele.s - num,
            val: num * ele.value,
            num
        })

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