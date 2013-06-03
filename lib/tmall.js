var rest = require('./restapi');

var tmall = (function() {
  var app_secret = '';

  var Discount = {
    search: function(options, callback) {
      options.method = 'tmall.items.discount.search';

      rest.remote_call(options, app_secret, function(result) {
        if (result.error) {
          callback(result);
        } else {
          var resp = result.data.tmall_items_discount_search_response;
          callback({
            error: false,
            data: resp
          });
        }
      });
    }
  };

  var Selected = {
    search: function(options, callback) {
      options.method = 'tmall.items.selected.search';

      rest.remote_call(options, app_secret, function(result) {
        if (result.error) {
          callback(result);
        } else {
          var resp = resp.data.tmall_selected_items_search_response;
          callback({
            error: false,
            items: resp.item_list.selected_item
          });
        }
      });
    }
  };

  var Temai = {
    search_items: function(options, callback) {
      options.method = 'tmall.temai.items.search';

      rest.remote_call(options, app_secret, function(result) {
        if (result.error) {
          callback(result);
        } else {
          var resp = result.data.tmall_temai_items_search_response;
          callback({
            error: false,
            data: resp
          });
        }
      });
    },

    search_subcats: function (options, callback) {
      options.method = 'tmall.temai.subcats.search';

      rest.remote_call(options, app_secret, function(result) {
        if (result.error) {
          callback(result);
        } else {
          var resp = result.data.tmall_temai_subcat_search_response;
          callback({
            error: false,
            data: resp
          });
        }
      });
    }
  };

  return {
    Discount: Discount,
    Selected: Selected,
    Temai: Temai,
    init: function(secret) {
      app_secret = secret;
    }
  };
})();

module.exports = tmall;
