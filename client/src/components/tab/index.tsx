import React, { useState, useEffect } from 'react';

type TabType = {
    list: { label: any; value: any }[],
    onCheng?: (value: any) => void;
    currentKey?: any
}

export const Tab = ({ list, onCheng, currentKey }: TabType) => {
    const [current, setCurrent] = useState(currentKey || list[0].value);
    useEffect(() => {
        onCheng && onCheng(current);
    }, [current])
    return (
        <div>
            {
                list.map(({ value, label }, index) => (
                    <span className={current === value ? "g_u g_u_d" : 'g_u'} key={index} >
                        <span onClick={() => { setCurrent(value); }}>{label}</span>
                    </span>))
            }
        </div>
    )


}

export default Tab;