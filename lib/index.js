var request = require('request');
var queryString = require('query-string');

const baseUrl = 'http://api.glassdoor.com/api/api.htm?';

var Glassdoor = function(opts){
    this.partnerId = opts.partnerId;
    this.partnerKey = opts.partnerKey;
    this.userIp = opts.userIp || "0.0.0.0";
    this.format = opts.format || "json";
    this.useragent = opts.useragent || "";
    this.params = {};
    this.version = 1;
    return this;
}

Glassdoor.prototype.call = function(params, parser, callback) {
    const promise = new Promise(
        function(resolve, reject){
            var queryParams = queryString.stringify(params);
            request.get(baseUrl + queryParams, function(error, response, body) {
                    if (error) return reject(error);
                    const data = parser(JSON.parse(body));
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

Glassdoor.prototype.searchCompanyByKeyword = function(keyword, userParams, callback){
    this.params["q"] = keyword;
    this.params["action"] = "employers";
    this.params["t.p"] = this.partnerId;
    this.params["t.k"] = this.partnerKey;
    this.params["format"] = this.format;
    this.params["v"] = this.version;
    this.params["ps"] = 1;
    if(userParams.city !== undefined){
        this.params["city"] = userParams.city;
    }
    if(userParams.state !== undefined){
        this.params["state"] = userParams.state;
    }
    if(userParams.country !== undefined){
        this.params["country"] = userParams.country;
    }
    return this.call(this.params, getFirstEmployer, callback);
};

function getFirstEmployer(json){
    "use strict";
    var result = json.response;
    return result.employers.length >= 1 ? result.employers[0] : result.employers;
}

module.exports.initGlassdoor = function(opts) {
    return new Glassdoor(opts);
};