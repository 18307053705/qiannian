
import React, { Suspense, useEffect, useContext } from "react";
import config from "./config";
// import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { goLogin } from "@utils/goLogin";
import { getMeunList } from '@cgi/meun';

import { Model, GET_MEUN_LIST } from '@model';
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
                                    f={111}
                                />
                            );
                        })}
                    </Switch>
                </Suspense>
            </Router>
        </div>
    );
}

export default Root;