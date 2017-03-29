# node-glassdoor
Node.js module for interacting with Glassdoor's API v1.1


# Warning: This is not a completed version! Watch out, it may break things.
# powered by ![glassdoor](https://www.glassdoor.com/static/img/api/glassdoor_logo_80.png)


#Install
```
npm install --save node-glassdoor
```

#Usage
```javascript
//init
var Glassdoor = require('node-glassdoor').initGlassdoor({
    partnerId: xxxxx,
    partnerKey: "xxxxxx"
});

//Return the first employer information from list of results
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

#Reference
- [Job Information](https://www.glassdoor.com/developer/jobsApiActions.htm)
- [Company Information](https://www.glassdoor.com/developer/companiesApiActions.htm)

#License
[MIT](http://spdx.org/licenses/MIT)