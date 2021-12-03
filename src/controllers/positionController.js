const positionService = require('../services/positionService');

async function getPositions(req, res) {
  const positions = await positionService.getPositions();
  res.status(200).json(positions);
}

module.exports= {
  getPositions,
}