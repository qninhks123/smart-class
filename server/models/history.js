var { db,sql } = require("./db");

module.exports = db.define("history",{
    testcode : sql.STRING,
    code     : sql.STRING,
    index    : sql.INTEGER,
    choice   : sql.STRING,
});
