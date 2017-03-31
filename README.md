# node-glassdoor
[![npm version](https://badge.fury.io/js/node-glassdoor.svg)](https://badge.fury.io/js/node-glassdoor)  
Node.js module for interacting with Glassdoor's API v1.1
 ( powered by ![glassdoor](https://www.glassdoor.com/static/img/api/glassdoor_logo_80.png) )


### Install
```
npm install --save node-glassdoor
```

### Usage
```javascript
//init
var Glassdoor = require('node-glassdoor').initGlassdoor({
    partnerId: xxxxx,
    partnerKey: "xxxxxx"
});

//Return the first employer information from list of results
//
//Return a employer object or empty object
//
//Result Example: https://gist.github.com/macctown/3ba27cda74db26174571fb092eeedc3e
Glassdoor.findOneCompany('google', 
	{
		state:"CA", 
		country:"US"
	})
    .then(function (data) {
        console.log(data);
    })
    .catch(function (err) {
        console.error(err);
    });


//Return all employers information that match the keyword
//
//note I: the specific location information (state, city, country) 
//		only affect the job info inside of each employer info
//
//note II: the original API return 10 employers in each page if there are more than 10
//	but here we concat employers in every page and return an array contains all of results
//
//Return a employer object array or empty array
//
//Result Example: https://gist.github.com/macctown/8707312193de85d2d4373945cfc345c8
Glassdoor.findAllCompanies('google', 
	{
		state:"CA"
	})
    .then(function (data) {
        console.log(JSON.stringify(data));
    })
    .catch(function (err) {
        console.error(err);
    }) 
```

### Test

```bash
ID="xxxxx" KEY="xxxxxx" npm test
```

### Reference
- [Company Information](https://www.glassdoor.com/developer/companiesApiActions.htm)
- [Job Information](https://www.glassdoor.com/developer/jobsApiActions.htm) -- not cover yet

### TODO
- Make code fancy
- Add those fancy badges
- Add Job API

### License
[MIT](http://spdx.org/licenses/MIT)
