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

nextISSTimesForMyLocation((error, passTimes) => {
  fetchMyIP((error, ip) => {
    if (error) {
      return (error, null);
    }
    fetchCoordsByIP((ip, (error, coords) => {
      if (error) {
        return (error, null);
      }
      fetchISSFlyOverTimes((coords, (error, passTimes) => {
        if (error) {
          return (error, null);
        }
        callback(null, passTimes);
      }))
    }))
  });
});