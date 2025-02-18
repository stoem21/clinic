export const dentistCreateForm = () => {
  return {
    logoPosition: "right",
    pages: [
      {
        name: "page1",
        elements: [
          {
            name: "name",
            title: "Name",
            type: "text",
            isRequired: true,
          },
          {
            name: "phoneNumber",
            title: "Phone number",
            type: "text",
          },
          {
            name: "email",
            title: "Email",
            type: "text",
          },
          {
            name: "lineId",
            title: "Line ID",
            type: "text",
          },
          {
            name: "note",
            title: "Note",
            type: "text",
          },
          {
            name: "dentistLicensId",
            title: "Licens ID",
            type: "text",
            isRequired: true,
          },
          {
            name: "isOrthoDentist",
            title: "หมอจัดฟัน",
            type: "boolean",
            defaultValue: "false",
          },
        ],
      },
    ],
    showQuestionNumbers: "off",
    showNavigationButtons: false,
  };
};
