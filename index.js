const { fetchMyIP, fetchCoordsByIP } = require('./iss');

//fetchMyIP((error, ip) => {
//  if (error) {
//    console.log("It didn't work!" , error);
//    return;
//  }
//
//  console.log('It worked! Returned IP:' , ip);
//});

fetchCoordsByIP('137.186.199.254', (error, data) => {
  if (error) {
  console.log("error: ", error);
  }
  console.log("It worked!" + data.latitude + data.longitude);
});

