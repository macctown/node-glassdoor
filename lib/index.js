var request = require('request');
var queryString = require('query-string');
var async = require("async");

const baseUrl = 'http://api.glassdoor.com/api/api.htm?';

var Glassdoor = function(opts){
    this.partnerId = opts.partnerId;
    this.partnerKey = opts.partnerKey;
    this.userIp = opts.userIp || "0.0.0.0";
    this.format = opts.format || "json";
    this.useragent = opts.useragent || "";
    this.params = {};
    this.version = 1;
    this.iterateResults = [];
    return this;
}

Glassdoor.prototype.call = function(params, parser, callback) {
    params["action"] = "employers";
    params["t.p"] = this.partnerId;
    params["t.k"] = this.partnerKey;
    params["v"] = this.version;
    params["userIp"] = this.userIp;

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

Glassdoor.prototype.iterateCall = function(params, callback) {
    params["action"] = "employers";
    params["t.p"] = this.partnerId;
    params["t.k"] = this.partnerKey;
    params["v"] = this.version;
    params["userIp"] = this.userIp;
    var tmpGlassdoor = this;

    const promise = new Promise(
        function(resolve, reject){
            var queryParams = queryString.stringify(params);
            request.get(baseUrl + queryParams, function(error, response, body) {
                    if (error) return reject(error);
                    var totalPage = JSON.parse(body).response.totalNumberOfPages;
                    if (totalPage <= 1){
                        const data = JSON.parse(body).response.employers;
                        resolve(data);
                    }
                    else{
                        var pageArr = [];
                        for(var i=1;i<=totalPage;i++) pageArr.push(i);
                        async.groupBy(pageArr, function(pageNumber, callback) {
                            params["pn"] = pageNumber;
                            tmpGlassdoor.call(params, getCurPageEmployer, function(err, res){
                                "use strict";
                                if(err) return callback(err);
                                return callback(null,  JSON.stringify(res));
                            });
                        }, function(err, result) {
                            for(var companies in result){
                                var companyArr = JSON.parse(companies);
                                for(var i=0;i<companyArr.length;i++){
                                    tmpGlassdoor.iterateResults.push(companyArr[i]);
                                }
                            }
                            resolve(tmpGlassdoor.iterateResults);
                        });
                    }
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

Glassdoor.prototype.findOneCompany = function(keyword, userParams, callback){
    this.params["q"] = keyword;
    this.params["format"] = this.format;
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
    return result.employers.length >= 1 ? result.employers[0] : {};
}

function getCurPageEmployer(json){
    "use strict";
    return json.response.employers;
}

Glassdoor.prototype.findAllCompanies = function(keyword, userParams, callback){
    this.params["q"] = keyword;
    this.params["format"] = this.format;
    if(userParams.city !== undefined){
        this.params["city"] = userParams.city;
    }
    if(userParams.state !== undefined){
        this.params["state"] = userParams.state;
    }
    if(userParams.country !== undefined){
        this.params["country"] = userParams.country;
    }
    return this.iterateCall(this.params, callback);
};

module.exports.initGlassdoor = function(opts) {
    return new Glassdoor(opts);
};