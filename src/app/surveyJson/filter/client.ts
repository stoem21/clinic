export const clientFilterForm = () => {
  return {
    logoPosition: "right",
    pages: [
      {
        name: "page1",
        elements: [
          {
            type: "text",
            name: "hn",
            title: "HN",
          },
          {
            type: "text",
            name: "firstName",
            title: "ชื่อ",
          },
          {
            type: "text",
            name: "lastName",
            title: "นามสกุล",
          },
          {
            name: "nationalId",
            title: "เลขประจำตัวประชาชน",
            type: "text",
          },
          {
            name: "phoneNumber",
            title: "เบอร์โทรศัพท์",
            type: "text",
          },
          {
            name: "orthoDentistId",
            title: "หมอจัดฟัน",
            type: "dropdown",
            choicesByUrl: {
              url: `${
                import.meta.env.VITE_REACT_BASE_PATH
              }/dentist?isActive=true&isOrthoDentist=true&forDropdown=true`,
              valueName: "value",
              titleName: "label",
              path: "data",
            },
            placeholder: "กรุณาเลือกหมอจัดฟัน",
          },
        ],
      },
    ],
    showQuestionNumbers: "off",
    showNavigationButtons: false,
  };
};
