'use strict';
module.exports = function(sequelize, DataTypes) {
  var Suppliers = sequelize.define('Suppliers', {
    nama: DataTypes.STRING,
    kota: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  Suppliers.associate= function (models) {
    Suppliers.belongsToMany(models.Item, {through:models.SupplierItem})
    Suppliers.hasMany(models.SupplierItem)

  }
  return Suppliers;
};
