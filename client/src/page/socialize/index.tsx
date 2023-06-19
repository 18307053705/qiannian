import React, { useState, useEffect } from 'react';
import { List } from '@components/index';
import { getsocializeList, getsocializeDetail, socializeApply, socializeActive, socializeAdjust, socializeExit } from '@cgi/socialize';
import { backGrand } from '@utils/grand';
import Gang from './gang';
import Intersect from './intersect';
import Ranks from './ranks';
import Create from './create';
import Material from './material';
import Tael from './tael';
import Member from './member';
const TYPE_MEUN = {
    1: '帮会',
    2: '庄园',
    3: '队伍',
}

type KeyType = 'detai' | 'list' | 'apply' | 'member' | 'adjust' | 'create' | 'material' | 'tael';

export const Socialize = ({ history }) => {
    const [error, setError] = useState('');
    const [updata, setUptate] = useState(true);
    const [isCreate, setIsCreate] = useState(false);
    const [type, setType]: any = useState(1);
    const [pageName, setPageName] = useState<KeyType>('detai');
    const [socializeList, setSocializeList] = useState([]);
    const [socialize, setSocializea] = useState();
    const [ok, setOk] = useState(false);
    // 退出势力
    const eixt = () => {
        socializeExit({ type }).then(({ data }) => {
            if (data) {
                setUptate(!updata);
                setPageName('detai');
            }
        })
    }

    // 创建势力回调
    const createCb = ({ message }) => {
        if (message) {
            setError(message);
            return;
        }
        setIsCreate(false);
    }

    useEffect(() => {
        setError('');
        setOk(false);
    }, [pageName])
    useEffect(() => {
        const { state } = history.location;
        setType(state.type);
        // 获取势力详情
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
        // 获取势力列表
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

    return (
        <div>
            {error && <div style={{ color: 'red' }}>提示：{error}</div>}
            {/* 创建势力 */}
            {pageName === 'detai' && isCreate && <Create type={type} createCb={createCb} />}
            {/* 捐赠材料 */}
            {pageName === 'material' && (<Material type={type} />)}
            {/* 捐赠银两 */}
            {pageName === 'tael' && (<Tael type={type} />)}
            {/* 帮会界面 */}
            {pageName === 'detai' && type == 1 && (<Gang socialize={socialize} setPageName={setPageName} />)}
            {pageName === 'detai' && type == 2 && <Intersect socialize={socialize} setPageName={setPageName} />}
            {pageName === 'detai' && type == 3 && (
                <Ranks
                    setPageName={setPageName}
                    socialize={socialize}
                    pageName={pageName}
                    adjustClick={adjustClick}
                    type={type}
                    eixt={eixt} />
            )}
            {/* 势力列表 */}
            {
                pageName === 'list' && <List
                    data={socializeList}
                    prefix_d={true}
                    prefix={(row, index) => (
                        <span key={index}>{index}.{row.name}{type !== 3 && `(${row.level}级)`}</span>
                    )}
                    active={({ soci_id }, index) => (
                        isCreate && (
                            <span
                                className='g_u_end'
                                key={index}
                                onClick={() => { applyClick(soci_id) }}
                            >
                                加入{TYPE_MEUN[type]}
                            </span>
                        )
                    )}
                />
            }
            {/* 势力申请列表 */}
            {
                pageName === 'apply' && <List
                    data={socialize.apply}
                    prefix_d={true}
                    prefix={({ name}, index) => <span key={index}>{index}.{name}</span>}
                    active={({ id }, index) => (
                        <div key={index}>
                            <span className='g_u'><span onClick={() => { activeClick(id, 1) }}>通过</span></span>
                            <span className='g_u'><span onClick={() => { activeClick(id, 0) }}>拒绝</span></span>
                        </div>
                    )}
                />
            }
            {
                (pageName === 'member' || pageName === 'adjust') && (
                    <Member socialize={socialize} pageName={pageName} adjustClick={adjustClick} type={type} eixt={eixt} />
                )
            }
            <div><span className="g_u_end" onClick={() => { setPageName('detai'); setUptate(!updata); }}>我的{TYPE_MEUN[type]}</span></div>
            <div><span className="g_u_end" onClick={() => { setPageName('list'); setUptate(!updata); }}>{TYPE_MEUN[type]}列表</span></div>
            <div><span className="g_u_end" onClick={backGrand}>返回游戏</span></div>
        </div>
    )
}

export default Socialize;