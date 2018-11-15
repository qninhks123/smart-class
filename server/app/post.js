var { models,app,io,time,action } = require("../app");

// POST ACCOUNT
app.post('/db/accounts',async (req,res)=>{
    let { name,code,password } = req.body;
    let test = await models.account.findOne({where:{code:code}});
    
    if(test==null){
		models.account.create({name,code,password});
		
		let all_test = await models.test.all();

		all_test.map(async (t)=>{
			let list = [];
			for(let i=0;i<t.question;i++){
				list.push({
					code: code,
					testcode: t.testcode,
					index: i+1,
					choice: 'E'
				});
			}
			await models.history.bulkCreate(list);
			await models.total.create({
				code: code,
				testcode: t.testcode,
				total: 0
			});
		});
		action.resetScore();
		res.json({status:"success"});
    }else{
		
		res.json({status:"error"});
	
    }
});

// POST TEST
app.post('/db/tests',async (req,res)=>{
	let { test,question } = JSON.parse(req.body.test);
	let exist = await models.test.findOne({ where:{ testcode:test.testcode }});
	
	if(exist != null){
		if (test.status=="save"){
			action.updateTest({ test,question },()=>{
				action.postTest({test,question},()=>{
					res.json({ status:"success" });
				});
			});
		} else {
			return res.json({ status:"error" });
		}
	}else{
		test.status = "active";
		action.createTest({ test,question },()=>{
			action.postTest({test,question},()=>{
				res.json({ status:"success" });
			});
		});
	};
});

// CREATE SUBJECT
app.post('/db/subject',async (req,res)=>{
	let kt = (await models.subject.findOne({where:{ subject:req.body.subject }})) == null;
	if (kt){
		await models.subject.create(req.body);
		res.json({ status:'success' });
	} else {
		res.json({ status:'error' });
	}
});