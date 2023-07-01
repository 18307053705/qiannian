import React, { useState } from "react";
import { login } from '@cgi/user';
const Login = ({ setIsLogin, callback }) => {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState('');
    const loginClick: any = () => {
        login({ user, pass }).then(() => {
            callback()
        }).catch(({ message }) => {
            setError(message);
        })
    };

    return (
        <div>
            <div className="title">登录千年之战！</div>
            {error ? <div className="error">账号密码有误！！！</div> : ''}
            <div>
                <span>账号：</span>
                <input type="text" value={user} onChange={(e) => { setUser(e.target.value) }} />
            </div>
            <div>
                <span>密码：</span>
                <input type="password" value={pass} onChange={(e) => { setPass(e.target.value) }} />
                <button className="login" onClick={loginClick}>登录</button>
            </div>

            <div className="footer">
                {/* <div>可以使用手机号或账号登录。</div> */}
                <div>
                    <span>没有账号可</span>
                    <span
                        className="tips"
                        onClick={() => {
                            setIsLogin(false);
                        }}>点击注册</span>
                </div>
            </div>

        </div>
    )

}

export default Login;