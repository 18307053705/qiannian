import React from 'react';
import Styles from './index.less';

type RadioType = {
    label: string;
    name: string;
    value: any;
    onCheng: (value: any) => any
}
export const Radio = ({ label, value, name, onCheng }: RadioType) => {
    return (
        <div className={Styles.radio}>
            <input
                type="radio"
                name={name}
                checked={value === name}
                onClick={() => { onCheng(name) }}
            ></input>
            <span className={Styles.label}>{label}</span>
        </div>
    )
}

export default Radio;