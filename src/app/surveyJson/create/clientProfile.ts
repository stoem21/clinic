export const clientProfileCreateForm = () => {
  return {
    logoPosition: "right",
    pages: [
      {
        name: "page1",
        elements: [
          {
            name: "nameTitle",
            title: "คำนำหน้า",
            type: "dropdown",
            isRequired: true,
            choices: [
              { text: "นาย", value: "mr" },
              { text: "นาง", value: "mrs" },
              { text: "นางสาว", value: "ms" },
              { text: "เด็กหญิง", value: "miss" },
              { text: "เด็กชาย", value: "master" },
            ],
          },
          {
            name: "firstName",
            title: "ชื่อ",
            type: "text",
            isRequired: true,
          },
          {
            name: "lastName",
            title: "นามสกุล",
            type: "text",
            isRequired: true,
          },
          // add this part to db
          {
            name: "nationalId",
            title: "เลขประจำตัวประชาชน",
            type: "text",
          },
          {
            name: "phoneNumber",
            title: "เบอร์โทรศัพท์",
            type: "text",
            isRequired: true,
            maskType: "pattern",
            maskSettings: {
              pattern: "999-999-9999",
            },
          },
          {
            name: "gender",
            title: "เพศ",
            type: "dropdown",
            isRequired: true,
            choices: [
              { text: "ชาย", value: "MALE" },
              { text: "หญิง", value: "FEMALE" },
              { text: "ไม่ระบุ", value: "NOT_SPECIFIED" },
            ],
          },
          {
            name: "address",
            title: "ที่อยู่",
            type: "panel",
            elements: [
              {
                type: "text",
                name: "house",
                title: "บ้านเลขที่",
              },
              {
                type: "dropdown",
                name: "province",
                title: "จังหวัด",
                placeholder: "กรุณาเลือกจังหวัด",
                requiredIf: "{house} notempty",
                choicesByUrl: {
                  url: `${
                    import.meta.env.VITE_REACT_BASE_PATH
                  }/master-data/address?type=P`,
                  valueName: "id",
                  titleName: "name_th",
                  path: "data",
                },
              },
              {
                type: "dropdown",
                name: "district",
                title: "อำเภอ/เขต",
                placeholder: "กรุณาเลือกอำเภอ/เขต",
                enableIf: "{province} notempty",
                requiredIf: "{house} notempty or {province} notempty",
                resetValueIf: "{province} empty or {province} notempty",
                choicesByUrl: {
                  url: `${
                    import.meta.env.VITE_REACT_BASE_PATH
                  }/master-data/address?type=A&provinceId={province}`,
                  valueName: "id",
                  titleName: "name_th",
                  path: "data",
                },
              },
              {
                type: "dropdown",
                name: "subDistrict",
                title: "ตำบล/แขวง",
                enableIf: "{province} notempty and {district} notempty",
                requiredIf: "{house} notempty or {province} notempty",
                resetValueIf:
                  "{province} empty or {province} notempty or {district} empty or {district} notempty",
                placeholder: "กรุณาเลือกตำบล/แขวง",
                choicesByUrl: {
                  url: `${
                    import.meta.env.VITE_REACT_BASE_PATH
                  }/master-data/address?type=T&amphureId={district}`,
                  valueName: "value",
                  titleName: "name_th",
                  path: "data",
                },
              },
              {
                type: "text",
                name: "zipcode",
                title: "รหัสไปรษณีย์",
                requiredIf: "{house} notempty or {province} notempty",
                readOnly: true,
                resetValueIf:
                  "{province} empty or {province} notempty or {district} empty or {district} notempty or {subDistrict} empty or {subDistrict} notempty",
                setValueIf: "{subDistrict} notempty",
                setValueExpression: "{subDistrict.zip_code}",
              },
            ],
          },
          {
            name: "birthday",
            title: "วันเกิด",
            type: "date",
          },
          {
            name: "medicalCondition",
            title: "โรคประจำตัว",
            type: "text",
          },
          {
            name: "drugAllergy",
            title: "ยาที่แพ้",
            type: "text",
          },
          {
            name: "drugEat",
            title: "ยาที่กิน",
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
          },
        ],
      },
    ],
    showQuestionNumbers: "off",
    showNavigationButtons: false,
  };
};
