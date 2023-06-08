import React, { useState } from 'react';
import Style from './index.less';
import { nameCheck } from '@utils/check'

type InputProps = {
    submit?: (value: string) => void;
    onChange?: (value: string) => void;
    label?: string;
    onText?: string;
    type?: 'text' | 'number'
}

export const Input = (props: InputProps) => {

    const { submit } = props;

    const [value, setValue] = useState('');
    const [error, setError] = useState('');
    const btnClick = () => {
        if (props.type === 'number') {
            submit && submit(value);
            return;
        }
        const msg = nameCheck(value);
        if (msg) {
            setError(msg);
            return;
        }
        submit && submit(value)
    }

    const onChange = (e) => {
        let str = e.target.value;
        if (props.type === 'number') {
            str = str.replace(/\D*/g, '');
        }
        setError('');
        setValue(str);
        props.onChange && props.onChange(str)
    }

    return (
        <div >
            <div className={Style.input}>
                {props.label && <span style={{ marginRight: '2px' }}>{props.label}:</span>}
                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                />
                {submit ? <span className={Style.btn} onClick={btnClick}>{props.onText || '确认'}</span> : ''}

            </div>
            {error && <div className={Style.error}>{error}</div>}
        </div>
    )
}

export default Input;