import React, { useState, useEffect } from "react";
import { backGrand } from '@utils/grand';
import { getRoleInfo } from '@cgi/roleInfo';
import { List } from '@components';
import Detail from './detail';

const PET_STATE = {
    0: '休战',
    1: '参战',
    2: '参战',
    3: '出售',
}

const Pet = ({ history }) => {
    const [pet, setPet]: any = useState({ c: {}, l: [], x: 10 });
    const [pageName, setPageName] = useState('list');
    const [id, setId] = useState(13);
    useEffect(() => {
        getRoleInfo().then(({ data }) => {
            setPet(data.pet_pool)
        })
    }, [pageName])
    const toDetail = (id) => {
        setId(id);
        setPageName('detail')
    }
    const { l, x} = pet;
    const data = [...new Array(x)];
    const prefix = (_, index) => {
        const petInfo = l[index - 1];
        return (
            <div key={index} >
                <span>宠物房：</span>
                {petInfo ?
                    <span
                        className='g_u_end'
                        onClick={
                            () => { toDetail(petInfo.id) }}
                    >
                        {petInfo.n}
                        ({PET_STATE[petInfo.s]})
                        </span>
                    : '可居住'}
            </div>
        )
    }
    return (
        <div>
            {
                pageName === 'list'
                    ? <List data={data} prefix={prefix} hiddenFooter={true} />
                    : <Detail id={id} history={history}/>
            }
            {
                pageName === 'detail' && (
                    <div><span className="g_u_end" onClick={() => { setPageName('list') }}>宠物列表</span></div>
                )
            }
            <div><span onClick={backGrand} className="g_u_end">返回游戏</span></div>
        </div>
    )

}

export default Pet;

