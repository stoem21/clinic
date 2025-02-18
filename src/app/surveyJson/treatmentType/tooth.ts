export const toothList = [
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "31",
  "32",
  "33",
  "34",
  "35",
  "36",
  "37",
  "38",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
];

export const pediatricsToothList = [
  "51",
  "52",
  "53",
  "54",
  "55",
  "61",
  "62",
  "63",
  "64",
  "65",
  "71",
  "72",
  "73",
  "74",
  "75",
  "81",
  "82",
  "83",
  "84",
  "85",
];
const ft = "'11','12','13','21','22','23'"; //6
const fb = "'31','32','33','41','42','43'"; //6
const bt = "'34','35','36','37','38','44','45','46','47','48'";
const bb = "'14','15','16','17','18','24','25','26','27','28'";

export const toothSide = [
  {
    value: "m",
    text: "M",
  },
  {
    value: "z",
    text: "Z",
    visibleIf: `{row.tooth} anyof [${ft},${fb}]`,
  },
  {
    value: "o",
    text: "O",
    visibleIf: `{row.tooth} anyof [${bt},${bb}]`,
  },
  {
    value: "d",
    text: "D",
  },
  {
    value: "b",
    text: "B",
    visibleIf: `{row.tooth} anyof [${bt},${bb}]`,
  },
  {
    value: "li",
    text: "Li",
    visibleIf: `{row.tooth} anyof [${fb},${bb}]`,
  },
  {
    value: "la",
    text: "La",
    visibleIf: `{row.tooth} anyof [${ft},${fb}]`,
  },
  {
    value: "pa",
    text: "Pa",
    visibleIf: `{row.tooth} anyof [${ft},${bt}]`,
  },
];

// export const testDynamic = () => {}; // not work! because cant change 2nd column to other question

// tooth and side
export const toothAndSideNorm = () => {
  return {
    logoPosition: "right",
    pages: [
      {
        name: "page1",
        elements: [
          {
            name: "toothAndSideNorm",
            title: "ซี่",
            type: "matrixdynamic",
            isRequired: true,
            titleLocation: "hidden",
            rowCount: 1,
            minRowCount: 1,
            columns: [
              {
                name: "tooth",
                title: "ซี่",
                cellType: "dropdown",
                width: "50%",
                choices: [...toothList],
                storeOthersAsComment: true,
              },
              {
                name: "side",
                title: "ด้าน",
                width: "50%",
                resetValueIf: "{row.tooth} empty or {row.tooth} notempty",
                cellType: "dropdown",
                choices: [...toothSide],
              },
            ],
          },
        ],
      },
    ],
    showQuestionNumbers: "off",
    showNavigationButtons: false,
  };
};

export const tooth = () => {
  return {
    logoPosition: "right",
    pages: [
      {
        name: "page1",
        elements: [
          {
            name: "tooth",
            title: "ซี่",
            type: "tagbox",
            isRequired: true,
            choices: [...toothList],
          },
        ],
      },
    ],
    showQuestionNumbers: "off",
    showNavigationButtons: false,
  };
};

export const toothWithExtra = () => {
  return {
    logoPosition: "right",
    pages: [
      {
        name: "page1",
        elements: [
          {
            name: "tooth",
            title: "ซี่",
            type: "tagbox",
            isRequired: true,
            choices: [
              ...toothList,
              { text: "ฟันเกิน", value: "supernumeraryTooth" },
            ],
          },
        ],
      },
    ],
    showQuestionNumbers: "off",
    showNavigationButtons: false,
  };
};

export const pediatrics = () => {
  return {
    logoPosition: "right",
    pages: [
      {
        name: "page1",
        elements: [
          {
            name: "treatmentType",
            title: "ประเภทการรักษา",
            type: "dropdown",
            isRequired: true,
            choices: [
              { text: "ถอนฟัน", value: "extraction" },
              { text: "อุดฟัน", value: "filling" },
              { text: "รักษาราก", value: "rootCanalTreatment" },
              { text: "ssc", value: "ssc" },
            ],
          },
          {
            name: "tooth",
            title: "ซี่",
            type: "tagbox",
            visibleIf: "{treatmentType} and {treatmentType} != 'filling'",
            requiredif: "{treatmentType} and {treatmentType} != 'filling'",
            choices: [...pediatricsToothList],
          },
          {
            name: "toothAndSideNorm",
            visibleIf: "{treatmentType} and {treatmentType} = 'filling'",
            title: "ซี่",
            type: "matrixdynamic",
            requiredif: "{treatmentType} and {treatmentType} = 'filling'",
            titleLocation: "hidden",
            rowCount: 1,
            minRowCount: 1,
            columns: [
              {
                name: "tooth",
                title: "ซี่",
                cellType: "dropdown",
                width: "50%",
                choices: [...toothList],
                storeOthersAsComment: true,
              },
              {
                name: "side",
                title: "ด้าน",
                width: "50%",
                resetValueIf: "{row.tooth} empty or {row.tooth} notempty",
                cellType: "dropdown",
                choices: [...toothSide],
              },
            ],
          },
          {
            // adjust follow notability
            visibleIf: "{treatmentType} and {treatmentType} = 'filling'",
            name: "toothAndSideNorm",
            title: "ซี่",
            type: "matrixdynamic",
            isRequired: true,
            titleLocation: "hidden",
            rowCount: 1,
            minRowCount: 1,
            columns: [
              {
                name: "tooth",
                title: "ซี่",
                cellType: "dropdown",
                width: "50%",
                choices: [
                  {
                    value: "11",
                    text: "11",
                  },
                  {
                    value: "12",
                    text: "12",
                  },
                  {
                    value: "13",
                    text: "13",
                  },
                ],
                storeOthersAsComment: true,
              },
              {
                name: "side",
                title: "ด้าน",
                // visibleIf: "{tooth} = '11'",
                width: "50%",
                resetValueIf: "{row.tooth} empty or {row.tooth} notempty",
                cellType: "dropdown",
                choices: [
                  {
                    value: "a1",
                    text: "A1",
                    visibleIf: "{row.tooth} = '12'",
                  },
                  {
                    value: "b1",
                    text: "B1",
                    visibleIf: "{row.tooth} = '13'",
                  },
                  {
                    value: "c1",
                    text: "C1",
                    visibleIf: "{row.tooth} = '11'",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    showQuestionNumbers: "off",
    showNavigationButtons: false,
  };
};

export const rootTreatment = () => {
  return {
    // adjust follow note
    logoPosition: "right",
    pages: [
      {
        name: "page1",
        elements: [
          {
            name: "tooth",
            title: "ซี่",
            type: "dropdown",
            isRequired: true,
            choices: [...toothList],
          },
          {
            name: "rootType",
            title: "รักษาราก",
            type: "tagbox",
            isRequired: true,
            choices: [
              { text: "OC", value: "oc" },
              { text: "LT", value: "lt" },
              { text: "MI", value: "mi" },
              { text: "FRC", value: "frc" },
              { text: "เปลี่ยน MED", value: "changeMed" },
              { text: "ฟอกฟันตาย", value: "deathTooth" },
            ],
          },
        ],
      },
    ],
    showQuestionNumbers: "off",
    showNavigationButtons: false,
  };
};

export const ortho = () => {
  return {
    logoPosition: "right",
    pages: [
      {
        name: "page1",
        elements: [
          {
            name: "activity",
            title: "ทำ",
            type: "tagbox",
            isRequired: true,
            choices: [
              { text: "ปรับเครื่องมือเดือนที่", value: "printMount" }, //toggle other field can + print + rtn
              { text: "พิมพ์ปาก", value: "printMount" }, //1
              { text: "ติดเครื่องมือบน", value: "top" }, //1
              { text: "ติดเครื่องมือล่าง", value: "bottom" }, //1
              { text: "ถอดเครื่องมือ", value: "offBracket" }, //1,2
              { text: "RTN บน", value: "retainerTop" }, //2
              { text: "RTN ล่าง", value: "retainerBottom" }, //2
            ],
          },
          {
            name: "month",
            title: "เดือนที่",
            type: "text",
            visibleIf: "{activity} contains 'printMount'",
            requiredIf: "{activity} contains 'printMount'",
            inputTextAlignment: "left",
            maskType: "numeric",
            maskSettings: {
              allowNegativeValues: false,
              precision: 0,
            },
          },
        ],
      },
    ],
    showQuestionNumbers: "off",
    showNavigationButtons: false,
  };
};

export const makeTooth = () => {
  return {
    logoPosition: "right",
    pages: [
      {
        name: "page1",
        elements: [
          {
            name: "tooth",
            title: "ซี่",
            type: "tagbox",
            isRequired: true,
            showSelectAllItem: true,
            choices: [...toothList],
          },
          {
            name: "makeToothType",
            title: "ประเภทฐาน",
            type: "dropdown",
            isRequired: true,
            otherText: "อื่นๆ",
            choices: [
              { text: "ฐานพลาสติก", value: "plastic" },
              { text: "ฐานยืดหยุ่น", value: "flex" },
              { text: "ฐานโลหะ", value: "metal" },
            ],
          },
          {
            name: "activity",
            title: "ทำ",
            type: "dropdown",
            isRequired: true,
            showOtherItem: true,
            otherText: "อื่นๆ",
            choices: [
              { text: "พิมพ์ปาก", value: "printMount" },
              { text: "ปรับ", value: "adjust" },
              { text: "ใส่", value: "insert" },
            ],
          },
        ],
      },
    ],
    showQuestionNumbers: "off",
    showNavigationButtons: false,
  };
};

export const rtn = () => {
  return {
    logoPosition: "right",
    pages: [
      {
        name: "page1",
        elements: [
          {
            name: "activity",
            title: "ทำ",
            type: "tagbox",
            isRequired: true,
            choices: [
              { text: "พิมพ์ปาก", value: "printMount" },
              { text: "ใส่", value: "insert" },
            ],
          },
        ],
      },
    ],
    showQuestionNumbers: "off",
    showNavigationButtons: false,
  };
};

export const scaling = () => {
  return {
    logoPosition: "right",
    pages: [
      {
        name: "page1",
        elements: [
          {
            name: "area",
            title: "ตำแหน่ง",
            type: "tagbox",
            isRequired: true,
            showSelectAllItem: true,
            selectAllText: "ทั้งปาก",
            choices: [
              { text: "บน", value: "top" },
              { text: "ล่าง", value: "bottom" },
            ],
          },
        ],
      },
    ],
    showQuestionNumbers: "off",
    showNavigationButtons: false,
  };
};

export const rootPlan = () => {
  return {
    logoPosition: "right",
    pages: [
      {
        name: "page1",
        elements: [
          {
            name: "area",
            title: "ตำแหน่ง",
            type: "tagbox",
            // showSelectAllItem: true,
            // selectAllText: "ทั้งปาก",
            visibleIf: "{tooth} empty",
            requiredIf: "{tooth} empty'",
            choices: [
              { text: "Q1", value: "q1" },
              { text: "Q2", value: "q2" },
              { text: "Q3", value: "q3" },
              { text: "Q4", value: "q4" },
            ],
          },
          {
            name: "tooth",
            title: "ซี่",
            type: "tagbox",
            visibleIf: "{area} empty",
            requiredIf: "{area} empty'",
            // showSelectAllItem: true,
            choices: [...toothList],
          },
        ],
      },
    ],
    showQuestionNumbers: "off",
    showNavigationButtons: false,
  };
};

export const removableDentures = () => {
  return {
    logoPosition: "right",
    pages: [
      {
        name: "page1",
        elements: [
          {
            name: "type",
            title: "ชนิด",
            type: "dropdown",
            isRequired: true,
            choices: [
              { text: "TP", value: "tp" },
              { text: "RPD", value: "rpd" },
              { text: "VP", value: "vp" },
              { text: "CD", value: "cd" },
            ],
          },
          {
            name: "tooth",
            title: "ซี่",
            type: "tagbox",
            isRequired: true,
            showSelectAllItem: true,
            choices: [...toothList],
          },
        ],
      },
    ],
    showQuestionNumbers: "off",
    showNavigationButtons: false,
  };
};

export const crown = () => {
  return {
    logoPosition: "right",
    pages: [
      {
        name: "page1",
        elements: [
          {
            name: "tooth",
            title: "ซี่",
            type: "tagbox",
            isRequired: true,
            showSelectAllItem: true,
            choices: [...toothList],
          },
          {
            name: "type",
            title: "ชนิด",
            type: "dropdown",
            isRequired: true,
            choices: [
              { text: "full metal crown", value: "fullMetalCrown" },
              { text: "pfm crown", value: "pfm" },
              { text: "all ceramic crown", value: "ceramic" },
              { text: "veneer", value: "veneer" },
            ],
          },
        ],
      },
    ],
    showQuestionNumbers: "off",
    showNavigationButtons: false,
  };
};

export const implant = () => {
  return {
    logoPosition: "right",
    pages: [
      {
        name: "page1",
        elements: [
          {
            name: "tooth",
            title: "ซี่",
            type: "tagbox",
            isRequired: true,
            showSelectAllItem: true,
            choices: [...toothList],
          },
          {
            name: "note",
            title: "หมายเหตุ",
            type: "text",
            isRequired: false,
          },
        ],
      },
    ],
    showQuestionNumbers: "off",
    showNavigationButtons: false,
  };
};

export const other = () => {
  return {
    logoPosition: "right",
    pages: [
      {
        name: "page1",
        elements: [
          {
            name: "otherText",
            title: "ข้อความ",
            type: "text",
            isRequired: true,
          },
        ],
      },
    ],
    showQuestionNumbers: "off",
    showNavigationButtons: false,
  };
};

export const filling = () => {
  //อุดฟัน
  return {
    logoPosition: "right",
    pages: [
      {
        name: "page1",
        elements: [
          {
            name: "otherText",
            title: "ข้อความ",
            type: "text",
            isRequired: true,
          }, // change this follow in ipad
        ],
      },
    ],
    showQuestionNumbers: "off",
    showNavigationButtons: false,
  };
};

export const xRay = () => {
  return {
    logoPosition: "right",
    pages: [
      {
        name: "page1",
        elements: [
          {
            name: "type",
            title: "ประเภท",
            type: "dropdown",
            isRequired: true,
            choices: [
              { text: "ฟิล์มเล็กซี่...", value: "small" },
              { text: "ฟิล์มใหญ่", value: "big" },
            ],
          },
          {
            name: "tooth",
            title: "ซี่",
            type: "tagbox",
            visibleIf: "{type} = 'small'",
            requiredIf: "{type} = 'small'",
            choices: [...toothList],
          },
          {
            name: "filmType",
            title: "ชื่อฟิล์ม",
            type: "tagbox",
            visibleIf: "{type} = 'big'",
            requiredIf: "{type} = 'big'",
            choices: [
              { text: "OPG", value: "opg" },
              { text: "Lateral Cep", value: "lateralCep" },
            ],
          },
        ],
      },
    ],
    showQuestionNumbers: "off",
    showNavigationButtons: false,
  };
};
