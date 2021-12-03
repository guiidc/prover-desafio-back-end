'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('employees', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        notNull: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        notNull: true,
      },
      tel: {
        type: Sequelize.STRING,
        notNull: false,
      },
      birthday: {
        type: Sequelize.STRING,
        notNull: true,
      },
      age: {
        type: Sequelize.STRING,
        notNull: true,
      },
      sex: {
        type: Sequelize.CHAR,
        notNull: true,
      },
      status: {
        type: Sequelize.BOOLEAN,
        notNull: true,
      },
      positionId: {
        type: Sequelize.INTEGER,
        notNull: true,
        references: {
          model: 'positions',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('employees');
  }
};
