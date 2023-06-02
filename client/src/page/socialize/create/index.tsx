import React, { useState, useMemo } from 'react';

export const Create = () => {
    const [value, setValue] = useState('');

    return (
        <div>
            <span>创建帮会:</span>
            <input style={{marginLeft:'3px',marginRight:'3px',width:'120px'}} type="text" value={value} onChange={(e) => { setValue(e.target.value) }} />
            <button>确定</button>
        </div>
    )
}


export default Create;