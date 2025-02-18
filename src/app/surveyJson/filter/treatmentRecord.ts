export const treatmentRecordFilterForm = () => {
  return {
    logoPosition: "right",
    pages: [
      {
        name: "page1",
        elements: [
          {
            type: "text",
            name: "startDate",
            title: "เริ่มต้น",
            inputType: "date",
          },
          {
            type: "text",
            name: "endDate",
            title: "สิ้นสุด",
            inputType: "date",
          },
          {
            name: "hn",
            title: "HN",
            type: "dropdown",
            placeholder: "กรุณาเลือกเลข HN",
            choicesByUrl: {
              url: `${
                import.meta.env.VITE_REACT_BASE_PATH
              }/client-profile?isActive=true&forDropdown=true&pagination=false`,
              valueName: "value",
              titleName: "label",
              path: "data",
            },
          },
          {
            name: "dentistId",
            title: "ทันตแพทย์",
            type: "dropdown",
            placeholder: "กรุณาเลือกทันตแพทย์",
            choicesByUrl: {
              url: `${
                import.meta.env.VITE_REACT_BASE_PATH
              }/dentist?isActive=true&forDropdown=true`,
              valueName: "value",
              titleName: "label",
              path: "data",
            },
          },
        ],
      },
    ],
    showQuestionNumbers: "off",
    showNavigationButtons: false,
  };
};
