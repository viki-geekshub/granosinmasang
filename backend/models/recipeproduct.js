'use strict';
module.exports = (sequelize, DataTypes) => {
  const RecipeProduct = sequelize.define('RecipeProduct', {
    ProductId: DataTypes.INTEGER,
    RecipeId: DataTypes.INTEGER
  }, {});
  RecipeProduct.associate = function(models) {
    // associations can be defined here
  };
  return RecipeProduct;
};