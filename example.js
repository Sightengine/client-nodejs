var sightengine = require('./sightengine')('api_user','api_secret');


sightengine.feedback('nudity', 'safe', '/path/to/image').then((result) => {
  console.log(result)
}).catch((error) => {
  console.log(error);
});


sightengine.check(['nudity', 'type', 'properties','wad','face']).image('http://img09.deviantart.net/2bd0/i/2009/276/c/9/magic_forrest_wallpaper_by_goergen.jpg').then(function(result) {
  console.log(result)
}).catch(function(error) {
  console.log(error)
});

sightengine.check(['nudity', 'type', 'properties','wad','face']).video('http://www.quirksmode.org/html5/videos/big_buck_bunny.webm', 'http://requestb.in/1d097l71').then(function(result) {
  console.log(result)
}).catch(function(error) {
  console.log(error)
});


