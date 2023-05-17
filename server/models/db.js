var sql = require("sequelize");
var db_host, db_user, db_name, db_password;

console.log("lmao_");

// if(process.env.PORT!=undefined){
db_host = "sql12.freemysqlhosting.net";
db_user = "sql12619044";
db_name = "sql12619044";
db_password = "2uEHmQ67tl";
// } else {
//     db_host = 'localhost';
//     db_user = 'root';
//     db_name = 'server';
//     db_password = '12345';
// }

var db = new sql(db_name, db_user, db_password, {
  host: db_host,
  dialect: "mysql",
  logging: false,
  operatorsAliases: false,
  define: {
    freezeTableName: true,
    timestamps: true,
    collate: "utf8mb4_unicode_ci",
  },

  pool: {
    max: 10,
    min: 0,
    idle: 50000,
    acquire: 20000,
  },
});

// db.authenticate()
module.exports = { db, sql };
