var rest = require('./restapi');

var taobaoke = (function() {
  var taobaoke_id = '',
      app_secret = '';

  var Items = {
    item_fields: [
                 "num_iid",
                 "nick",
                 "title",
                 "price",
                 "item_location",
                 "seller_credit_score",
                 "click_url",
                 "shop_click_url",
                 "pic_url",
                 "commission_rate",
                 "commission",
                 "commission_num",
                 "commission_volume",
                 "volume"
                 ],

    get: function(options, callback) {
      options.method = 'taobao.taobaoke.items.get';
      options.pid = taobaoke_id;
      options.fields = Items.item_fields.join();
      rest.remote_call(options, app_secret, function(result) {
        if (result.error) {
          callback(result);
        } else {
          var resp = result.data.taobaoke_items_get_response;
          callback({
            error: false,
            nums: resp.total_results,
            items: resp.taobaoke_items.taobaoke_item
          });
        }
      });
    },

    convert: function(options, callback) {
      options.method = 'taobao.taobaoke.items.convert';
      options.pid = taobaoke_id;
      options.fields = Items.item_fields.join();
      rest.remote_call(options, app_secret, function(result) {
        if (result.error) {
          callback(result);
        } else {
          var resp = result.data.taobaoke_items_convert_response;
          callback({
            error: false,
            nums: resp.total_results,
            items: resp.taobaoke_items.taobaoke_item
          });
        }
      });
    },

    get_coupon: function(options, callback) {
      options.method = 'taobao.taobaoke.items.coupon.get';
      options.pid = taobaoke_id;
      options.fields = Items.item_fields.concat(['coupon_rate',
                                                 'coupon_price',
                                                 'coupon_start_time',
                                                 'coupon_end_time',
                                                 'shop_type'
                                                 ]).join();
      rest.remote_call(options, app_secret, function(result) {
        if (result.error) {
          callback(result);
        } else {
          var resp = result.data.taobaoke_items_coupon_get_response;
          callback({
            error: false,
            nums: resp.total_results,
            items: resp.taobaoke_items.taobaoke_item
          });
        }
      });
    },

    get_relate: function(options, callback) {
      options.method = 'taobao.taobaoke.items.relate.get';
      options.pid = taobaoke_id;
      options.fields = Items.item_fields.join();

      rest.remote_call(options, app_secret, function(result) {
        if (result.error) {
          callback(result);
        } else {
          var resp = result.data.taobaoke_items_relate_get_response;
          callback({
            error: false,
            nums: resp.total_results,
            items: resp.taobaoke_items.taobaoke_item
          });
        }
      });
    }
  };

  var Report = {
    report_fields: [
      "trade_parent_id",
      "trade_id",
      "real_pay_fee",
      "commission_rate",
      "commission",
      "app_key",
      "outer_code",
      "create_time",
      "pay_time",
      "pay_price",
      "num_iid",
      "item_title",
      "item_num",
      "category_id",
      "category_name",
      "shop_title",
      "seller_nick"
    ],

    get: function(options, callback) {
      options.method = 'taobao.taobaoke.report.get';
      options.fields = Report.report_fields.join();

      rest.remote_call(options, app_secret, function(result) {
        if (result.error) {
          callback(result);
        } else {
          var resp = result.data.taobaoke_report_get_response;
          callback({
            error: false,
            nums: resp.total_results,
            reports: resp.taobaoke_report.taobaoke_report_members.taobaoke_report_member
          });
        }
      });
    }
  };

  var Shops = {
    shop_fields: [
      "seller_nick",
      "user_id",
      "shop_title",
      "click_url",
      "commission_rate",
      "seller_credit",
      "shop_type",
      "total_auction",
      "auction_count"
    ],

    get: function(options, callback) {
      options.method = 'taobao.taobaoke.shops.get';
      options.pid = taobaoke_id;
      options.fields = Shops.shop_fields.join();

      rest.remote_call(options, app_secret, function(result) {
        if (result.error) {
          callback(result);
        } else {
          var resp = result.data.taobaoke_shops_get_response;
          callback({
            error: false,
            nums: resp.total_results,
            shops: resp.taobaoke_shops.taobaoke_shop
          });
        }
      });
    },

    convert: function(options, callback) {
      options.method = 'taobao.taobaoke.shops.convert';
      options.pid = taobaoke_id;
      options.fields = Shops.shop_fields.join();

      rest.remote_call(options, app_secret, function(result) {
        if (result.error) {
          callback(result);
        } else {
          var resp = result.data.taobaoke_shops_convert_response;
          callback({
            error: false,
            shops: resp.taobaoke_shops.taobaoke_shop
          });
        }
      });
    },

    get_relate: function(options, callback) {
      options.method = 'taobao.taobaoke.shops.relate.get';
      options.pid = taobaoke_id;
      options.fields = Shops.shop_fields.join();

      rest.remote_call(options, app_secret, function(result) {
        if (result.error) {
          callback(result);
        } else {
          var resp = result.data.taobaoke_shops_relate_get_response;
          callback({
            error: false,
            nums: resp.total_results,
            shops: resp.taobaoke_shops.taobaoke_shop
          });
        }
      });
    }
  };

  return {
    Items: Items,
    Report: Report,
    Shops: Shops,
    init: function(secret, tbid) {
      app_secret = secret;
      taobaoke_id = tbid;
    }
  };
})();

module.exports = taobaoke;
