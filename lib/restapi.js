var request = require('request'),
    crypto = require('crypto'),
    querystring = require('querystring');

function sign(options, secret) {
  var keys = [],
      keyvalues = [],
      kvStr = '',
      paramStr = '';

  for (var k in options) {
    if (options.hasOwnProperty(k))
      keys.push(k);
  }
  keys.sort();

  for (var i = 0; i < keys.length; i++) {
    var sk = keys[i];
    keyvalues.push(sk + options[sk]);
  }
  kvStr = keyvalues.join('');
  paramStr = secret + kvStr + secret;
  return crypto.createHash('md5').update(paramStr).digest('hex').toUpperCase();
}

function build_url(options) {
  return 'http://gw.api.taobao.com/router/rest?' + querystring.stringify(options);
}

exports.remote_call = function(options, secret, callback) {
  var url = '';

  options.sign = sign(options, secret);
  url = build_url(options);
  request({url: url, json: true}, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      if (body.hasOwnProperty('error_response')) {
        callback({error: true,
                  message: body.error_response.msg
                });
      } else {
        callback({error: false,
                  data: body
                });
      }
    } else {
      callback({error: true,
                message: "HTTP Error: " + error
              });
    }
  });
};
