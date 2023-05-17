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

// RUN
env.http.listen(env.port,()=>console.log(`[${env.port}] Done !!`));
