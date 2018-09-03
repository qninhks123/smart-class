var { db,sql } = require("./db")

module.exports = db.define("subject", {
    subject: sql.STRING,
    name: sql.STRING,
    color: sql.STRING
});

