import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { getRoleList, roleLogin } from '@cgi/roleInfo';
import { CAREER_TYPE } from '@meun';
import Logo from './img/QianNianLogo.png';

import Style from './index.less';
const Home = ({ history }) => {
    const [roleList, setRoleList] = useState([])
    useEffect(() => {
        getRoleList().then(({ data }: any) => {
            setRoleList(data)
        })
    }, [])

    const exit = () => {
        Cookies.remove('q_uid');
        Cookies.remove('token');
        Cookies.remove('q_m');
    }

    return (
        <div className={Style['home-page']}>
            <img className={Style.logo} src={Logo} />
            <div>背景:千年前人族,妖族,仙族为了争夺传说中可以让人拥有强大力量的"馒头"持续了一场旷世大战,最终以"馒头"不翼而飞,三族死伤无数落幕,然后千年轮回,冥冥之中似乎有因果牵引,传说中的"馒头"再度出现,一场大战悄无声息的拉开序幕。</div>
            <div>------------------------------------</div>
            <div>请选择角色：</div>
            {
                roleList.map(({ role_name, role_race, role_level, role_id, role_career }) => {
                    return (
                        <div key={role_id}>
                            <span>{role_name}</span>
                            <span>{role_level}级{CAREER_TYPE[role_career]}</span>
                            <span className="g_u" >
                                <span onClick={() => {
                                    roleLogin({ role_id }).then(() => {
                                        history.push('/grand');
                                    })
                                }}>进入游戏</span>
                            </span>
                        </div>
                    )
                })
            }
            {roleList.length < 3 && <span className="g_b_u" onClick={() => { history.push('/reactRole'); }}>创建角色</span>}
            <div className="g_fgx"></div>
            <span className="g_b_u" onClick={exit}>退出登录</span>

        </div>
    )

}

export default Home;