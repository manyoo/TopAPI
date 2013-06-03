# TopAPI (Taobao Open Platform API client library for node.js)

This library is a very simple sdk for TOP APIs, and it only support Taobaoke and Tmall APIs right now. It can be extended simply as needed.

As a Node.js library, it's asynchronous.

##Install
install easily with npm:

	npm install topapi

##Usage
1, import the module:

	var TopAPI = require('topapi');

2, Initialize the library with your App Key and Secret, as well as your taobaoke_id:

	TopAPI.init(key, secret, taobaoke_id);
3, Now you can call the supported APIs very easily:

	TopAPI.taobaoke_items_get({keyword: 'iphone'}, function(result) {
		console.log(result);
	});
   All API methods require two parameters: an options object and a callback function. The option object should include the user-level parameters for the corresponding API call.