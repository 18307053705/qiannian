import React, { useState, useEffect } from "react";
import { backGrand } from '@utils/grand';
import { getRoleInfo } from '@cgi/roleInfo';
import { List } from '@components';
import Detail from './detail';
// {c:当前宠物信息(id,n,攻击，暴击，命中,s:状态，技能,id,l,r,),l:宠物房列表id,n,s  x:宠物房最大空间}
import { addPet, getDetail } from '@cgi/pet';

const PET_STATE = {
    0: '休战',
    1: '参战',
    2: '参战',
    3: '出售',
}

const Pet = ({ history }) => {
    const [pet, setPet]: any = useState({ c: {}, l: [], x: 10 });
    const [pageName, setPageName] = useState('detail');
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
    const { l, x, c } = pet;
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
    // const active = (_, index) => {
    //     const petInfo = l[index - 1];
    //     if (!petInfo) {
    //         return null;
    //     }
    //     return (
    //         <div key={`${index}_1`}>
    //             <span className='g_u_end'>{petInfo.s === 1 ? '出战' : '休息'}</span>
    //         </div>
    //     )


    // }

    return (
        <div>
            {/* <div  onClick={()=>{addPet()}} >点击获取宠物</div> */}
            {
                pageName === 'list'
                    ? <List data={data} prefix={prefix} hiddenFooter={true} />
                    : <Detail id={id} history={history} c_id={c.id} />
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

