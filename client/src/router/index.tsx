
import React, { Suspense, useEffect, useContext } from "react";
import config from "./config";
// import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { goLogin } from "@utils/goLogin";
import { getMeunList } from '@cgi/meun';

import { Model, GET_MEUN_LIST } from '@model';
const Root = () => {
    const model: any = useContext(Model);
    useEffect(() => {
       
        // window.onbeforeunload = function (e) {
        //      roleOffline({t:'离线'})
        // };
        // 请求枚举列表
        getMeunList().then(({ data }) => {
            model.dispatch({
                type: GET_MEUN_LIST,
                data
            })
        })
        // return ()=>{
        //     roleOffline({t:'注销'})
        // }
    }, [])

    // 登录态验证
    goLogin();

    return (
        <Router>
            <Suspense fallback={<div>加载中</div>}>
                <Switch>
                    {config.map(({ component, path, exact }, index) => {
                        return (
                            <Route
                                key={index}
                                path={path}
                                component={component}
                                exact={exact}
                            />
                        );
                    })}
                </Switch>
            </Suspense>
        </Router>
    );
}

export default Root;