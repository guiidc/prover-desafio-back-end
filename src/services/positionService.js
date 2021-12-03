const { Position } = require('../models');

async function getPositions() {
  const positions = await Position.findAll();
  return positions;
}

module.exports = {
  getPositions,
}