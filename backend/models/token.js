'use strict';
module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define('Token', {
    UserId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    token: DataTypes.STRING
  }, {});
  Token.associate = function(models) {
    Token.belongsTo(models.User); // Un token pertencece solo a un usuario
  };
  return Token;
};