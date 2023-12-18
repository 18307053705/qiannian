import React from "react";
import { List } from "@components";
import Styles from './index.less';
import Logo from '../home/img/QianNianLogo.png';
import Cookies from 'js-cookie';
const REGION_LIST = [
    {
        lable: '测试区',
        value: '0001',
    }
]

const Constituency = ({ history }) => {
    const select = (value) => {
        Cookies.set('region', value);
        history.push('/');
    }

    const prefix = ({ lable, value }) => {
        return (
            <div>
                <span>{lable}</span> | <span className="g_u_end" onClick={() => { select(value) }}>进入</span>
            </div>
        )

    }
    const exit = () => {
        Cookies.remove('q_uid');
        Cookies.remove('token');
        Cookies.remove('q_m');
    }
    return (
        <div>
            <img className={Styles.logo} src={Logo} />
            <div>请选择大区：</div>
            <List data={REGION_LIST} prefix={prefix} />
            <div className={Styles.exit}><span className="g_b_u" onClick={exit}>退出登录</span></div>
        </div>
    )
}
export default Constituency;