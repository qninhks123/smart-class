var { db,sql } = require("./db")

module.exports = db.define("question", {
    testcode : sql.STRING,
    index    : sql.INTEGER,
    content  : sql.TEXT,
    score    : sql.INTEGER,
    description : {
        type : sql.TEXT,
        defaultValue : '',
    },
    A : sql.TEXT,  B : sql.TEXT, 
    C : sql.TEXT,  D : sql.TEXT, 
    correct : sql.STRING,
});

