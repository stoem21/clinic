export const treatmentRecordCreateForm = () => {
  return {
    logoPosition: "right",
    pages: [
      {
        name: "page1",
        elements: [
          {
            name: "clientHN",
            title: "HN",
            type: "dropdown",
            choicesByUrl: {
              url: `${
                import.meta.env.VITE_REACT_BASE_PATH
              }/client-profile?isActive=true&forDropdown=true&pagination=false`,
              valueName: "value",
              titleName: "label",
              path: "data",
            },
            isRequired: true,
          },
          {
            name: "dentistId",
            title: "ทันตแพทย์",
            type: "dropdown",
            choicesByUrl: {
              url: `${
                import.meta.env.VITE_REACT_BASE_PATH
              }/dentist?isActive=true&forDropdown=true`,
              valueName: "value",
              titleName: "label",
              path: "data",
            },
            isRequired: true,
          },
          {
            type: "text",
            name: "treatmentDate",
            title: "วันที่ทำการรักษา",
            inputType: "date",
            isRequired: true,
          },
          {
            name: "note",
            title: "หมายเหตุ",
            type: "text",
          },
          // {
          //   type: "matrixdynamic",
          //   name: "treatmentItems",
          //   minRowCount: 1,
          //   titleLocation: "hidden",
          //   addRowText: "Add new item",
          //   columns: [
          //     {
          //       name: "treatmentType",
          //       title: "ประเภทการรักษา",
          //       maxWidth: "20px",
          //       minWidth: "20px",
          //       isRequired: true,
          //       cellType: "dropdown",
          //       choices: [
          //         { text: "ถอนฟัน", value: "1" },
          //         { text: "ผ่าฟันคุด", value: "2" },
          //         { text: "ขูดหินปูน", value: "3" },
          //         { text: "รักษาราก", value: "4" },
          //         { text: "ฟันปลอม", value: "5" },
          //         { text: "เดือยฟัน", value: "6" },
          //         { text: "ครอบฟัน", value: "7" },
          //         { text: "อุดฟัน", value: "8" },
          //         { text: "จัดฟัน", value: "9" },
          //         { text: "ถอดเครื่องมือ", value: "10" },
          //         { text: "RTN", value: "11" },
          //         { text: "X-ray", value: "12" },
          //         { text: "ฟอกสีฟัน", value: "13" },
          //         { text: "เคลือบฟลูออไรด์", value: "14" },
          //         { text: "รากเทียม", value: "15" },
          //         { text: "เการาก", value: "16" },
          //         { text: "อื่นๆ", value: "17" },
          //       ],
          //     },
          //     {
          //       name: "teeth",
          //       title: "ซี่",
          //       isRequired: true,
          //       cellType: "dropdown",
          //       choices: ["a", "b"],
          //       visibleIf: "{row.treatmentType} = '1'",
          //     },

          //     {
          //       name: "Column 2",
          //       visible: false,
          //       visibleIf: "{row.treatmentType} = '2'",
          //     },
          //     {
          //       name: "Column 3",
          //       visibleIf: "{row.treatmentType} = '3'",
          //     },
          //   ],
          // },
        ],
      },
    ],
    showQuestionNumbers: "off",
    showNavigationButtons: false,
  };
};

export const treatmentRecordTypeForm = () => {
  return {
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
              { text: "ถอนฟัน", value: "extraction" }, //
              { text: "ผ่าฟันคุด/ฟันฝัง", value: "surgicalRemoval" }, //

              { text: "ขูดหินปูน", value: "scaling" },
              { text: "เกลาราก", value: "rootPlaning" },

              { text: "อุดฟัน", value: "filling" },

              { text: "รักษาราก", value: "rootCanalTreatment" },

              { text: "ฟันปลอมถอนได้", value: "removableDentures" }, // ชนิด(dropdown (TP,RPD,VP,CD)) + ซี่
              { text: "เดือยฟัน", value: "post" }, // ซี่
              { text: "ครอบฟัน", value: "crown" }, // ซี่ + ชนิด(dropdown (full metal crown,pfm crown,all ceramic crown,veneer))
              { text: "รากเทียม", value: "implant" }, // tooth + add note field

              { text: "จัดฟัน", value: "ortho" },

              { text: "ฟอกสีฟัน", value: "bleaching" },
              { text: "เคลือบฟลูออไรด์", value: "fluoride" },

              { text: "X-ray", value: "xRay" },
              { text: "ทันตกรรมเด็ก", value: "pediatrics" },
              { text: "อื่นๆ", value: "others" },
            ],
          },
        ],
      },
    ],
    showQuestionNumbers: "off",
    showNavigationButtons: false,
    // textUpdateMode: "onTyping",
  };
};
