var sightengine = require('./sightengine')('1234','test');
var assert = require('assert');
var fs = require('fs');

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
    sightengine.check(['nudity', 'type', 'properties','wad','face', 'celebrities']).set_url('https://sightengine.com/assets/img/examples/example5.jpg').then(function(result) {
      assert.equal('success', result.status);
    })
  });

  it('should return success', function() {
    sightengine.check(['nudity']).set_url('https://sightengine.com/assets/img/examples/example5.jpg').then(function(result) {
      assert.equal('success', result.status);
    })
  });

  it('should return success', function() {
    sightengine.check(['nudity', 'type', 'properties','wad','face', 'celebrities']).set_file('/assets/image.jpg').then(function(result) {
      assert.equal('success', result.status);
    })
  });

  it('should return success', function() {
    sightengine.check(['nudity']).set_file('/assets/image.jpg').then(function(result) {
      assert.equal('success', result.status);
    })
  });

  it('should return success', function() {
    var binaryImage = fs.createReadStream('/assets/image.jpg');

    sightengine.check(['nudity']).set_bytes(binaryImage).then(function(result) {
      assert.equal('success', result.status);
    })
  });

  it('should return success', function() {
    var binaryImage = fs.createReadStream('/assets/image.jpg');

    sightengine.check(['nudity', 'type', 'properties','wad','face', 'celebrities']).set_bytes(binaryImage).then(function(result) {
      assert.equal('success', result.status);
    })
  });

  it('should return error', function() {
    sightengine.check(['nudity', 'type', 'properties','wad','face']).set_url('https://sightengine.com/assets/img/examples/example99999.jpg').then(function(result) {
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



