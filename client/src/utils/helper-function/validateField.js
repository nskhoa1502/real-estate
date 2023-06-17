export const validateFields = (fieldsToValidate, setInvalidFields) => {
  let invalidCount = 0;
  let fields = Object.entries(fieldsToValidate);
  let newInvalidFields = [];

  for (let field of fields) {
    if (typeof field[1] === "string" && field[1]?.trim() === "") {
      newInvalidFields.push({
        name: field[0],
        message: `Bạn không được bỏ trống trường này`,
      });
      invalidCount++;
    }

    if (field[0] === "password" && field[1].length < 6) {
      newInvalidFields.push({
        name: field[0],
        message: "Mật khẩu phải có tối thiểu 6 ký tự",
      });
      invalidCount++;
    }

    if (field[0] === "phone" && isNaN(+field[1])) {
      newInvalidFields.push({
        name: field[0],
        message: "Số điện thoại không hợp lệ",
      });
      invalidCount++;
    }
  }

  setInvalidFields(newInvalidFields);
  return invalidCount;
};
