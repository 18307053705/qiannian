import React, { useState } from 'react';
import Style from './index.less';
import { nameCheck } from '@utils/check'
export const Input = ({ onOk, label='', onText = '', submit_d = false }) => {

    const [value, setValue] = useState('');
    const [error, setError] = useState('');
    const submit = () => {
        const msg = nameCheck(value);
        if (msg) {
            setError(msg);
            return;
        }
        onOk(value)
    }
    return (
        <div >
            <div className={Style.input}>
                {label && <span style={{marginRight:'2px'}}>{label}:</span>}
                <input
                    type="text"
                    value={value}
                    onChange={(e) => {
                        setError('');
                        setValue(e.target.value);
                    }}
                />
                {!submit_d ? <span className={Style.btn} onClick={submit}>{onText || '确认'}</span> : ''}

            </div>
            {error && <div className={Style.error}>{error}</div>}
        </div>
    )
}

export default Input;