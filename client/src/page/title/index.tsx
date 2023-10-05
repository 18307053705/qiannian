import React, { useState, useEffect } from 'react';
import { backGrand,goBack } from '@utils/grand';
import { List } from '@components';
import { getTitleList, wearTitle } from '@cgi/title';
import { ATTR_TEXT } from '@meun';


export const Title = () => {
    const [data, setData]: any = useState();
    const [titleId, setTitleId] = useState();
    const [list, setList]: any[] = useState([]);
    const [page, setPage] = useState(true);


    useEffect(() => {
        getTitleList().then(({ data }) => {
            setData(data);
        })
    }, [])
    useEffect(() => {
        if (data) {
            const { title_list, all } = data;
            if (page) {
                setList(title_list.map((id) => ({ ...all[id], id })));
            } else {
                setList(Object.keys(all).map((id) => ({ ...all[id], id })));
            }
        }

    }, [data, page])

    if (!data) {
        return null;
    }

    const wearTitleClick = (id) => {
        wearTitle({ id }).then(({ data }) => {
            setData((pre) => ({ ...pre, ...data }));
        })
    }

    const prefix = ({ name, id, effect }) => {
        return (
            <div>
                <div>
                    <span className="g_u"><span onClick={() => { setTitleId(id) }}>{name}</span></span>
                    {page && <span className="g_u_end" onClick={() => { wearTitleClick(id) }}>佩戴</span>}
                </div>
                {
                    titleId === id && Object.keys(effect).map((key) => <div key={key}>{ATTR_TEXT[key]}：{effect[key]}</div>)
                }
            </div>
        )
    }
    console.log(data, 'data...');

    const { name, effect } = data.all[data.role_title] || { name: '无', effect: {} };
    return (
        <div>
            <div>当前佩戴称号：{name ? `【${name}】` : '无'}</div>
            {
                Object.keys(effect).map((key) => <div key={key}>{ATTR_TEXT[key]}：{effect[key]}</div>)
            }
            <div>======={page ? '我的称号' : '称号列表'}=======</div>
            <List data={list} prefix={prefix} />
            <div><span className="g_u_end" onClick={() => { setPage(!page) }}>{page ? '称号列表' : '我的称号'}</span></div>
            <div><span className="g_u_end" onClick={goBack}>返回上页</span></div>
            <div><span className="g_u_end" onClick={backGrand}>返回游戏</span></div>
        </div>
    )

}

export default Title;