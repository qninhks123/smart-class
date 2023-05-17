var { db,sql } = require("./db");

module.exports = db.define("config",{
    label : sql.STRING,
    value : sql.STRING
});


