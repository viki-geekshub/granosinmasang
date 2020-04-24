'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    SubcategoryId: {
      allowNull: false, 
      type: DataTypes.INTEGER
    },
    code:{
      allowNull: false,   // Añado los campos que no pueden estar vacíos (NOT NULL)
      unique: true,  // NO FUNCIONA - Habria que hacerlo a mano en el phpMyAdmin
      type: DataTypes.STRING
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    image_path: DataTypes.STRING,
    price: {
      allowNull: false,
      type: DataTypes.FLOAT
    },
    packedPrice: DataTypes.FLOAT,
    available: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    },
    description: DataTypes.STRING,
    recommendations: DataTypes.STRING,
    nutritionalValue: DataTypes.STRING
  }, {});
  Product.associate = function(models) {
    Product.belongsToMany(models.Category,{ // Creo la relación entre la tabla products y la tabla categories. Es una relacion de muchos a muchos.
      through: models.ProductCategory  // a traves de la tabla de cruce ProductCategory
    })
    Product.belongsToMany(models.Order,{  // Un Producto puede pertenecer a muchos pedidos
      through: models.OrderProduct  
    });
    Product.belongsToMany(models.Store,{ // Un Producto puede estar muchos almacenes
      through: models.StoreProduct
    });
    Product.belongsToMany(models.Recipe,{  // Un producto puede pertenecer a muchas recetas
      through: models.RecipeProduct  
    });
    Product.belongsTo(models.Subcategory)  // Un producto pertenece sólo a una subcategoría
  };
  return Product;
};