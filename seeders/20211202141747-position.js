'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('positions', [
      { position: 'Corretor' },
      { position: 'Auxiliar' },
      { position: 'Secretária' },
      { position: 'Técnico em TI' },
      { position: 'Gerente' },
      { position: 'Coordenador' },
      { position: 'Diretor' },
    
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('positions', null, {});
  }
};
