import moment from "moment-timezone";

export const formatDate = (date: string | Date) => {
  const now = moment();
  const inputDate = moment(date);

  const diffInMinutes = now.diff(inputDate, "minutes");
  const diffInHours = now.diff(inputDate, "hours");

  if (diffInMinutes < 1) {
    return "just now";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} min ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  } else {
    return inputDate.tz(moment.tz.guess()).format("DD MMM YYYY HH:mm a");
  }
};

export const getCurrentYear = () => moment().format("YYYY").toString();
