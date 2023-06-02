import React, { useState, useCallback } from "react";
import Login from "./login";
import Register from "./register";
import './index.less';
export default ({ history }) => {
    const [isLogin, setIsLogin] = useState(true);
    const callback = useCallback(() => {
        console.log('执行callback')
        history.push('/')
    }, [])
    // const 
    console.log(history, 'props...')
    return (
        <div className="login-register-page">
            {isLogin ?
                <Login setIsLogin={setIsLogin} callback={callback} />
                : <Register setIsLogin={setIsLogin} callback={callback} />}
        </div>
    )

}

// export default Login;