import React, { useState, useEffect } from 'react';
import Style from './index.less';
import { nameCheck, areaCheck, numCheck } from '@utils/check'


type InputProps = {
    submit?: (value: string) => void;
    onChange?: (value: string) => void;
    label?: string;
    onText?: string;
    type?: 'text' | 'number' | 'textarea',
    InputRef?: { current: any }
}

export const Input = (props: InputProps) => {
    const { submit, type = 'text', InputRef } = props;
    const [value, setValue] = useState('');
    const [error, setError] = useState('');
    const btnClick = () => {
        if (type === 'number') {
            const msg = numCheck(value);
            if (msg) {
                setError(msg);
                return msg;
            }
        }
        if (type === 'text') {
            const msg = nameCheck(value);
            if (msg) {
                setError(msg);
                return msg;
            }
        }
        if (type === 'textarea') {
            const msg = areaCheck(value);
            if (msg) {
                setError(msg);
                return msg;
            }
        }
        submit && submit(value);
        return ''
    }
    useEffect(() => {
        InputRef && (InputRef.current.sub = btnClick);
    }, [value])
    const onChange = (e) => {
        let str = e.target.value;
        setError('');
        setValue(str);
        props.onChange && props.onChange(str)
    }
    return (
        <div >
            <div className={Style.input}>
                {props.label && <span className={Style.label}>{props.label}:</span>}

                {type === 'textarea' ? (
                    <textarea
                        className={Style.connet}
                        value={value}
                        onChange={onChange}
                        rows={4}
                    />
                ) : (
                        <input
                            className={Style.connet}
                            type='text'
                            value={value}
                            onChange={onChange}
                        />
                    )}
            </div>
            {submit && <div className={Style.btn} ><span onClick={btnClick}>{props.onText || '确认'}</span></div>}
            {error && <div className={Style.error}>{error}</div>}
        </div>
    )
}

export default Input;