# node-glassdoor
Node.js module for interacting with Glassdoor's API v1.1
 ( powered by ![glassdoor](https://www.glassdoor.com/static/img/api/glassdoor_logo_80.png) )

# Warning
The code works, but no test case for now, will add it soon. So be careful when you use it.

# Install
```
npm install --save node-glassdoor
```

# Usage
```javascript
//init
var Glassdoor = require('node-glassdoor').initGlassdoor({
    partnerId: xxxxx,
    partnerKey: "xxxxxx"
});

//Return the first employer information from list of results
//Return a employer object or empty object
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


//Return the all employers information that match the keyword
//note: the specific location information (state, city, country) 
//		only affect the job info inside of each employer info
//Return a employers object array
Glassdoor.findAllCompanies('google', 
	{
		state:"CA"
	})
    .then(function (data) {
        response.end(JSON.stringify(data));
    })
    .catch(function (err) {
        console.error(err);
    }) 
```

# Reference
- [Company Information](https://www.glassdoor.com/developer/companiesApiActions.htm)
- [Job Information](https://www.glassdoor.com/developer/jobsApiActions.htm) -- not cover yet

# TODO
- Add Test Case for current features
- Make code fancy
- Add those fancy badges
- Add Job API

# License
[MIT](http://spdx.org/licenses/MIT)
