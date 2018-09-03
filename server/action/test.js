var env = require("../app");
var { models,client,io,app,action } = env;

action.createTest = async function({question,test},back){
    // GET DATA
    let account = await models.account.all();

    // MAP %ACCOUNT%
    let history_list = [];
    let total_list = [];

    account.map(async (acc)=>{
        // MAP %QUESTION%
        question.map(async (q,i)=>{
            history_list.push({
                code: acc.code,
                testcode: test.testcode,
                index: i+1,
                choice: 'E'
            });
        });

        // TOTAL
        total_list.push(({
            code: acc.code,
            testcode: test.testcode,
            total: 0
        }));
    });

    // CREATE
    await models.history.bulkCreate(history_list);
    await models.total.bulkCreate(total_list);
    await models.test.create(test);
    await models.question.bulkCreate(question.map((v,i)=>{
        return { ...v, testcode : test.testcode,index:i+1};
    }));

    back();
};

action.postTest = async function({test,question},back){
    io.emit("NEW_TEST",test);

    let counter = setInterval(async ()=>{
        io.emit('SETUP_TIME',test);
        test.time -= 1;
        if(test.time<=0){
            io.emit('FINISH_TEST',test);
            // KIEM TRA DAP AN
            setTimeout(async ()=>{
                let answer   = await models.question.findAll({raw:true,where:{testcode:test.testcode}});
                let history  = await models.history.findAll({raw:true,where:{testcode:test.testcode}});
                let account  = await models.account.all();
                // FOREACH ACCOUNT  
                account.map(async (s)=>{
                    // FOREACH ANSWER
                    let total=0;
                    history.filter(a=>a.code==s.code).map(a=>{
                        // CHECKING
                        let {score,correct} = answer.find(c=>c.index==a.index);
                        if ( correct==a.choice ){
                            total += score;
                        }
                    });
                    // SAVE
                    let _total = Math.round(total/test.score*100);
                    console.log(s.code,' : ',_total);

                    await models.total.update({ total:_total,},{
                        where: {
                            code: s.code,
                            testcode: test.testcode
                        }
                    }); 
                });
                
                await models.test.update({status:'done'},{
                    where: {
                        testcode : test.testcode
                    }
                })
                action.resetScore();
	            io.emit("END_TEST",{ testcode:test.testcode,name:test.name });	
            },2000);
            clearInterval(counter);
        }
    },1000);
    back();
};

function luc_hoc(ave){
    if( ave>=85 ) return 'Tốt';
    if( ave>=50 ) return 'Khá';
    if( ave>=25 ) return 'TB';
    return 'Kém';
}

action.resetScore = async function () {
    let test    = (await models.test.all()).filter(t=>t.status=='done');
    let total   = await models.total.all();
    let account = await models.account.all();

    // SET TEST
    test.map(async (t)=>{
        let total_list = total.filter(tt=>tt.testcode==t.testcode);
        let sum  = total_list.reduce((a,b)=>a+b.total,0);
        let high = total_list.filter(tt=>tt.total>=85).length;

        // SET NEXT_AVE
        await models.test.update({
            ave:Math.round(sum/account.length), 
            high: high
        },{
            where: { testcode: t.testcode }
        });
    });

    // SET ACCOUNT
    account.map(async (acc)=>{
        let total_list = total.filter(tt=>tt.code==acc.code);
        let sum  = total_list.reduce((a,b)=>a+b.total,0);
        let high = total_list.filter(tt=>tt.total>=85).length;
        let next_ave = Math.round(sum/(test.length));


        await models.account.update({
            pre_ave:Math.round((sum-total_list[total_list.length-1].total||0)/(test.length-1)), 
            next_ave:next_ave, 
            luc_hoc: luc_hoc(next_ave),
            high: high,
        },{
            where: { code: acc.code }
        });

    });


}
// action.resetScore();