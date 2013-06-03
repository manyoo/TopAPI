var taobaoke = require('./lib/taobaoke'),
    tmall = require('./lib/tmall');

var TopAPI = (function() {
  var app_key = '',
      app_secret = '',
      taobaoke_id = '';

  function dateFormat (date, fstr, utc) {
    utc = utc ? 'getUTC' : 'get';
    return fstr.replace (/%[YmdHMS]/g, function (m) {
      switch (m) {
      case '%Y': return date[utc + 'FullYear'] (); // no leading zeros required
      case '%m': m = 1 + date[utc + 'Month'] (); break;
      case '%d': m = date[utc + 'Date'] (); break;
      case '%H': m = date[utc + 'Hours'] (); break;
      case '%M': m = date[utc + 'Minutes'] (); break;
      case '%S': m = date[utc + 'Seconds'] (); break;
      default: return m.slice (1); // unknown code, remove %
      }
      // add leading zero if required
      return ('0' + m).slice (-2);
    });
  }

  function build_caller(method) {
    return function(options, callback) {
      options.app_key = app_key;
      options.v = '2.0';
      options.format = 'json';
      options.sign_method = 'md5';
      options.timestamp = dateFormat(new Date(), '%Y-%m-%d %H:%M:%S', true);
      method(options, callback);
    };
  }

  return {
    init: function(key, secret, tkid) {
      app_key = key;
      app_secret = secret;
      taobaoke_id = tkid;
      taobaoke.init(app_secret, taobaoke_id);
      tmall.init(app_secret);
    },

    taobaoke_items_get: build_caller(taobaoke.Items.get),
    taobaoke_items_convert: build_caller(taobaoke.Items.convert),
    taobaoke_items_coupon_get: build_caller(taobaoke.Items.get_coupon),
    taobaoke_items_relate_get: build_caller(taobaoke.Items.get_relate),
    taobaoke_report_get: build_caller(taobaoke.Report.get),
    taobaoke_shops_get: build_caller(taobaoke.Shops.get),
    taobaoke_shops_convert: build_caller(taobaoke.Shops.convert),
    taobaoke_shops_relate_get: build_caller(taobaoke.Shops.get_relate),
    tmall_discount_search: build_caller(tmall.Discount.search),
    tmall_selected_search: build_caller(tmall.Selected.search),
    tmall_temai_items_search: build_caller(tmall.Temai.search_items),
    tmall_temai_subcats_search: build_caller(tmall.Temai.search_subcats)
  };
})();

module.exports = TopAPI;
