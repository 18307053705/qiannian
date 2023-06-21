
import React, { Suspense, useEffect, useContext, useState, memo, useRef } from "react";
import config from "./config";
// import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route, useHistory, useLocation, Redirect } from "react-router-dom";
import { getMeunList } from '@cgi/meun';
import Cookies from 'js-cookie';
import { Model, GET_MEUN_LIST } from '@model';
import { chatGet } from "@cgi/chat";

function RouterGuard({ setUnread, historyRef }) {
    let history = useHistory();

    let location = useLocation();
    // 拿到路径
    let { pathname } = location;
    if (pathname !== '/' && pathname !== '/login' && pathname !== '/reactRole') {
        chatGet().then(({ data }) => {
            setUnread(data);
        })
    } else {
        setUnread([]);
    }
    useEffect(() => {
        historyRef.current = history;
        window.QN.history = history;
    }, [])

    // 拿到当前路由
    let thisRoute = config.find((el) => el['path'] == pathname);
    let isLogin = Cookies.get("token");
    //如果没登录且页面为登录页的话渲染登录页
    if (pathname == '/login' && !isLogin) {
        return <Route path={pathname} component={thisRoute['component']} exact={thisRoute['component']} />
    }
    //如果已经登录渲染页面
    if (isLogin) {
        //如果登陆了跳转login页，则重定向
        if (pathname == '/login') {
            return <Redirect to="/" />
        }
        // 判定路由是否存在，如果存在正常渲染
        if (thisRoute) {
            return <Route path={pathname} component={thisRoute['component']} exact />
        } else {
            //否则进入404页面
            return <Redirect to="/error" />;
        }
    } else {
        // 否则跳转到登录页
        return <Redirect to="/login" />
    }
}

const RouterGuardMemo = memo<{ setUnread: any, historyRef: any }>(({ setUnread, historyRef }) => {
    return <Router>
        <Suspense fallback={<div>加载中</div>}>
            <Switch>
                <RouterGuard setUnread={setUnread} historyRef={historyRef} />
            </Switch>
        </Suspense>
    </Router>
}, () => true)


const CHAT_TYPE_MEUN = {
    1: '私',
    2: '帮',
    3: '义',
    4: '队',
}

const Root = () => {
    const { state, dispatch } = useContext(Model);
    const [unread, setUnread] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const historyRef: any = useRef(null);
    useEffect(() => {
        window.QN.setError = (value) => {
            window.QN.error = value;
            setError(value);
        };
        window.QN.setSuccess = (value) => {
            window.QN.success = value;
            setSuccess(value);
        };
        // 监听全局点击事件,处理错误信息
        window.addEventListener("click", () => {
            if (window.QN.error) {
                setError('');
            }
            if (window.QN.success) {
                setSuccess('');
            }
        });
        // 请求枚举列表
        getMeunList().then(({ data }) => {
            dispatch({
                type: GET_MEUN_LIST,
                data
            })
        })
    }, [])
    // 登录态验证
    // goLogin();
    return (
        <div>
            {success && <div>{success}</div>}
            {error && <div style={{ color: 'red' }}>提示：{error}</div>}
            <div>{
                unread.map((id, index) => (
                    <span
                        onClick={() => { historyRef.current.push('./chat', { type: id }) }}
                        className='g_u_end'
                    >
                        {CHAT_TYPE_MEUN[id]}({index + 1})
                    </span>
                ))

            }</div>
            <RouterGuardMemo setUnread={setUnread} historyRef={historyRef} />
        </div>
    );
}

export default Root;