module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
      userId: { type: DataTypes.INTEGER, foreignKey: true },
      sellerId: { type: DataTypes.INTEGER, foreignKey: true },
      totalPrice: DataTypes.DECIMAL,
      deliveryAddress: DataTypes.STRING,
      deliveryNumber: DataTypes.STRING,
      saleDate: DataTypes.DATE,
      status: DataTypes.STRING,
    },
    {
      timestamps: false,
      underscored: true, 
      tableName: 'sales'
    },
  );

  Sale.associate = (models) => {
    Sale.belongsTo(models.User, {
      as: 'buyer',
      foreignKey: 'userId',
    });
    Sale.belongsTo(models.User, {
      as: 'seller',
      foreignKey: 'sellerId',
    });
  };

  return Sale;
}