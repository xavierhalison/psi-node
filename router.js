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
    .get(function (req, res) {
      const { id } = req.params;
      const query = `SELECT * FROM \`time\` WHERE timeid = ${id}`;
      connection.query(query, function (error, results, fields) {
        if (error) {
          res.status(500).send(error.stack);
        } else {
          res.status(200).json(results);
        }
      });
    })
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

  /**
   * CRUD DE CAMPEONATO
   */
  app
    .route("/campeonato")
    .get(function (req, res) {
      connection.query("SELECT * FROM campeonato;", function (
        error,
        results,
        fields
      ) {
        res.json(results);
      });
    })
    .put(function (req, res) {
      const { nome, logo } = req.body;
      const query = `INSERT INTO campeonato (nome , logo )
                      VALUES (
                        "${nome}",
                        "${logo}"
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
    .route("/campeonato/:id")
    .get(function (req, res) {
      const { id } = req.params;
      const query = `SELECT * FROM \`campeonato\` WHERE campeonatoID = ${id}`;
      connection.query(query, function (error, results, fields) {
        if (error) {
          res.status(500).send(error.stack);
        } else {
          res.status(200).json(results);
        }
      });
    })
    .post(function (req, res) {
      const { id } = req.params;
      const { nome, logo } = req.body;
      const query = ` UPDATE \`campeonato\` 
                    SET nome  = '${nome}',
                        logo = '${logo}'
                        WHERE campeonatoID = ${id}`;
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
      const query = `DELETE FROM \`campeonato\` WHERE campeonatoID = ${id}`;
      connection.query(query, function (error, results, fields) {
        if (error) {
          res.status(500).send(error.stack);
        } else {
          res.status(200).json(results);
        }
      });
    });
/**
 * CRUD DE PARTIDA
 */
app
    .route("/partida")
    .get(function (req, res) {
      connection.query("SELECT * FROM partida;", function (
        error,
        results,
        fields
      ) {
        res.json(results);
      });
    })
    .put(function (req, res) {
      const { mandanteid , visitanteid, campeonatoid, golsMandante, golsVisitante, local } = req.body;
      const query = `INSERT INTO partida (mandanteid , visitanteid, campeonatoid, golsMandante, golsVisitante, local )
                      VALUES (
                        ${mandanteid},
                        ${visitanteid},
                        ${campeonatoid},
                        ${golsMandante},
                        ${golsVisitante},
                        "${local}"
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
    .route("/partida/:id")
    .get(function (req, res) {
      const { id } = req.params;
      const query = `SELECT * FROM \`partida\` WHERE partidaid = ${id}`;
      connection.query(query, function (error, results, fields) {
        if (error) {
          res.status(500).send(error.stack);
        } else {
          res.status(200).json(results);
        }
      });
    })
    .post(function (req, res) {
      const { id } = req.params;
      const { mandanteid , visitanteid, campeonatoid, golsMandante, golsVisitante, local } = req.body;
      const query = ` UPDATE \`partida\` 
                      SET mandanteid  = ${mandanteid},
                        visitanteid  = ${visitanteid},
                        campeonatoid  = ${campeonatoid},
                        golsMandante  = ${golsMandante},
                        golsVisitante  = ${golsVisitante},
                        local = '${local}'
                        WHERE partidaid = ${id}`;
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
      const query = `DELETE FROM \`partidaid\` WHERE partidaid = ${id}`;
      connection.query(query, function (error, results, fields) {
        if (error) {
          res.status(500).send(error.stack);
        } else {
          res.status(200).json(results);
        }
      });
    });
/**
 * CRUD DE USUARIO
 */
app
    .route("/usuario")
    .get(function (req, res) {
      connection.query("SELECT * FROM usuario;", function (
        error,
        results,
        fields
      ) {
        res.json(results);
      });
    })
    .put(function (req, res) {
      const { email, senha, permissao } = req.body;
      const query = `INSERT INTO usuario (email, senha, permissao)
                      VALUES (
                        "${email}",
                        "${senha}",
                        ${permissao}                        
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
    .route("/user/:id")
    .get(function (req, res) {
      const { id } = req.params;
      const query = `SELECT * FROM \`usuario\` WHERE userid = ${id}`;
      connection.query(query, function (error, results, fields) {
        if (error) {
          res.status(500).send(error.stack);
        } else {
          res.status(200).json(results);
        }
      });
    })
    .post(function (req, res) {
      const { id } = req.params;
      const { email, senha, permissao } = req.body;
      const query = ` UPDATE \`partida\` 
                        email = '${email}',
                        senha = '${senha}',
                        permissao = ${permissao} 
                        WHERE userid = ${id}`;
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
      const query = `DELETE FROM \`usuario\` WHERE userid = ${id}`;
      connection.query(query, function (error, results, fields) {
        if (error) {
          res.status(500).send(error.stack);
        } else {
          res.status(200).json(results);
        }
      });
    });
};