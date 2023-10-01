import React, { useState } from "react";
import { login } from '@cgi/user';
import Styles from './index.less';
const Login = ({ setIsLogin, callback }) => {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const loginClick: any = () => {
        login({ user, pass }).then(({ data }) => {
            if (data) {
                callback()
            }
        })
    };

    return (
        <div>
            <div className={Styles.title}>登录千年！</div>
            <div>
                <span>账号：</span>
                <input type="text" value={user} onChange={(e) => { setUser(e.target.value) }} />
            </div>
            <div>
                <span>密码：</span>
                <input type="password" value={pass} onChange={(e) => { setPass(e.target.value) }} />
                <button className={Styles.login} onClick={loginClick}>登录</button>
            </div>

            <div className={Styles.footer}>
                {/* <div>可以使用手机号或账号登录。</div> */}
                <div>
                    <span>没有账号可</span>
                    <span
                        className={Styles.tips}
                        onClick={() => {
                            setIsLogin(false);
                        }}>点击注册</span>
                </div>
            </div>

        </div>
    )

}

export default Login;