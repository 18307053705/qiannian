import React, { useState } from "react";
import { register } from '@cgi/user';
import './index.less';
const Login = ({ setIsLogin, callback }) => {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState('');
    const loginClick: any = () => {
        register({ user, pass }).then(() => {
            callback()
        }).catch(({ message }) => {
            setError(message);
        })
    };

    return (
        <div>
            <div className="title">账号注册</div>
            <div>
                <span>账号：</span>
                <input type="text" value={user} onChange={(e) => { setUser(e.target.value) }} />
                {error ? <span className="error">账号已存在！！！</span> : ''}
            </div>
            <div>
                <span>密码：</span>
                <input type="password" value={pass} onChange={(e) => { setPass(e.target.value) }} />
                <button className="login" onClick={loginClick}>注册</button>
            </div>
            <div className="footer">
                <div>
                    <span>已有账号</span>
                    <span
                        className="tips"
                        onClick={() => {
                            setIsLogin(true)
                        }}>前往登录</span>
                </div>
            </div>
        </div>
    )

}

export default Login;