var env = require("../app");
var { models, app } = env;

// ALL ACCOUNT
app.get("/db/accounts", async (req, res) => {
  res.json(await models.account.all());
});

// ACCOUNT BY CODE
app.get("/db/accounts/:code", async (req, res) => {
  res.json(await models.account.findOne({ where: { code: req.params.code } }));
});

// CONFIG
app.get("/db/config", async (req, res) => {
  let db_config = await models.config.all();
  let config = {};
  db_config.map((i) => (config[i.key] = i.value));
  res.json(config);
});

// GET ALL TEST
app.get("/db/tests", async (req, res) => {
  res.json(await models.test.all());
});

// GET TEST
app.get("/db/tests/:testcode", async ({ params }, res) => {
  res.json(
    await models.test.findOne({
      raw: true,
      where: { testcode: params.testcode },
    })
  );
});

// GET TEST HISTORY
app.get("/db/tests/:testcode/history", async (req, res) => {
  res.json(
    await models.history.findAll({
      raw: true,
      where: { testcode: req.params.testcode },
    })
  );
});

// GET TEST HISTORY BY CODE
app.get("/db/tests/:testcode/history/:code", async ({ params }, res) => {
  res.json(
    await models.history.findAll({
      raw: true,
      where: { code: params.code, testcode: params.testcode },
    })
  );
});

// GET TEST QUESTION
app.get("/db/tests/:testcode/question", async ({ params }, res) => {
  res.json(
    await models.question.findAll({
      raw: true,
      where: { testcode: params.testcode },
    })
  );
});

// DB
app.get("/db", async (req, res) => {
  let size = (await env.models.db.query(`
        SELECT table_schema "db", 
        ROUND(SUM(data_length + index_length) / 1024 / 1024, 1) "size" 
        FROM information_schema.tables GROUP BY table_schema
    `))[1].reduce((s, db) => s + Number(db.size), 0);

  res.json({
    size: size,
    max_size: 5,
    password: "08aba74b",
  });
});

// GET TEST TOTAL
app.get("/db/tests/:testcode/total", async ({ params }, res) => {
  res.json(
    await models.total.findAll({
      raw: true,
      where: { testcode: params.testcode },
    })
  );
});

// GET TEST TOTAL BY CODE
app.get("/db/tests/:testcode/total/:code", async ({ params }, res) => {
  res.json(
    await models.total.findAll({
      raw: true,
      where: { testcode: params.testcode, code: params.code },
    })
  );
});

// GET TEST TOTAL
app.get("/db/total/:code", async ({ params }, res) => {
  res.json(
    await models.total.findAll({ raw: true, where: { code: params.code } })
  );
});

// GET ALL TEST TOTAL
app.get("/db/total", async ({ params }, res) => {
  res.json(await models.total.all());
});

// GET SUBJECT
app.get("/db/subject", async ({ params }, res) => {
  res.json(await models.subject.all());
});

// MY ACCOUNT
app.get("/my-account", (req, res) => {
  res.json(req.session.account);
});
