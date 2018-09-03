const { app, models, io, client } = require("../app");


app.get("/login",(req,res)=>{
    res.render('login',{ error:'',code:"" });
});

app.post("/login",async (req,res)=>{
    let {password,code} = req.body;
    let kt = await models.account.findOne({raw:true,where:{code:code}});
    let admin = {},_admin = (await models.config.all({raw:true})).map(v=>admin[v.label]=v.value);

    if(code==admin.code&&password==admin.password){
        admin.side = 'admin';
        req.session.account = admin;
        return res.redirect("/");
    } 
    if(kt!=null){
        if(kt.password==password){
            if(client.indexOf(code)==-1){
                kt.side = 'client';
                req.session.account = kt;
                io.emit("ONLINE",client);
                res.redirect('/');
            } else {
                res.render("login",{error:'Tài khoản đang trực tuyến',code})
            }
        }else{
            res.render("login",{error:'Sai mật khẩu',code})
        }
    } else {
        res.render("login",{error:'Tài khoản không tồn tại',code})
    }
});

app.delete("/login",async (req,res)=>{
 
    req.session.account=undefined;
    res.json({status:'success'});
});

app.get("/",(req,res)=>{
    if(req.session.account==undefined){
        return res.redirect("/login");
    };
    if(req.session.account.side=='admin'){
        res.render("server");
    } else {
        res.render("client");
    }
});

