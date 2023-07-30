const element = require("../element");
// [
//     [ 0.0 , 0.1 , 0.2 , 0.3 ],
//     [ 1.0 , 1.1 , 1.2 , 1.3 ],
//     [ 2.0 , 2.1 , 2.2 , 2.3 ],
//     [ 3.0 , 3.1 , 3.2 , 3.3 ]
// ]
//
const { ELEMENT_1, ELEMENT_2, ELEMENT_3, ELEMENT_5 } = element;

// 仙族地图 id3开头
const immortalGrand = {
    30000: {
        id: 30000,
        name: "隐仙村",
        data: [
            [
                [],
                [[ELEMENT_5[5000000], ELEMENT_5[5000001]]],
                [],
                []
            ]
        ]
    }
};

module.exports = {
    immortalGrand,
};