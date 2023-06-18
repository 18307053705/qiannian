import React, { useState, useEffect } from 'react';

import { List } from '@components/index';
import { getsocializeList, getsocializeDetail, socializeApply, socializeActive, socializeAdjust } from '@cgi/socialize';
import { backGrand } from '@utils/grand'
import Gang from './gang';
import Create from './create';
const TYPE_MEUN = {
    1: '帮会',
    2: '庄园',
    3: '队伍',
}

const getRoleLevelName = (type, level) => {
    if (type === 1) {
        return {
            text: ['帮主', '副帮主', '长老', '精英', '成员'][level - 1],
            limits: level < 4
        }
    }
    if (type === 2) {
        return {
            text: ['庄主', '副庄主', '精英', '成员', '成员'][level - 1],
            limits: level < 3
        }
    }
    return {
        text: ['队长', '成员', '成员', '成员', '成员'][level - 1],
        limits: level === 1
    }


}

type KeyType = 'detai' | 'list' | 'apply' | 'member' | 'adjust' | 'create';

export const Socialize = ({ history }) => {
    const [error, setError] = useState('');
    const [updata, setUptate] = useState(true);
    const [isCreate, setIsCreate] = useState(false);
    const [type, setType]: any = useState(1);
    const [pageName, setPageName] = useState<KeyType>('detai');
    const [socializeList, setSocializeList] = useState([]);
    const [socialize, setSocializea] = useState();
    const updataDetail = () => {
        const { state } = history.location;
        getsocializeDetail({ type: state.type }).then(({ data }) => {
            if (data) {
                const list = data.compose.sort((a, b) => a.level - b.level);
                setSocializea({
                    ...data,
                    list,
                    mianInfo: list[0]
                });
            } else {
                setSocializea('');
                setIsCreate(true);
            }
        })
    }
    const createCb = ({ message }) => {
        if (message) {
            setError(message);
            return;
        }
        setIsCreate(false);
    }
    useEffect(() => {
        const { state } = history.location;
        setType(state.type);
        updataDetail();
        getsocializeList({ type: state.type }).then(({ data }) => {
            setSocializeList(data);
        })
    }, [updata])
    // 势力申请
    const applyClick = (id) => {
        socializeApply({ type, id }).then(({ message }) => {
            setError(message);
        })
    }
    // 申请处理
    const activeClick = (roleId, state) => {
        socializeActive({ type, role_id: roleId, state }).then(({ message, data }) => {
            setError(message);
            if (data) {
                setSocializea({
                    ...socialize,
                    apply: data
                })
            }
        })
    }
    // 人员调整
    const adjustClick = (role_id, chengLevel) => {
        socializeAdjust({ role_id, chengLevel, type }).then(({ message, data }) => {
            setError(message);
            if (data) {
                setSocializea({
                    ...socialize,
                    list: data.sort((a, b) => a.level - b.level)
                })
            }
        })

    }

    const active = ({ level, id }, index) => {
        if (pageName === 'member' && level !== 1) {
            return (
                <div key={index}>
                    <span

                        className="g_u_end"
                        style={{ marginLeft: '3px' }}
                        onClick={() => { adjustClick(id, -1) }}
                    >
                        踢出{TYPE_MEUN[type]}
                    </span>
                </div>

            )
        }

        if (type === 1 && level !== 1) {
            return (
                <div key={index}>
                    {level !== 2 && <span className="g_u"><span onClick={() => { adjustClick(id, 2) }}>副帮主</span></span>}
                    {level !== 3 && <span className="g_u"><span onClick={() => { adjustClick(id, 3) }}>长老</span></span>}
                    {level !== 4 && <span className="g_u"><span onClick={() => { adjustClick(id, 4) }}>精英</span></span>}
                    {level !== 5 && <span className="g_u"><span onClick={() => { adjustClick(id, 5) }}>成员</span></span>}
                </div>
            )
        }

        if (type === 2 && level !== 1) {
            return (
                <div key={index}>
                    {level !== 2 && <span className="g_u"><span onClick={() => { adjustClick(id, 2) }}>副庄主</span></span>}
                    {level !== 3 && <span className="g_u"><span onClick={() => { adjustClick(id, 3) }}>精英</span></span>}
                    {level !== 5 && <span className="g_u"><span onClick={() => { adjustClick(id, 5) }}>成员</span></span>}
                </div>
            )
        }
        return null;
    }


    return (
        <div>
            {error && <div style={{ color: 'red' }}>提示：{error}</div>}
            {pageName === 'detai' && isCreate && <Create type={type} createCb={createCb} />}

            {
                pageName === 'detai' && type == 1 && (
                    <Gang updata={updata} socialize={socialize} setPageName={setPageName} />
                )
            }
            {/* {pageName === 'detai' && type == 2 && <Intersect history={history}  socialize={socialize} />}
            {pageName === 'detai' && type == 3 && <Ranks history={history}  socialize={socialize} />} */}
            {
                pageName === 'list' && <List
                    data={socializeList}
                    prefix_d={true}
                    prefix={(row, index) => (
                        <span key={index}>{index}.{row.name}{type !== 3 && `(${row.level}级)`}</span>
                    )}
                    active={({ soci_id }) => (
                        isCreate && (
                            <span
                                className='g_u_end'
                                key={soci_id}
                                onClick={() => { applyClick(soci_id) }}
                            >
                                加入{TYPE_MEUN[type]}
                            </span>
                        )
                    )}
                />
            }
            {
                pageName === 'apply' && <List
                    data={socialize.apply}
                    prefix_d={true}
                    prefix={({ name, id }, index) => <span key={id}>{index}.{name}</span>}
                    active={({ id }) => (
                        <div key={id}>
                            <span className='g_u'><span onClick={() => { activeClick(id, 1) }}>通过</span></span>
                            <span className='g_u'><span onClick={() => { activeClick(id, 0) }}>拒绝</span></span>
                        </div>
                    )}
                />
            }
            {
                (pageName === 'member' || pageName === 'adjust') && (
                    <div>

                        <List
                            data={socialize.list}
                            prefix_d={true}
                            prefix={({ id, name, line, level }, index) => (
                                <div key={id}>
                                    <span className={line && 'g_u_end'}>
                                        {index}.{name}
                                        {line && `${line}级`}
                                        ({getRoleLevelName(type, level).text})
                                    </span>
                                </div>
                            )}
                            active={active}
                        />
                        <span className='g_u_end'>
                            {socialize.role_level === 1 ? `解散${TYPE_MEUN[type]}` : `退出${TYPE_MEUN[type]}`}
                        </span>
                    </div>
                )
            }
            <div><span className="g_u_end" onClick={() => { setPageName('detai'); setUptate(!updata); }}>我的{TYPE_MEUN[type]}</span></div>
            <div><span className="g_u_end" onClick={() => { setPageName('list'); setUptate(!updata); }}>{TYPE_MEUN[type]}列表</span></div>
            <div><span className="g_u_end" onClick={backGrand}>返回游戏</span></div>
        </div>
    )
}

export default Socialize;