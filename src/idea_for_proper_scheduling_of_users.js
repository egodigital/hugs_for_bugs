/**
 * This is a simulation of our feature that frontend calculates the avaliability of
 * one car in case of four users and they need this car in one day.
 *
 * Requirement for each user: booking ending only after user put the car to charging
 *
 * THE MAIN IDEA: from the beginning our battery is full, then
 *  user 1 saying that he need car for 1 hour and will drive 35 km, and our idea is
 *  that after user1 finishes(puts it to charge),
 * car will be charged for approx. 20% in one hour,
 * depending on that, when user 2 will plan his trip,
 * system will point him to a proper usage time selection
 */
const batChargePerHour = 0.2; // it is a constant <= imaginary, we don't know the real
/**
 * we have users array, and each user has appropriate properties
 */
const users = [
  { id: 1, batStart: 1, t1: "12:00", t2: "13:00", km: 35 },
  { id: 2, t1: "15:00", t2: "18:00", km: 63 },
  { id: 3, t1: "20:00", t2: "24:00", km: 90 },
  { id: 4, t1: "18:00", t2: "21:00", km: 3 }
];
/** then we pick the endTime of previous user, and start time of next user,
 *  calculate the difference and showing in console for next user that he has to plan the trip
 * in some another time, of course if he wants to use ONLY THAT car */
/** during the loop, we are adding some new properties to users,
 * which will help us with the prediction */
for (let index = 0; index < users.length - 1; index++) {
  const obj = users[index + 1];
  const prevObj = users[index];
  const difference = parseInt(obj.t1) - parseInt(prevObj.t2);
  prevObj["canChargeBattery"] = difference * batChargePerHour;
  obj["batStart"] =
    prevObj.batStart - prevObj.km * 0.01 + prevObj.canChargeBattery >= 1
      ? 1
      : prevObj.batStart - prevObj.km * 0.01 + prevObj.canChargeBattery;

  obj.batStart * 100 < obj.km
    ? console.log(
        "change timing for user " +
          prevObj.id +
          "that user" +
          obj.id +
          " can use the car and will drive his " +
          obj.km +
          "km"
      )
    : console.log("alles super fur" + prevObj.id);
}
