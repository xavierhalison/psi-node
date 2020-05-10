const connection = require("./db");
const bodyParser = require("body-parser");

module.exports = function (app) {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(bodyParser.raw());

  /**
   * CRUD DE TIMES
   */
  app
    .route("/times")
    .get(function (req, res) {
      connection.query("SELECT * FROM time;", function (
        error,
        results,
        fields
      ) {
        res.json(results);
      });
    })
    .put(function (req, res) {
      const { escudoURL, nome, userID } = req.body;
      const query = `INSERT INTO time (escudo , nome, userid )
                      VALUES (
                        "${escudoURL}",
                        "${nome}",
                        ${userID}
                      )`;

      connection.query(query, function (error, results, fields) {
        if (error) {
          res.send(error.stack);
        } else {
          res.json(results.insertId);
        }
      });
    });

  app
    .route("/times/:id")
    .post(function (req, res) {
      const { id } = req.params;
      const { escudoURL, nome, userID } = req.body;
      const query = ` UPDATE \`time\` 
                    SET escudo  = '${escudoURL}',
                        nome = '${nome}',
                        userid = ${userID}
                    WHERE timeid = ${id}`;

      connection.query(query, function (error, results, fields) {
        if (error) {
          res.status(500).send(error.stack);
        } else {
          res.status(200).json(results);
        }
      });
    })
    .delete(function (req, res) {
      const { id } = req.params;
      const query = `DELETE FROM \`time\` WHERE timeid = ${id}`;

      connection.query(query, function (error, results, fields) {
        if (error) {
          res.status(500).send(error.stack);
        } else {
          res.status(200).json(results);
        }
      });
    });

  app
    .route("/campeonato")
    .get(function (req, res) {
      res.status(200).send("GET");
    })
    .put(function (req, res) {
      res.status(200).send("PUT");
    });

  app
    .route("/campeonato/:id")
    .get(function (req, res) {
      res.status(200).send("GET");
    })
    .post(function (req, res) {
      res.status(200).send("POST");
    })
    .delete(function (req, res) {
      res.status(200).send("DELETE");
    });
};
