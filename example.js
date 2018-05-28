var sightengine = require('./sightengine')('api_user','api_secret');

// feedback

sightengine.feedback('nudity', 'safe', 'https://sightengine.com/assets/img/examples/example5.jpg').then((result) => {
  console.log(result)
}).catch((error) => {
  console.log(error);
});

// moderation image

sightengine.check(['nudity', 'type', 'properties','wad','faces']).set_url('https://sightengine.com/assets/img/examples/example5.jpg').then(function(result) {
  console.log(result)
}).catch(function(error) {
  console.log(error)
});

sightengine.check(['nudity', 'type', 'properties','wad','faces']).set_file('/assets/image.jpg').then(function(result) {
  console.log(result)
}).catch(function(error) {
  console.log(error)
});


sightengine.check(['nudity', 'type', 'properties','wad','faces']).set_bytes(imageBinary).then(function(result) {
  console.log(result)
}).catch(function(error) {
  console.log(error)
});


// moderation video

sightengine.check(['nudity', 'type', 'properties','wad','faces']).video('https://sightengine.com/assets/stream/examples/funfair.mp4', 'http://requestb.in/1d097l71').then(function(result) {
  console.log(result)
}).catch(function(error) {
  console.log(error)
});

sightengine.check(['nudity', 'type', 'properties','wad','faces']).video_sync('https://sightengine.com/assets/stream/examples/funfair.mp4').then(function(result) {
  console.log(result)
}).catch(function(error) {
  console.log(error)
});


