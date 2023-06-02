import React from "react";
import ReactDOM from "react-dom";
import { ModelContext } from '@model';
import Root from './router';

import './global.less';

ReactDOM.render(
    <ModelContext>
       <Root />
    </ModelContext>,
    document.getElementById("root")
);