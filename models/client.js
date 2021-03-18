const { Model } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    static associate(models) {}
  }
  Client.init(
    {
      clientId: DataTypes.STRING,
      clientName: DataTypes.STRING,
      geom: DataTypes.GEOMETRY,
    },
    {
      sequelize,
      modelName: "Client",
    }
  );
  return Client;
};
