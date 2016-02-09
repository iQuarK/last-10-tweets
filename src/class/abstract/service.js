/**
 * Service: Interface services inherits from
 **/
const querystring = require('querystring');
// const https = require('https');
const request = require('request');

export class Service {
  constructor() {
    // Service should work as an Abstract class, so it can't be instantiated
    if (new.target === Service) {
      throw new TypeError('Cannot construct Service instances directly');
    }

    // Base URL to access the API
    this.base = '';
    this.APIversion = '1';
    this.oauth2 = '/oauth2/token';
    this.accessToken = null;
  }

  // method to make the OAuth2 connection
  connect() {}

  utf8ToBase64(string) {
    return new Buffer(string).toString('base64');
  }

  // callback for the response of requests below
  makeRequest(options, data={}) {
    return new Promise(function(resolve, reject) {
      request(options, function(error, response, body) {
        let info = body;

        // check if the data retrieved should be parsed
        try {
          info = JSON.parse(body);
        } catch(e) {
        }

        if (!error && response.statusCode === 200) {
          resolve(info);
        } else {
          reject(info);
        }
      }).form(data);
    });
  }

  // makes a post call
  post(endpoint, headers={}, data={}, authenticated = true) {
    // format data
    data = querystring.stringify(data);
    headers['Content-length'] = Buffer.byteLength(data);

    if (authenticated) {
      headers.Authorization = `Bearer ${this.accessToken}`;
    }

    // options to make the request
    let options = {
      method: 'POST',
      url: `${this.base}${endpoint}`,
      headers: headers
    };

    return this.makeRequest(options, data);
  }

  // makes a get call
  get(endpoint, headers={}, parameters={}, authenticated = true) {

    if (authenticated) {
      headers.Authorization = `Bearer ${this.accessToken}`;
    }

    // options to make the request
    let options = {
      method: 'GET',
      url: `${this.base}${endpoint}?${querystring.stringify(parameters)}`,
      headers: headers,
      json: true
    };

    return this.makeRequest(options);
  }
}