module.exports = (sequelize, DataTypes) => {
  const Position = sequelize.define('Position', {
    position: DataTypes.STRING,
  },{
    tableName: 'positions',
    timestamps: false
  });

  Position.associate = (models) => {
    Position.hasMany(models.Employee, {
      foreignKey: 'positionId',
      as: 'employees',
    })
  };

  return Position;
}