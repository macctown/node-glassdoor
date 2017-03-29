var Glassdoor = require('node-glassdoor').initGlassdoor({
    partnerId: xxxxx,
    partnerKey: "xxxxxx"
});

//Return the first employer information from list of results
Glassdoor.searchCompanyByKeyword('google', 
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