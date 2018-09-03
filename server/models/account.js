var { db,sql } = require("./db")

let account = module.exports = db.define("account", {
    name     : sql.STRING,
    code     : sql.STRING,
    password : sql.STRING,
    high     : {
        type : sql.INTEGER,
        defaultValue : 0
    },
    pre_ave  : {
        type : sql.INTEGER,
        defaultValue : 0
    },
    next_ave : {
        type : sql.INTEGER,
        defaultValue : 0
    },
    luc_hoc  : {
        type : sql.STRING,
        defaultValue : "kem"
    },
    src   : {
        type : sql.STRING,
        defaultValue : "/img/nature_1.jpg"
    },
});


