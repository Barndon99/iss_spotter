const request = require("request");

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org/?format=json', (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    let bodyObj = JSON.parse(body);
    let ip = bodyObj.ip;

    callback(null, ip);
  });
};


const fetchCoordsByIP = function (ip = null, callback) {

  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const bodyObj = JSON.parse(body);
 
    const latitude = bodyObj["latitude"];

    const longitude = bodyObj["longitude"];

    callback(null, {"latitude": bodyObj["latitude"], "longitude": bodyObj["longitude"]});
  });
};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
 const fetchISSFlyOverTimes = function(coords, callback) {
  let lat = coords["latitude"];
  let long = coords["longitude"];

  request(`http://api.open-notify.org/iss/v1/?lat=${lat}&lon=${long}`, (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const bodyObj = JSON.parse(body);

    let times = bodyObj["response"];
    callback(null, times);
  })
};


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


module.exports = { fetchISSFlyOverTimes, fetchCoordsByIP, fetchMyIP, nextISSTimesForMyLocation };