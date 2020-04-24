'use strict';
module.exports = (sequelize, DataTypes) => {
  const Subcategory = sequelize.define('Subcategory', {
    CategoryId: {
      allowNull: false, 
      type: DataTypes.INTEGER
    },
    code: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    image_path: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {});
  Subcategory.associate = function(models) {
    Subcategory.belongsTo(models.Category) // Una subcategoría pertenece solo a una categoría
    Subcategory.hasMany(models.Product) // Una subcategoría tiene muchos productos
  };
  return Subcategory;
};