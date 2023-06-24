const element = require("./element");
// [
//     [ 0.0 , 0.1 , 0.2 , 0.3 ],
//     [ 1.0 , 1.1 , 1.2 , 1.3 ],
//     [ 2.0 , 2.1 , 2.2 , 2.3 ],
//     [ 3.0 , 3.1 , 3.2 , 3.3 ]
// ]

//
const { ELEMENT_1, ELEMENT_2, ELEMENT_3, ELEMENT_5 } = element;

const grand = {
  10000: {
    id: 10000,
    name: "剑舞城",
    data: [
      [
        [
          [ELEMENT_2[2000000]],
          [ELEMENT_2[2000001]],
          [
            ELEMENT_3[3000000],
            ELEMENT_3[3000001],
            ELEMENT_3[3000002],
            ELEMENT_3[3000003]
          ],
          [
            ELEMENT_3[3000004],
            ELEMENT_3[3000005],
            ELEMENT_3[3000006],
            ELEMENT_3[3000007]
          ],
          [
            ELEMENT_2[2000002],
            ELEMENT_2[2000003],
            ELEMENT_2[2000004],
            ELEMENT_2[2000005]
          ],
          [ELEMENT_1[1000000]]
        ],
        [
          [ELEMENT_5[5000000], ELEMENT_5[5000001], ELEMENT_5[5000002]],
          [ELEMENT_1[1000000]]
        ],
        null,
        [[ELEMENT_5[5000008]]]
      ],
      [
        [[ELEMENT_5[5000013],ELEMENT_5[5000012],ELEMENT_5[5000014]]],
        [[ELEMENT_5[5000004]]],
        [[ELEMENT_5[5000005]]],
        [[ELEMENT_5[5000006]]]
      ],
      [null, null, null, [[ELEMENT_5[5000009]]]],
      [null, null, null, null]
    ]
  },
  10001: {
    id: 10001,
    name: "妖魔寨",
    data: [
      [
        [
          [ELEMENT_2[2000000]],
          [ELEMENT_2[2000001]],
          [
            ELEMENT_3[3000000],
            ELEMENT_3[3000001],
            ELEMENT_3[3000002],
            ELEMENT_3[3000003]
          ],
          [
            ELEMENT_3[3000004],
            ELEMENT_3[3000005],
            ELEMENT_3[3000006],
            ELEMENT_3[3000007]
          ],
          [
            ELEMENT_2[2000002],
            ELEMENT_2[2000003],
            ELEMENT_2[2000004],
            ELEMENT_2[2000005]
          ],
          [ELEMENT_1[1000000]]
        ],
        [
          [ELEMENT_5[5000000], ELEMENT_5[5000001], ELEMENT_5[5000002]],
          [ELEMENT_1[1000000]]
        ],
        null,
        [[ELEMENT_5[5000008]]]
      ],
      [
        [[ELEMENT_5[5000003]]],
        [[ELEMENT_5[5000004]]],
        [[ELEMENT_5[5000005]]],
        [[ELEMENT_5[5000006]]]
      ],
      [null, null, null, [[ELEMENT_5[5000009]]]],
      [null, null, null, null]
    ]
  },
  10002: {
    id: 10002,
    name: "九仙山",
    data: [
      [
        [
          [ELEMENT_2[2000000]],
          [ELEMENT_2[2000001]],
          [
            ELEMENT_3[3000000],
            ELEMENT_3[3000001],
            ELEMENT_3[3000002],
            ELEMENT_3[3000003]
          ],
          [
            ELEMENT_3[3000004],
            ELEMENT_3[3000005],
            ELEMENT_3[3000006],
            ELEMENT_3[3000007]
          ],
          [
            ELEMENT_2[2000002],
            ELEMENT_2[2000003],
            ELEMENT_2[2000004],
            ELEMENT_2[2000005]
          ],
          [ELEMENT_1[1000000]]
        ],
        [
          [ELEMENT_5[5000000], ELEMENT_5[5000001], ELEMENT_5[5000002]],
          [ELEMENT_1[1000000]]
        ],
        null,
        [[ELEMENT_5[5000008]]]
      ],
      [
        [[ELEMENT_5[5000003]]],
        [[ELEMENT_5[5000004]]],
        [[ELEMENT_5[5000005]]],
        [[ELEMENT_5[5000006]]]
      ],
      [null, null, null, [[ELEMENT_5[5000009]]]],
      [null, null, null, null]
    ]
  }
};

module.exports = {
    grand,
  };