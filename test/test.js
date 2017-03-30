var assert = require('assert');
var Glassdoor = require('../lib/').initGlassdoor({
    partnerId: process.env.ID,
    partnerKey: process.env.KEY
});

describe('Find One Company By Keyword and Params', function(){
  describe('#findOneCompany()', function(){
   	it('respond one company information with keyword: google', function() {
   		var testResultId = 9079;
   		var testResultWebsite = "www.google.com";
		return Glassdoor.findOneCompany('google', {}).then(function (data) {
	        assert.deepEqual(data.id, testResultId);
			assert.deepEqual(data.website, testResultWebsite);
	    })
	});
  })
});

describe('Find All Companies By Keyword and Params', function(){
  describe('#findAllCompanies()', function(){
   	it('respond all companies information with keyword: google', function() {
   		var testResultCompany0 = 9079;
   		var testResultCompany1 = 1411508;
		return Glassdoor.findOneCompany('google', {}).then(function (data) {
			var googleId;
			var googleVentureId;
			for(var i=0;i<data.length;i++){
				if(data[i].website == "www.google.com"){
					googleId = data[i].id;
					assert.deepEqual(googleId, testResultCompany0);
				}
				if(data[i].website == "www.gv.com"){
					googleVentureId = data[i].id;
					assert.deepEqual(googleVentureId, testResultCompany1);
				}
			}
	    })
	});
  })
});