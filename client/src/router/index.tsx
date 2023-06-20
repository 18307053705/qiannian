
import React, { Suspense, useEffect, useContext } from "react";
import config from "./config";
// import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route, useHistory, useLocation, Redirect } from "react-router-dom";
import { goLogin } from "@utils/goLogin";
import { getMeunList } from '@cgi/meun';
import Cookies from 'js-cookie';
import { Model, GET_MEUN_LIST } from '@model';

function RouterGuard() {

    useEffect(()=>{
        console.log(pathname);
    })

    let history = useHistory();
    let location = useLocation();
    // 拿到路径
    let { pathname } = location;
    
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

const Root = () => {
    const { state, dispatch } = useContext(Model);
    useEffect(() => {
        // 请求枚举列表
        getMeunList().then(({ data }) => {
            dispatch({
                type: GET_MEUN_LIST,
                data
            })
        })
    }, [])
    // 登录态验证
    goLogin();
    return (
        <div>
            {
                state.error && <div style={{ color: 'red' }}>提示：{state.error}</div>
            }
            <div><span>私(1)</span> <span>帮(1)</span></div>
            <Router>
                <Suspense fallback={<div>加载中</div>}>
                    <Switch>
                        <RouterGuard />
                        {/* {config.map(({ component, path, exact }, index) => {
                            return (
                                <Route
                                    key={index}
                                    path={path}
                                    component={component}
                                    exact={exact}
                                />
                            );
                        })} */}
                    </Switch>
                </Suspense>
            </Router>
        </div>
    );
}

export default Root;