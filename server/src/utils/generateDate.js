import moment from "moment";

const formatDate = (datetime) => {
  let day =
    datetime.getDay() === 0 ? "Chủ nhật" : `Thứ ${datetime.getDay() + 1}`;
  let date = `${datetime.getDate()}/${
    datetime.getMonth() + 1
  }/${datetime.getFullYear()}`;
  let time = `${datetime.getHours()}:${datetime.getMinutes()}`;
  return `${day}, ${time} ${date}`;
};

const generateDate = () => {
  let gapExpire = Math.floor(Math.random() * 29) + 1;
  let today = new Date();
  let expiredDate = moment(today).add(gapExpire, "day").toDate();
  //   console.log(expiredDate);

  return {
    today: formatDate(today),
    expired: formatDate(expiredDate),
  };
};

export default generateDate;
