var { models,app } = require("../app");

// UPDATE ACCOUNT
app.put("/db/accounts/:code", async ({ body,params,session },res)=>{
	if(params.code=='admin'){
		await models.config.update({ value:body.src },{where: {label: 'src'}});
		await models.config.update({ value:body.password },{where: {label: 'password'}});
	} else {
		await models.account.update({ 
			src: body.src,
			password: body.password
	 	},{
			where: {
				code: params.code
			}
		});
	}

	session.account.password = body.password;
	session.account.src = body.src;
    res.json({ status : "success" });
});

// UPDATE HISTORY
app.put("/db/tests/:testcode/history/:code",async ({ body,params },res)=>{
	let choices = JSON.parse(body.choices);
	
	choices.map(async(c)=>{
		await models.history.update({ choice:c.choice },{
			where : {
				testcode : params.testcode,
				code : params.code,
				index: c.index
			}
		})
	});
	res.json({ status : "success" });
});

