export const validateFields = (fieldsToValidate, setInvalidFields) => {
  let invalidCount = 0;
  let fields = Object.entries(fieldsToValidate);
  let newInvalidFields = [];

  for (let field of fields) {
    if (field[0] === "images" && field[1]?.length === 0) {
      newInvalidFields.push({
        name: field[0],
        message: "Bạn phải thêm ít nhất một ảnh",
      });
      invalidCount++;
    }

    if (
      typeof field[1] === "string" &&
      field[1]?.trim() === "" &&
      field[0] !== "images"
    ) {
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
    if (field[0] === "areaNumber" && isNaN(+field[1])) {
      newInvalidFields.push({
        name: field[0],
        message: "Diện tích không hợp lệ",
      });
      invalidCount++;
    }
    if (field[0] === "areaNumber" && field[1] === 0) {
      newInvalidFields.push({
        name: field[0],
        message: "Chưa đặt giá trị cho trường này",
      });
      invalidCount++;
    }
    if (field[0] === "priceNumber" && isNaN(+field[1])) {
      newInvalidFields.push({
        name: field[0],
        message: "Giá tiền không hợp lệ",
      });
      invalidCount++;
    }
    if (field[0] === "priceNumber" && field[1] === 0) {
      newInvalidFields.push({
        name: field[0],
        message: "Chưa đặt giá trị cho trường này",
      });
      invalidCount++;
    }
  }

  setInvalidFields(newInvalidFields);
  return invalidCount;
};
