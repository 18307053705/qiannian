
import React from "react";

const Tips = () => {
    const { success, listText = [], customSuccess, error } = window.QN.tips || {};
    return (
        <div>
            <div className='g_success'>{success}</div>
            {
                listText.map((text, index) => <div key={index}>{text}</div>)
            }
            <div>{customSuccess}</div>
            {error && <div className='g_error'>提示：{error}</div>}
        </div>
    );
}

export default Tips;