var env= require("../app");
var { models, io } = env;


io.of('/').on('connection',client=>{

    client.account = client.request.session.account
    if(client.account!=undefined){
        if(client.account.code!='admin'&&env.client.indexOf(client.account.code)==-1){
            env.client.push(client.account.code);
            console.log(client.request.session.account.code,'connect');
            io.emit("ONLINE",env.client.length);
        }
    }
    
    
    
    client.on("disconnect",()=>{
        if(client.account!=undefined){
            if(client.request.session.account.side!='admin'){
                console.log(client.request.session.account.code,'disconnect');
                env.client.splice(env.client.findIndex(c=>c==client.request.session.account.code),1);
                io.emit("ONLINE",env.client.length);
            } 
        }   
    });
});