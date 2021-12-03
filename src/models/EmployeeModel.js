module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    name: DataTypes.STRING,
    tel: DataTypes.STRING,
    age: DataTypes.STRING,
    birthday: DataTypes.DATE,
    sex: DataTypes.CHAR,
    status: DataTypes.BOOLEAN,
    positionId: DataTypes.INTEGER
  },
  {
    tableName: 'employees',
    timestamps: false,
  });

  Employee.associate = (models) => {
    Employee.belongsTo(models.Position, {
      foreignKey: 'positionId',
      as: 'positions',
    });
  };

  return Employee;
}