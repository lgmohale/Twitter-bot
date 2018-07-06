// Dependencies =========================
var debug = false

var
    twit = require('twit'),
    config = require('./config');

var Twitter = new twit(config);

var T = twit(config);
var stream = T.stream('user');


//TWEEET BOT (DONE BY: Saide) ==========================

console.log('The bot is starting');
var Twit = require('twit');
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


// RETWEET BOT =====================================================================================


// This function finds the latest tweet with the #firstthursday #umuzi, and retweets it.
var retweet = function() {
    var params = {
        q: '#firstthursday #umuzi',  // Searches for this line
        geocoder:'30.5595° S, 22.9375° E', //searches within south africa
        count: 5,
        result_type: 'recent',
        lang: 'en',
    }
    Twitter.get('search/tweets', params, function(err, data) {
      // if there no errors
        if (!err) {
          // grab ID of tweet to retweet
            var retweetId = data.statuses[0].id_str;
            // Tell TWITTER to retweet
            Twitter.post('statuses/retweet/:id', {
                id: retweetId
            }, function(err, response) {
                if (response) {
                    console.log('Retweeted!!!');
                }
                // if there was an error while tweeting
                if (err) {
                    console.log('Something went wrong while RETWEETING... Duplication maybe...');
                }
            });
        }
        // if unable to Search a tweet
        else {
          console.log('Something went wrong while SEARCHING...');
        }
    });
}
// grab & retweet as soon as program is running...
retweet();
// retweet in every 50 minutes
setInterval(retweet, 3000000);



// FAVORITE BOT====================

// find a random tweet and 'favorite' it
var favoriteTweet = function(){
  var params = {
      q: '#firstthursday #umuzi',  // REQUIRED
      count: 5,
      geocoder:'30.5595° S, 22.9375° E', //searches within south africa
      result_type: 'recent',
      lang: 'en'
  }
  // find the tweet
  Twitter.get('search/tweets', params, function(err,data){

    // find tweets
    var tweet = data.statuses;
    var randomTweet = ranDom(tweet);   // pick a random tweet

    // if random tweet exists
    if(typeof randomTweet != 'undefined'){
      // Tell TWITTER to 'favorite'
      Twitter.post('favorites/create', {id: randomTweet.id_str}, function(err, response){
        // if there was an error while 'favorite'
        if(err){
          console.log('CANNOT BE FAVORITE... Error');
        }
        else{
          console.log('FAVORITED... Success!!!');
        }
      });
    }
  });
}
// grab & 'favorite' as soon as program is running...
favoriteTweet();
// 'favorite' a tweet in every 60 minutes
setInterval(favoriteTweet, 3600000);

// function to generate a random tweet tweet
function ranDom (arr) {
  var index = Math.floor(Math.random()*arr.length);
  return arr[index];
};


// REPLY TO MENTIONS =================================================================================

var debug = false

// Twitter library
var Twit = require('twit')

// We need to include our configuration file
var T = new Twit(require('./config.js'))

// This is the URL of a search for the latest tweets on the #hashtag.
var hastagSearch = { q: 'AKA', count: 10, result_type: 'recent' }

// A user stream
var stream = T.stream('user')
// When someone follows the user
stream.on('follow', followed)
stream.on('tweet', tweetEvent)

// In this callback we can see the name and screen name
function followed (event) {
  var name = event.source.name
  var screenName = event.source.screen_name
  var response = 'Thanks for following me, ' + name + ' @' + screenName
  // Post that tweet!
  T.post('statuses/update', { status: response }, tweeted)

  console.log('I was followed by: ' + name + ' @' + screenName)
}

// Here a tweet event is triggered!
function tweetEvent (tweet) {
  // If we wanted to write a file out
  // to look more closely at the data
  // var fs = require('fs')
  // var json = JSON.stringify(tweet,null,2)
  // fs.writeFile("tweet.json", json, output)

  // Who is this in reply to?
  var reply_to = tweet.in_reply_to_screen_name
  // Who sent the tweet?
  var name = tweet.user.screen_name
  // What is the text?
  var txt = tweet.text

  // Ok, if this was in reply to me
  // Replace selftwitterhandle with your own twitter handle
  console.log(reply_to, name, txt)
  if (reply_to === 'selftwitterhandle') {

    // Get rid of the @ mention
    txt = txt.replace(/@selftwitterhandle/g, '')

    // Start a reply back to the sender
    var reply = 'Hi @' + name + ' ' + ', Thanks for the mention :)'

    console.log(reply)
    // Post that tweet!
    T.post('statuses/update', { status: reply }, tweeted)
  }
}
