import React, { useState, useEffect } from 'react';
import { Input, List, Radio, GroupRadio } from '@components/index';
import { grounding } from '@cgi/shopping';
import { getRoleInfo } from '@cgi/roleInfo';
// import {} from '@utils/jumpDetail';

export const Pet = ({ historyClick, history }) => {
    const [petList, setPetList] = useState()
    const [unit, setUnit] = useState('tael')
    const [petId, setPetId] = useState();

    useEffect(() => {
        getRoleInfo().then(({ data }) => {
            const { pet_pool } = data;
            const list = pet_pool.l.filter(({ s }) => s === 0)
            setPetList(list)
        })
    }, [])
    const prefix = ({ n, id }) => (<span className="g_u_end">{n}</span>)
    const active = ({ id }) => (<span className="g_u_end" onClick={() => { setPetId(id) }}>出售</span>)

    const submit = (num) => {
        grounding({
            active: 1,
            type: 2,
            price: num,
            unit: unit,
            s: 1,
            petId: petId
        }).then(({ message }) => {
            if (!message) {
                historyClick({ page: 'detai' })
            }
        })
    }
    // 按钮
    const onCheng = (value) => {
        setUnit(value)
    }
    return (
        <div>

            {
                petId && (
                    <GroupRadio>
                        <Radio label="银两出售" name="tael" value={unit} onCheng={onCheng} />
                        <Radio label="元宝出售" name="yuanbao" value={unit} onCheng={onCheng} />
                    </GroupRadio>
                )
            }
            {
                petId && (
                    <Input
                        type='number'
                        submit={submit}
                        close={() => { setPetId('') }}
                    />
                )
            }

            <List data={petList} prefix={prefix} active={active} />

        </div>
    )


}

export default Pet;