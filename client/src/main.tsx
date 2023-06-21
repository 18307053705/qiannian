import React from "react";
import ReactDOM from "react-dom";
import { ModelContext } from '@model';
import Root from './router';
window.QN = {};
import './global.less';
import 'lib-flexible';
import 'autoprefixer';
ReactDOM.render(
    <ModelContext>
       <Root />
    </ModelContext>,
    document.getElementById("root")
);