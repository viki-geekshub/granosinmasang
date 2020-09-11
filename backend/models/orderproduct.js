'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderProduct = sequelize.define('OrderProduct', {
    OrderId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    ProductId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    productUnits: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    packedIncluded: {
      type: DataTypes.BOOLEAN
    },
    totalProduct: {
      type: DataTypes.FLOAT
    }
  }, {});
  OrderProduct.associate = function(models) {
    // associations can be defined here
  };
  return OrderProduct;
};