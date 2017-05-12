var fetch = require('node-fetch');
const fs = require('fs');
const FormData = require('form-data');
const version = require('./package.json').version;

function makeClient(api_user, api_secret) {
  const client = {};
  const endpoint = 'https://api.sightengine.com/';
  const apiUser = api_user;
  const apiSecret = api_secret;
  var _models = [];

  client.check = (models) => {
    _models = models;
    return client;
  };

  client.image = (image) => {
    var url = endpoint + '1.0/check.json';

    if (image.indexOf("http://") == 0 || image.indexOf("https://") == 0) {
      const data = { 'models': _models.join(), 'url': image, 'api_user': apiUser, 'api_secret': apiSecret };
      const querystring = encodeQueryData(data);

      return fetch(url + '?' + querystring, { headers: { 'user-agent': 'SE-SDK-NODEJS' + version} }).then((res) => {
        return res.json();
      }).catch((error) => {
        return error.json();
      });
    } else {
      var form = new FormData();

      form.append('api_user', apiUser);
      form.append('api_secret', apiSecret);
      form.append('models', _models.join());
      form.append('media', fs.createReadStream(image));

      return fetch(url, { method: 'POST', body: form, headers: { 'user-agent': 'SE-SDK-NODEJS' + version}}).then(function(res) {
        return res.json();
      }).catch((error) => {
        return error.json();
      });
    }
  };

  client.video = (video, callback) => {
    var url =  endpoint + '1.0/video/moderation.json';
    const data = { 'stream_url': video, 'callback_url': callback, 'api_user': apiUser, 'api_secret': apiSecret };
    const querystring = encodeQueryData(data);

    return fetch(url + '?' + querystring, { headers: { 'user-agent': 'SE-SDK-NODEJS' + version} }).then((res) => {
      return res.json();
    }).catch((error) => {
      return error.json();
    });
  };

  client.feedback = (model, modelClass, image) => {
    var url = endpoint + '1.0/feedback.json'

    if(image.indexOf("http://") == 0 || image.indexOf("https://") == 0) {
      const data = { 'model': model, 'class': modelClass, 'url': image, 'api_user': apiUser, 'api_secret': apiSecret };
      const querystring = encodeQueryData(data);

      return fetch(url + '?' + querystring, { headers: { 'user-agent': 'SE-SDK-NODEJS' + version} }).then((res) => {
        return res.json();
      }).catch((error) => {
        return error.json();
      });
    } else {
      var form = new FormData();

      form.append('api_user', apiUser);
      form.append('api_secret', apiSecret);
      form.append('class', modelClass);
      form.append('model', model);
      form.append('media', fs.createReadStream(image));

      return fetch(url, { method: 'POST', body: form, headers: { 'user-agent': 'SE-SDK-NODEJS' + version}}).then(function(res) {
        return res.json();
      }).catch((error) => {
        return error.json();
      });
    };
  }

  return client;
}

function encodeQueryData(data) {
  var ret = [];
  for (var d in data)
    ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
  return ret.join('&');
}

module.exports = makeClient;

