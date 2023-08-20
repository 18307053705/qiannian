import React, { useState, useCallback } from "react";
import Login from "./login";
import Register from "./register";
import './index.less';
export default ({ history }) => {
    const [isLogin, setIsLogin] = useState(true);
    const callback = useCallback(() => {
        history.push('/');
    }, [])
    return (
        <div className="login-register-page">
            {
                isLogin ?
                    <Login setIsLogin={setIsLogin} callback={callback} />
                    : <Register setIsLogin={setIsLogin} callback={callback} />
            }
        </div>
    )
}
