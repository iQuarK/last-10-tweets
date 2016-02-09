var _require = require('../../.tmp/class/services/twitter.js');
var Twitter = _require.Twitter;

describe('Test Twitter class', function() {
  var twitter;

  beforeEach(function() {
    twitter = new Twitter();
  });

  it('should initialise the class', function() {
    // URL base
    expect(twitter.base).toBe('https://api.twitter.com');

    // URL to make authentication
    expect(twitter.oauth2).toBe('/oauth2/token');
    // API version
    expect(twitter.APIversion).toBe('1.1');
    // Access token
    expect(twitter.accessToken).toBe(null);
  });

  it('should convert to base64', function() {
    // URL base
    expect(twitter.utf8ToBase64('✓ à la mode')).toBe('4pyTIMOgIGxhIG1vZGU=');

  });

  it('should convert to base64', function() {
    var text = "New Hampshire votes: Follow the @CNNPolitics live blog for the latest news and analysis. https://t.co/VUfLqK3k1P. https://t.co/nKG9Z3ISWJ",
        textLinks = "New Hampshire votes: Follow the @CNNPolitics live blog for the latest news and analysis. <a href='https://t.co/VUfLqK3k1P'>https://t.co/VUfLqK3k1P</a>. <a href='https://t.co/nKG9Z3ISWJ'>https://t.co/nKG9Z3ISWJ</a>";
    // URL base
    expect(twitter.replaceUrlsByLinks(text)).toBe(textLinks);

  });

});