const { Client } = require("../models");

const client = {
  findAll: (req, res, next) => {
    Client.findAll()
      .then((client) => {
        res.send(client);
      })
      .catch((err) => {
        next(err);
      });
  },
  findOneById: (req, res, next) => {
    let { id } = req.params;

    Client.findOne({
      where: { id: id },
    })
      .then((client) => {
        if (client) {
          res.send(client);
        } else {
          res.status(204).send();
        }
      })
      .catch((err) => {
        next(err);
      });
  },
  create: (req, res, next) => {
    let client = {
      clientId: req.body.clientId,
      clientName: req.body.clientName,
      geom: req.body.geom,
    };

    Client.create(client)
      .then((result) => {
        console.log("Create.");
        res.send(client);
      })
      .catch((err) => {
        next(err);
      });
  },
  destory: (req, res, next) => {
    let { id } = req.params;

    Client.destroy({ where: { id: id } })
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        next(err);
      });
  },
};

module.exports = client;
