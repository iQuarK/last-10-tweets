/**
 * Twitter: Service that connects to the API of Twitter
 **/
var {Service} = require('../abstract/service.js');

export class Twitter extends Service {
  constructor() {
    super();
    this.base = 'https://api.twitter.com';
    this.APIversion = '1.1';
    this.consumerKey = 'ijv2VOQX7cweIsoMILG9J5FCG';
    this.consumerSecret = 'Z3yezuY4DEwfJ31CMsMELBQM80K5AuOKTBsmjN2tW5gWzJZXFl';
    this.endpoints = {
      userTimeline: `/${this.APIversion}/statuses/user_timeline.json`
    };
  }

  /**
   * Signs the app in the Twitter as 'application-only auth'
   **/
  connect() {
    let headers = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'Authorization': `Basic ${this.utf8ToBase64(this.consumerKey+':'+this.consumerSecret)}`
    };
    let data = {'grant_type':'client_credentials'};

    return this.post(this.oauth2, headers, data, false)
      .then((data) => {
        /*jshint sub:true*/
        this.accessToken = data['access_token'];
      }, (data) => {
        throw new Error('Error getting authenticating to Twitter', data);
      });
  }

  /**
   *  Retrieves the last tweets of a user
   *  @param username The username to search tweets from
   *  @param limit    The max number of tweets to retrieve (default 10)
   *  @return list    List of tweets retrieved from the API
   **/
  findByUser(username, limit = '') {
    return this.get(this.endpoints.userTimeline, {}, {'screen_name': username, count: limit});
  }

  replaceUrlsByLinks(text) {
    var re = /(\(.*?)?\b((?:https?|ftp|file):\/\/[-a-z0-9+&@#\/%?=~_()|!:,.;]*[-a-z0-9+&@#\/%=~_()|])/ig;
    return text.replace(re, function(match, lParens, url) {
        var rParens = '';
        lParens = lParens || '';

        // Try to strip the same number of right parens from url
        // as there are left parens.  Here, lParenCounter must be
        // a RegExp object.  You cannot use a literal
        //     while (/\(/g.exec(lParens)) { ... }
        // because an object is needed to store the lastIndex state.
        var lParenCounter = /\(/g;
        while (lParenCounter.exec(lParens)) {
            var m;
            // We want m[1] to be greedy, unless a period precedes the
            // right parenthesis.  These tests cannot be simplified as
            //     /(.*)(\.?\).*)/.exec(url)
            // because if (.*) is greedy then \.? never gets a chance.
            m = /(.*)(\.\).*)/.exec(url);
            if (m || /(.*)(\).*)/.exec(url)) {
                url = m[1];
                rParens = m[2] + rParens;
            }
        }
        return lParens + `<a href='${url}'>${url}</a>${rParens}`;
    });

  }
}