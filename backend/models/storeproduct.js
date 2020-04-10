'use strict';
module.exports = (sequelize, DataTypes) => {
  const StoreProduct = sequelize.define('StoreProduct', {
    StoreId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    ProductId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    ammount: {
      allowNull: false,
      type: DataTypes.FLOAT
    },
    stockMin: DataTypes.FLOAT,
    stockMax: DataTypes.FLOAT
  }, {});
  StoreProduct.associate = function(models) {
    // associations can be defined here
  };
  return StoreProduct;
};