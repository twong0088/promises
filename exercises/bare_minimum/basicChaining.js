/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

// pluckFirstLineFromFileAsync (promiseConstructor.js)
// getGitHubProfileAsync (promisification.js)

var fs = require('fs');
var Promise = require('bluebird');
var promiseConstructor = require('./promiseConstructor.js');
var promisification = require('./promisification.js');
var promiseWrite = Promise.promisify(fs.writeFile);
//var promiseWrite = (url, item) => {
//  return new Promise((resolve, reject) => {
//    fs.writeFile(url, item, (err) => {
//      if (err) {
//        reject(err);
//      } else {
//        resolve(item); //???
//      }
//    });
//  });
//};



var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // TODO
  return promiseConstructor.pluckFirstLineFromFileAsync(readFilePath)
    .then(function(user) {
      return promisification.getGitHubProfileAsync(user);
    })
    .then(function(body) {
      console.log(body);
      return promiseWrite(writeFilePath, JSON.stringify(body));
    });
};


// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
