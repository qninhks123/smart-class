var { db,sql } = require("./db");

module.exports = db.define("test",{
    testcode  :  sql.STRING,
    name      :  sql.STRING,
    score     :  sql.INTEGER,
    time      :  sql.INTEGER,
    high      :  {
        type : sql.INTEGER,
        defaultValue : 0
    },
    subject   :  sql.STRING,
    question  :  sql.INTEGER,
    ave       :  {
        type : sql.INTEGER,
        defaultValue : 0
    },
    status    :  sql.STRING
});
