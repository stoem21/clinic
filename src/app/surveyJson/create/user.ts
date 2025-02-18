export const userCreateForm = () => {
  return {
    logoPosition: "right",
    pages: [
      {
        name: "page1",
        elements: [
          {
            name: "username",
            title: "Username",
            type: "text",
            isRequired: true,
            validators: [
              {
                type: "text",
                minLength: 5,
                maxLength: 15,
              },
            ],
          },
          {
            name: "role",
            title: "Role",
            type: "dropdown",
            choices: [
              { text: "Admin", value: "ADMIN" },
              { text: "User", value: "USER" },
            ],
            isRequired: true,
          },
        ],
      },
    ],
    showQuestionNumbers: "off",
    showNavigationButtons: false,
  };
};
