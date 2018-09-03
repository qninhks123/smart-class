class Env {
    constructor(){
        this.express              =   require("express");
        this.app                  =   this.express();
        this.path                 =   require("path");
        this.http                 =   require("http").createServer(this.app);
        this.io                   =   require("socket.io").listen(this.http);
        this.body_parser          =   require("body-parser");
        this.port                 =   process.env.PORT || 8000;
        this.sql                  =   require("sequelize");
        this.client               =   [];
        this.time                 =   [];
        this.session              =   require("express-session");
        this.sessionConfig        =   this.session({
            secret: 'qninhks123',
            resave: false,
            saveUninitialized: false,
        });
        this.models      =   {
            db       : require("./models/db").db,
            account  : require("./models/account"),
            history  : require("./models/history"),
            question : require("./models/question"),
            test     : require("./models/test"),
            total    : require("./models/total"),
            config   : require("./models/config"),
            subject  : require("./models/subject"),
        };
   
        this.models.db.sync();
        this.action = {
            createTest(test){},
            saveTest(test){},
            postTest(test){},
        }
    }
	
    config(){
        // SET
        this.app.set('view engine','ejs');
        this.app.set("views",this.path.join(__dirname,'./view'));
        // USE
        this.io.use((socket,next)=>{
            this.sessionConfig(socket.request,socket.request.res,next);
        });
        this.app.use(this.body_parser.urlencoded({ extended:false }));
        this.app.use(this.body_parser.json());
        this.app.use(this.sessionConfig);
        this.app.use(this.express.static(this.path.join(__dirname,"../client/dist")));
    }
}
module.exports = MyApp = new Env();
