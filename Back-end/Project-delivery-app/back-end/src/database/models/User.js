module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      timestamps: false,
      underscored: true, 
      tableName: 'users'
    },
  );

  User.associate = (models) => {
    User.hasMany(models.Sale, {
      as: 'buyer',
      foreignKey: 'userId',
    })
    User.hasMany(models.Sale, {
      as: 'seller',
      foreignKey: 'sellerId',
    })
  }

  return User;
}