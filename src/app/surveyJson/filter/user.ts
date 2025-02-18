export const userFilterForm = ({}) => {
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
          },
          {
            name: "role",
            title: "Role",
            type: "dropdown",
            choices: [
              { text: "Admin", value: "ADMIN" },
              { text: "User", value: "USER" },
            ],
          },
          {
            name: "isActive",
            title: "Active User",
            type: "boolean",
          },
        ],
      },
    ],
    showQuestionNumbers: "off",
    showNavigationButtons: false,
  };
};
