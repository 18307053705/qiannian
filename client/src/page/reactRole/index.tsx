import React, { useState, useCallback } from "react";
import { createRole } from '@cgi/roleInfo';
import { nameCheck } from '@utils/check';
import { CAREER_TYPE, RACE_TYPE } from '@meun';
import './index.less';



const ReactRole = ({ history }) => {
    const [race, setRace]: any = useState('1');
    const [career, setCareer] = useState('1');
    const [sex, setSex] = useState('1');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const rareerList: any[] = [];
    Object.keys(CAREER_TYPE).forEach((key: any) => {
        const max = race * 3;
        const min = max - 2;
        if (key >= min && key <= max) {
            rareerList.push({
                value: key,
                label: CAREER_TYPE[key]
            })
        }
    })

    const raceClick = useCallback((value) => {
        setRace(value);
        setCareer(3 * (value - 1) + 1 + '')
    }, [])
    const submit = () => {
        const msg = nameCheck(name);
        if (!msg) {
            createRole({
                role_name: name,
                role_sex: sex,
                role_career: Number(career),
                role_race: Number(race)
            }).then(({ data }) => {
                if (data) {
                    history.push('/');
                }
            })
        } else {
            setError(msg);
        }
    }

    return (
        <div className="ceact-role-page">
            <div><span>请选择种族：</span></div>
            <div className="g_radio_group">

                {
                    Object.keys(RACE_TYPE).map((key) => {
                        return (
                            <div className="g_radio_itme" key={key}>
                                <input
                                    type="radio"
                                    name="role_race"
                                    checked={key === race}
                                    value={key}
                                    onChange={() => { raceClick(key) }} />
                                <span>{RACE_TYPE[key]}</span>
                            </div>
                        )
                    })
                }
            </div>
            <div> <span>请选择职业：</span></div>
            <div className="g_radio_group">
                {
                    rareerList.map(({ value, label }) => {
                        return (
                            <div className="g_radio_itme" key={value}>
                                <input
                                    type="radio"
                                    name="role_rareer"
                                    checked={value === career}
                                    value={value}
                                    onChange={() => { setCareer(value) }} />
                                <span>{label}</span>
                            </div>
                        )
                    })
                }
            </div>
            <div> <span>请选择性别：</span></div>
            <div className="g_radio_group">
                <div className="g_radio_itme" >
                    <input
                        type="radio"
                        name="role_sex"
                        checked={sex === '1'}
                        value='1'
                        onChange={() => { setSex('1') }} />
                    <span>男</span>
                </div>
                <div className="g_radio_itme" >
                    <input
                        type="radio"
                        name="role_sex"
                        value='2'
                        checked={sex === '2'}
                        onChange={() => { setSex('2') }} />
                    <span>女</span>
                </div>
            </div>
            <div>
                <div>角色昵称:</div>
                <input type="text"
                    value={name}
                    onChange={(e) => {
                        if (error) {
                            setError('');
                        }
                        setName(e.target.value);
                    }}

                />
                <span className="g_error">{error}</span>
            </div>
            <button className="submit" onClick={submit}>创建角色</button>
        </div>
    )

}

export default ReactRole;