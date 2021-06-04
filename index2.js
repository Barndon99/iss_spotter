const request = require('request-promise-native');

const { nextISSFlyOverTimes, printPassTimes } = require('./iss_promised2');

nextISSFlyOverTimes()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })