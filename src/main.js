'use strict';

var {Twitter} = require('./class/services/twitter.js');

var twitter = new Twitter();
var express = require('express');

var app = express();

// set the template engine
app.set('view engine', 'jade');
app.use(express.static(__dirname));


// auxiliar functions
function renderTweets(username, res) {
  let tweets = [];

  twitter.findByUser(username, 10)
    .then(function(data) {
      for (let tweet of data) {
        tweets.push(twitter.replaceUrlsByLinks(tweet.text));
      }
      res.render('list', {tweets: tweets, username: username});
    })
    .catch(function(data) {
      console.error(data);
      let errors = (data.errors)? data.errors[0].message: 'Error retrieving the tweets';
      res.render('list', {tweets: tweets, username: username, errors: errors});
    });
}

// ROUTES
app.get('/', function (req, res) {
  res.render('index', {});
});

// Retrieves the tweets of @cnnbrk
app.get('/cnnbrk-tweets', function (req, res) {
  var username = 'cnnbrk';

  renderTweets(username, res);

});

app.get('/:name', function(req, res) {
  if (req.params.name) {
    renderTweets(req.params.name, res);
  } else {
    res.send('Wrong username');
  }
});

// 1st STEP AUTHENTICATION TO TWITTER
console.log('Authenticating to Twitter');

// connect
twitter.connect()
  .then(function(){

    console.log('Authetication to Twitter successful');
    app.listen(3000, function () {
      console.log('Server started at port 3000');
    });

  },function(data) {
    console.error('Error authenticating', data);
  });