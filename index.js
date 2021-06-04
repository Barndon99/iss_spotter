//fetchMyIP((error, ip) => {
//  if (error) {
//    console.log("It didn't work!" , error);
//    return;
//  }
//
//  console.log('It worked! Returned IP:' , ip);
//})
//
//fetchCoordsByIP('137.186.199.254', (error, data) => {
//  if (error) {
//  console.log("error: ", error);
//  }
//  console.log("It worked!" + data.latitude + data.longitude);
//});
//
//const { fetchISSFlyOverTimes } = require('./iss');
//
//const exampleCoords = { latitude: '49.27670', longitude: '-123.13000' };
//
//fetchISSFlyOverTimes(exampleCoords, (error, passTimes) => {
//  if (error) {
//    console.log("It didn't work!" , error);
//    return;
//  }
//
//  console.log('It worked! Returned flyover times:' , passTimes);
//});

// iss.js 

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results. 
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */ 
 const { nextISSTimesForMyLocation, fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

 const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});