import moment from "moment";
import { message } from "antd";
export default (serverDate, localDate) => {
  const servFrom = serverDate.map(obj =>
    moment(obj.from)
      .format("YYYY/MM/DD h:mm")
      .split(" ")
  );
  const servUntil = serverDate.map(obj =>
    moment(obj.until)
      .format("YYYY/MM/DD h:mm")
      .split(" ")
  );
  const localFrom = localDate.map(x => x[0]);
  const localUntil = localDate.map(x => x[1]);

  return servUntil.every(el => {
    return !localUntil.includes(el[0]);
  }) && servFrom.every(el => !localFrom.includes(el[0]))
    ? message.success("!")
    : message.warning("check the timing slots!");

  //return true;
};
