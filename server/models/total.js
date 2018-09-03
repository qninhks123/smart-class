var { db,sql } = require("./db");

module.exports = db.define("total",{
    testcode : sql.STRING,
    code     : sql.STRING,
    total    : {
        type : sql.INTEGER,
        defaultValue : 0,
    }
});
