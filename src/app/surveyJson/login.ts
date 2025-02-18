export const loginForm = ({}) => {
  return {
    logoPosition: "right",
    pages: [
      {
        name: "page1",
        elements: [
          {
            name: "username",
            title: "Enter your username:",
            type: "text",
          },
          {
            name: "password",
            title: "Enter your password:",
            type: "text",
            inputType: "password",
          },
        ],
      },
    ],
    showQuestionNumbers: "off",
    showNavigationButtons: false,
  };
};
