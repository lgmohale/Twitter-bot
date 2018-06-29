console.log('The bot is starting');
var Twit = require('twit');
var config = require('./config');
var T = new Twit(config);

var fs = require("fs");
var text = fs.readFileSync("readMe.txt").toString('utf-8');
textByLine = text.split("\n")
twitIt(textByLine);
function twitIt(addressArr) {
  counter = 0,
  timer = setInterval(function(){
  codeAddress(addressArr[counter]);
  counter++
  if (counter === addressArr.length) {
      clearInterval(timer);
        }
  }, 5000);
  function codeAddress(address) {
    var tweet = {};
    tweet['status'] = address;
    T.post('statuses/update', tweet , tweeted);
      function tweeted(err, data, response) {
      if(err) {
          console.log("Something went wrong!");
      }
      else {
        console.log("It worked!");
      }
    }
  }
}
