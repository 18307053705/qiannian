import React from 'react';
import Styles from './index.less';

export const GroupRadio: React.FC = ({ children }) => {
    return (
        <div className={Styles['group-radio']}>
            {children}
        </div>
    )
}

export default GroupRadio;