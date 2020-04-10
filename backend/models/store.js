'use strict';
module.exports = (sequelize, DataTypes) => {
  const Store = sequelize.define('Store', {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    address: DataTypes.STRING,
    location: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {});
  Store.associate = function(models) {
    Store.belongsToMany(models.Product,{ // Un Almacen puede tener muchos productos
      through: models.StoreProduct
    });
  };
  return Store;
};