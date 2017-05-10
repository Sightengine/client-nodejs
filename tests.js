var sightengine = require('./sightengine')('1234','test');
var assert = require('assert');

describe('test feedback', function() {
  it('should return success', function() {
    return sightengine.feedback('nudity', 'safe', 'https://sightengine.com/assets/img/examples/example5.jpg').then((result) => {
      assert.equal('success', result.status);
    })
  });

  it('should return error', function() {
    return sightengine.feedback('nudity', 'safe', 'https://sightengine.com/assets/img/examples/example99999.jpg').then((result) => {
      assert.equal('failure', result.status);
      assert.equal('media_error', result.error.type);
    })
  });
});

describe('test image moderation', function() {
  it('should return success', function() {
    sightengine.check(['nudity', 'type', 'properties','wad','face', 'celebrities']).image('https://sightengine.com/assets/img/examples/example5.jpg').then(function(result) {
      assert.equal('success', result.status);
    })
  });

  it('should return success', function() {
    sightengine.check(['nudity']).image('https://sightengine.com/assets/img/examples/example5.jpg').then(function(result) {
      assert.equal('success', result.status);
    })
  });

  it('should return success', function() {
    sightengine.check(['nudity', 'type', 'properties','wad','face', 'celebrities']).image('/assets/image.jpg').then(function(result) {
      assert.equal('success', result.status);
    })
  });

  it('should return success', function() {
    sightengine.check(['nudity']).image('/assets/image.jpg').then(function(result) {
      assert.equal('success', result.status);
    })
  });

  it('should return error', function() {
    sightengine.check(['nudity', 'type', 'properties','wad','face']).image('https://sightengine.com/assets/img/examples/example99999.jpg').then(function(result) {
      assert.equal('failure', result.status);
      assert.equal('media_error', result.error.type);
    })
  });
});

describe('test video moderation', function() {
  it('should return success', function() {
    sightengine.check(['nudity', 'type', 'properties','wad','face']).video('http://www.quirksmode.org/html5/videos/big_buck_bunny.webm', 'http://requestb.in/1d097l71').then(function(result) {
      assert.equal('success', result.status);
    })
  });
});



