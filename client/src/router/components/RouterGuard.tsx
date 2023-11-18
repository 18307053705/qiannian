
import React, { Suspense, useEffect, memo } from "react";
import { BrowserRouter as Router, Switch, Route, useHistory, useLocation, Redirect } from "react-router-dom";
import Cookies from 'js-cookie';
import config from "../config";

import Tips from './Tips';

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

// export const RouterGuardMemo = memo(() => {
//     return (
//         <Router>
//             <Suspense fallback={<div>加载中</div>}>
//                 {/* 提示信息 */}
//                 <Tips />
//                 <Switch>
//                     <RouterGuard />
//                 </Switch>
//             </Suspense>
//         </Router>
//     )
// }, () => true)

export const RouterGuardMemo = () => {
    return (
        <Router>
            <Suspense fallback={<div>加载中</div>}>
                {/* 提示信息 */}
                <Tips />
                <Switch>
                    <RouterGuard />
                </Switch>
            </Suspense>
        </Router>
    )
};

export default RouterGuardMemo;

