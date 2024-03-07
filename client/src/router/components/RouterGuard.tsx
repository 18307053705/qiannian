
import React, { Suspense, useEffect, memo } from "react";
import { BrowserRouter as Router, Switch, Route, useHistory, useLocation, Redirect } from "react-router-dom";
import Cookies from 'js-cookie';
import config from "../config";

import Tips from './Tips';

function RouterGuard() {
    const history = useHistory();
    const location = useLocation();
    const { pathname } = location;
    const thisRoute = config.find((el) => el['path'] == pathname);
    console.log(pathname,'pathname...')
    const isLogin = Cookies.get("token");
    const region = Cookies.get("region");
    useEffect(() => {
        window.QN.history = history;
    }, [])

    if(pathname === '/test' && thisRoute){
        return <Route path={pathname} component={thisRoute['component']} exact />;
    }

    if ((isLogin && region) || (pathname == '/login' && !isLogin) || (pathname == '/constituency' && !region)) {
        return thisRoute ? <Route path={pathname} component={thisRoute['component']} exact /> : <Redirect to="/error" />;
    }
    // 未登录
    if (!isLogin) {
        return <Redirect to="/login" />
    }
    return <Redirect to="/constituency" />
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

