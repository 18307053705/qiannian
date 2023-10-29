
import React, { Suspense, useEffect, useState, memo } from "react";
import config from "./config";
// import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route, useHistory, useLocation, Redirect } from "react-router-dom";
import Cookies from 'js-cookie';
import { chatGetUnread } from "@cgi/chat";

function RouterGuard() {
    let history = useHistory();

    let location = useLocation();
    // 拿到路径
    let { pathname } = location;
    useEffect(() => {
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

const RouterGuardMemo = memo(() => {
    return <Router>
        <Suspense fallback={<div>加载中</div>}>
            <Switch>
                <RouterGuard />
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


const systemText = (system) => {
    const time = new Date() / 1000;
    if (!system || time - system.s > 60000) {
        return;
    }
    return system.t;
}

const Root = () => {
    // const { state, dispatch } = useContext(Model);
    const [unread, setUnread] = useState([]);
    const [system, setSystem] = useState('');
    const [exts, setExts]: any = useState({});
    useEffect(() => {
        window.QN.setExts = (value) => {
            window.QN.exts = {
                ...exts,
                ...value,
            };
            setExts((pre)=>({
                ...pre,
                ...value,
            }))
            // setExts({
            //     ...exts,
            //     ...value,
            // });
           console.log("setExts赋值",value)
        };
        // 监听全局点击事件,处理错误信息
        window.addEventListener("click", () => {
            const { location } = window.QN.history;
            const { pathname } = location;
            if (pathname !== '/' && pathname !== '/login' && pathname !== '/reactRole') {
                chatGetUnread().then(({ data, system }: any) => {
                    setUnread(data);
                    setSystem(system);
                })
            } else {
                setUnread([]);
            }

            setExts({});
            console.log("setExts清除")

        });
    }, [])
    // 登录态验证
    // goLogin();
    const { success, listText = [], customSuccess, error } = exts;
    return (
        <div>
            {/* 系统公告 */}
            <div>{systemText(system)}</div>
            
            {/* 请求成功信息 */}
            <div className='g_success'>{success}</div>
            {
                listText.map((text, index) => <div key={index}>{text}</div>)
            }
             <div>{customSuccess}</div>
            {/* 请求失败信息 */}
            {error && <div className='g_error'>提示：{error}</div>}
            <div>{
                unread.map((id, index) => (
                    <span
                        onClick={() => { window.QN.history.push('./chat', { type: id }) }}
                        className='g_u_end'
                    >
                        {CHAT_TYPE_MEUN[id]}({index + 1})
                    </span>
                ))

            }</div>
            <RouterGuardMemo />
        </div>
    );
}

export default Root;