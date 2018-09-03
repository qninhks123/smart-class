var env = require("./server/app");

env.config();

// [-] IMPORT
    // [+] APP
    require('./server/app/get');
    require('./server/app/post');
    require("./server/app/router");
    require('./server/app/put');
    require("./server/app/io");

    // [+] ACTION
    require("./server/action/test");

// PING APP
var http = require("http");
var ping_count = 0;

setInterval(function() {
    http.get("http://qn123.herokuapp.com",res=>console.log("[",ping_count+=1,"] Ping app !"));
}, 300000); 

// RUN
env.http.listen(env.port,()=>console.log(`[${env.port}] Done !!`));
