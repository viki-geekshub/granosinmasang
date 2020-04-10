'use strict';
module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    name: DataTypes.STRING,
    image_path: DataTypes.STRING,
    link: DataTypes.STRING
  }, {});
  Recipe.associate = function(models) {
    Recipe.belongsToMany(models.Product,{  // Una receta puede pertenecer a muchos productos
      through: models.RecipeProduct  
    });
  };
  return Recipe;
};