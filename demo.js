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