import React, { useState, useEffect } from "react";
import { getRoleInfo, RoleInfoRes, initRoleInfo } from '@cgi/roleInfo';

import RoleAttr from './components/roleAttr';
import RoleEle from './components/roleEle';
import Reputation from './components/roleFame';
import RoleSoci from './components/roleSoci';
import RoleBuff from './components/roleBuff';

import './index.less';

const nva = ['状态', '元素', '声望', '关系', '祝福'];

const RoleInfo = ({ history }) => {
    const [current, setCurrent] = useState(0);
    const [roleInfo, setRoleInfo] = useState<RoleInfoRes>(initRoleInfo);
    useEffect(() => {
        getRoleInfo().then(({ data }) => {
            setRoleInfo(data)
        })
    }, [])

    return (
        <div className="role-info-page">
            <div>
                {
                    nva.map((valeu, index) => (
                        <span className={current === index ? "g_u g_u_d" : 'g_u'} key={index} >
                            <span onClick={() => { setCurrent(index); }}>{valeu}</span>
                        </span>))
                }
            </div>
            <div>
                {current === 0 && <RoleAttr roleInfo={roleInfo}  history={history}/>}
                {current === 1 && <RoleEle roleInfo={roleInfo} />}
                {current === 2 && <Reputation roleInfo={roleInfo} />}
                {current === 3 && <RoleSoci roleInfo={roleInfo} />}
                {current === 4 && <RoleBuff roleInfo={roleInfo} />}

            </div>
            <span className="g_b_u" onClick={() => { history.push('/grand') }}>返回游戏</span>
        </div>
    )

}

export default RoleInfo;