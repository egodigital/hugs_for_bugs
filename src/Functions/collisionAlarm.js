export default (serverDate, localDate) => {
  serverDate.forEach(element => {
    console.log("colliison alarms", element.time);
  });
  //console.log("received two complete dates", serverDate, localDate);
  return true;
};
