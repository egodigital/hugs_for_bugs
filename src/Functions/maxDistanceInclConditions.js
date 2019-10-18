const temperatureCoefficient = (awgIncar = 18, forecast) => {
  const tempCoeff = awgIncar >= forecast ? (awgIncar - forecast) * 0.025 : 0;
  return tempCoeff;
};
/**
 *
 * @param {Number} infotainment percentage of battery loss with usage of multimedia
 * @param {Number} passengers less passengers more maximum distance
 * @param {Number} forecast depending on it driver will run the heater
 * @param {Number} maxDistance constant for each car
 * @returns {Number} maximum supposed distance with certain conditions
 */
export const calcSuppMaxDistance = (
  infotainment = 0.02,
  passengers = 2,
  forecast = 12,
  maxDistance = 113
) => {
  const passToDistcoefficient = passengers * 0.025;
  const maxSupposedDistance =
    maxDistance -
    maxDistance * infotainment -
    passToDistcoefficient * maxDistance -
    temperatureCoefficient(undefined, forecast) * maxDistance;
  return maxSupposedDistance;
};
console.log("maxDistance", calcSuppMaxDistance());
