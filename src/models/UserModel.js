module.exports = (sequelize, DataTypes) => {
  return User = sequelize.define('User', {
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  {
    tableName: 'users',
    timestamps: false,
  })
}