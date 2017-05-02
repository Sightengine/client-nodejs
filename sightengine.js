var fetch = require('node-fetch');
const fs = require('fs');
const FormData = require('form-data');

function makeClient(api_user, api_secret) {
  const client = {};
  const endpoint = 'https://api.sightengine.com/';
  const apiUser = api_user;
  const apiSecret = api_secret;
  var _models = [];

  client.check = (models = []) => {
    _models = models;
    return client;
  };

  client.image = (image) => {
    let url = endpoint + '1.0/check.json';

    if (image.indexOf("http://") == 0 || image.indexOf("https://") == 0) {
      const data = { 'models': _models.join(), 'url': image, 'api_user': apiUser, 'api_secret': apiSecret };
      const querystring = encodeQueryData(data);

      return fetch(url + '?' + querystring).then((res) => {
        return res.text();
      }).catch((error) => {
        return error;
      });
    } else {
      var form = new FormData();

      form.append('api_user', apiUser);
      form.append('api_secret', apiSecret);
      form.append('models', _models.join());
      form.append('media', fs.createReadStream(image));

      return fetch(url, { method: 'POST', body: form}).then(function(res) {
        return res.text();
      }).catch((error) => {
        return error;
      });
    }
  };

  client.video = (video, callback) => {
    url =  endpoint + '1.0/video/moderation.json';
    const data = { 'stream_url': video, 'callback_url': callback, 'api_user': apiUser, 'api_secret': apiSecret };
    const querystring = encodeQueryData(data);

    return fetch(url + '?' + querystring).then((res) => {
      return res.text();
    }).catch((error) => {
      return error;
    });
  };

  client.feedback = (model, modelClass, image) => {
    let url = endpoint + '1.0/feedback.json'

    if(image.indexOf("http://") == 0 || image.indexOf("https://") == 0) {
      const data = { 'model': model, 'class': modelClass, 'url': image, 'api_user': apiUser, 'api_secret': apiSecret };
      const querystring = encodeQueryData(data);

      return fetch(url + '?' + querystring).then((res) => {
        return res.text();
      }).catch((error) => {
        return error;
      });
    } else {
      var form = new FormData();

      form.append('api_user', apiUser);
      form.append('api_secret', apiSecret);
      form.append('class', modelClass);
      form.append('model', model);
      form.append('media', fs.createReadStream(image));

      return fetch(url, { method: 'POST', body: form}).then(function(res) {
        return res.text();
      }).catch((error) => {
        return error;
      });
    };
  }

  return client;
}

function encodeQueryData(data) {
  let ret = [];
  for (let d in data)
    ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
  return ret.join('&');
}

module.exports = makeClient;

