export const validateFields = (fieldsToValidate, setInvalidFields) => {
  let invalidCount = 0;
  let fields = Object.entries(fieldsToValidate);
  let newInvalidFields = [];

  for (let field of fields) {
    if (
      (field[0] === "images" || field[0] === "avatar") &&
      field[1]?.length === 0
    ) {
      newInvalidFields.push({
        name: field[0],
        message: "Bạn phải thêm ít nhất một ảnh",
      });
      invalidCount++;
    } else if (
      typeof field[1] === "string" &&
      field[1]?.trim() === "" &&
      field[0] !== "images"
    ) {
      newInvalidFields.push({
        name: field[0],
        message: `Bạn không được bỏ trống trường này`,
      });
      invalidCount++;
    } else if (field[0] === "password" && field[1].length < 6) {
      newInvalidFields.push({
        name: field[0],
        message: "Mật khẩu phải có tối thiểu 6 ký tự",
      });
      invalidCount++;
    } else if (field[0] === "phone" && isNaN(+field[1])) {
      newInvalidFields.push({
        name: field[0],
        message: "Số điện thoại không hợp lệ",
      });
      invalidCount++;
    } else if (field[0] === "areaNumber") {
      if (isNaN(+field[1])) {
        newInvalidFields.push({
          name: field[0],
          message: "Diện tích không hợp lệ",
        });
        invalidCount++;
      } else if (+field[1] === 0) {
        newInvalidFields.push({
          name: field[0],
          message: "Chưa đặt giá trị cho trường này",
        });
        invalidCount++;
      } else if (+field[1] < 5) {
        newInvalidFields.push({
          name: field[0],
          message: "Diện tích phải lớn hơn từ 5m² trở lên",
        });
        invalidCount++;
      }
    } else if (field[0] === "priceNumber") {
      if (isNaN(+field[1])) {
        newInvalidFields.push({
          name: field[0],
          message: "Giá tiền không hợp lệ",
        });
        invalidCount++;
      } else if (+field[1] === 0) {
        newInvalidFields.push({
          name: field[0],
          message: "Chưa đặt giá trị cho trường này",
        });
        invalidCount++;
      } else if (+field[1] < 100000) {
        newInvalidFields.push({
          name: field[0],
          message: `Giá tiền phải lớn hơn 100.000 đồng/tháng`,
        });
        invalidCount++;
      }
    }
  }

  setInvalidFields(newInvalidFields);
  return invalidCount;
};
