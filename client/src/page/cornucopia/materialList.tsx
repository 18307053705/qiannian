import React, { useState } from 'react';
import { List, Input } from '@components';

export const MaterialList = ({ materialClick, pageInfo, materialMap, backJuBaoPeng }) => {
    const [ele, setEle]: any = useState();
    const [error, setError] = useState('');
    if (!materialMap) {
        return null;
    }

    const list = materialMap[pageInfo.state];

    const prefix = (row) => <span>{row.name}[{row['value']}]x{row.s}</span>;
    const active = (row) => <span className='g_u_end' onClick={() => { setEle(row); }}>[投]</span>;
    const submit = (num) => {
        if (ele.s < num) {
            setError(`${ele.name}数量不足`);
            return;
        }
        if (num <= 0) {
            return;
        }
        materialClick(ele.id, num);
    }
    return (
        <div>
            {error && <div className='g_error'>提示：{error}</div>}
            {ele && <Input label='数量' type='number' submit={submit} layout={false} />}
            <List data={list} prefix={prefix} hiddenFooter={true} active={active} emptyText="元素材料为空" />
            <div><span onClick={backJuBaoPeng} className="g_u_end">返回上页</span></div>
        </div>
    )
}

export default MaterialList;