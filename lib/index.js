var request = require('request');
var queryString = require('query-string');

const baseUrl = 'http://api.glassdoor.com/api/api.htm?';

var Glassdoor = function(opts){
    this.partnerId = opts.partnerId;
    this.partnerKey = opts.partnerKey;
    this.userIp = opts.userIp || "0.0.0.0";
    this.format = opts.format || "json";
    return this;
}

Glassdoor.prototype.call = function(params, callback) {
	const promise = new Promise(
		function(resolve, reject){
   		var queryParams = "?" + queryString.stringify(params);
		 	request.get(baseUrl + queryParams, function(error, response, body) {
		 		 if (error) return reject(error);
		          const data = JSON.parse(body);
		          resolve(data);
		 		}
	 		);
		}
	);


    if (typeof callback === 'function') {
        promise.then(
        	function(res){
        		callback(null, res)
        	})
        .catch(callback);
      return null;
    }
    return promise;
};

Glassdoor.prototype.searchJobs = function(params, callback){
	params.action = "employers";
	return this.call(params, callback);
};

module.exports.initGlassdoor = function(opts) {
  return new Glassdoor(opts);
};