var _require = require('../../.tmp/class/abstract/service.js');
var Service = _require.Service;

describe('Test Service class', function() {
  var service;

  it('should throw an error when instantiating', function() {
    expect(function() {
      service = new Service();
    }).toThrow();

  });

});