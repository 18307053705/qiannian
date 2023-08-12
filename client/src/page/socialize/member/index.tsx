import React, { useState } from 'react';
import { List } from '@components';
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

export const Member = ({ type, pageName, adjustClick, socialize, eixt }) => {
    const [ok, setOk] = useState(false);
    const active = ({ level, id, isRole }, index) => {
        if (isRole) {
            return null;
        }
        
        if ((pageName === 'member' || type === 3) && level !== 1) {
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
                    任命：
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
                    任命：
                    {level !== 2 && <span className="g_u"><span onClick={() => { adjustClick(id, 2) }}>副庄主</span></span>}
                    {level !== 3 && <span className="g_u"><span onClick={() => { adjustClick(id, 3) }}>精英</span></span>}
                    {level !== 5 && <span className="g_u"><span onClick={() => { adjustClick(id, 5) }}>成员</span></span>}
                </div>
            )
        }
        return null;
    }

    if (!socialize) {
        return null;
    }

    return (
        <div>
            <List
                data={socialize.list}
                prefix_d={true}
                hiddenFooter={type === 3}
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
            <div>
                <div>
                    <span className='g_u_end' onClick={() => { setOk(true) }}>
                        {socialize.role_level === 1 ? `解散${TYPE_MEUN[type]}` : `退出${TYPE_MEUN[type]}`}
                    </span>
                </div>
                {
                    ok && (
                        <div>
                            <div style={{ color: 'red' }}>确定{socialize.role_level === 1 ? `解散${TYPE_MEUN[type]}` : `退出${TYPE_MEUN[type]}`}？</div>
                            <div>
                                <span className='g_btn' onClick={eixt}>确定</span>
                                <span className='g_btn' onClick={() => { setOk(false) }}>取消</span>
                            </div>
                        </div>
                    )
                }
            </div>

        </div>
    )


}

export default Member;