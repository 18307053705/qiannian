import React, { useState, useEffect } from 'react';

 export default ()=><div>1111</div>




// function sum(...nums) {

//     if (nums.length > 1) {
//         return nums.reduce((a, b) => a + b);
//     }

//     let num = nums[0];
//     let index = 1;

//     function loop(a) {
//         num += a;
//         index++;
//         if (index === 3) {
//             return num;
//         }
//         return loop;
//     }


//     return loop;
// }



// function test(nums) {
//     const monys = [10, 5, 2, 1];
//     let s = 0;
//     let index = 0;
//     let len = monys.length;
//     while (nums !== 0 && len > index) {
//         const inx = monys.indexOf(nums);
//         if (inx !== -1) {
//             nums = 0;
//             s += 1;
//         }

//         const mony = monys[index];
//         s += Math.floor(nums / mony);
//         nums %= mony;
//         index++;
//     }
//     return s;
// }

// interface Todo {
//     title: string
//     description: string
//     completed: boolean
// }


// type MyPick<T,K> = {
//     [T]:K
// }



// type TodoPreview = MyPick<Todo, 'title' | 'completed'>

// const todo: TodoPreview = {
//     title: 'Clean room',
//     completed: false,
// }


// function Input({ value, onChang }) {
//     const [oldVal, setOldVal] = useState(value)

//     useEffect(() => {
//         if (onChang) {
//             onChang(oldVal)
//         }
//     }, [oldVal])

//     return <input onChange={(e) => { setOldVal(e.target.value) }} value={oldVal} />


// }


// function Test() {
//     const [value, setValue] = useState('123123');

//     return (
//         <div>
//             <Input value={value} onChang={setValue} />

//         </div>
//     )
// }


// export default Test;