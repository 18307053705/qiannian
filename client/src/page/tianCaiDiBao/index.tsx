import React, { useState, useRef, useEffect } from 'react';
import { backGrand } from '@utils';
import { gather } from '@cgi/synthesis';
const TianCaiDiBao = () => {
    const [text, setText] = useState('采集天材地宝');
    const timer = useRef<any>();
    const textNum = (num) => {
        if (timer.current) {
            clearInterval(timer.current);
        }
        let nums = Math.floor(num / 1000);
        timer.current = setInterval(() => {
            if (nums === 0) {
                setText('采集天材地宝');
                clearInterval(timer.current);
                return;
            }
            setText(`${nums}秒后可继续采集天材地宝`);
            nums--;
        }, 1000)
    }


    useEffect(()=>{
        return ()=>{
            if (timer.current) {
                clearInterval(timer.current);
            }
        }
    },[])

    const handlerGather = () => {
        gather().then(({ code, data }) => {
            if (code === 0) {
                textNum(data || 10000);
            }

        })
    }



    return (
        <div>

            <div>洞府内太阴石，太阳石，凝血草，聚气草这些外界极为稀有的天材地宝这里竟然到处都是。</div>
            <div style={{ lineHeight: "24px" }}>
                采集天材地宝有概率遇到守护妖兽，击杀后有概率获得冰，雷，风，水，火先天灵石。
            </div>
            <div><span className='g_u_end' onClick={handlerGather}>{text}</span></div>
            <div><span className='g_u_end' onClick={backGrand}>离开洞天</span></div>

        </div>
    )
}

export default TianCaiDiBao;