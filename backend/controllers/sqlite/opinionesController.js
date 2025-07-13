const Opinion = require('../../models/sqlite/Opinion');

exports.getAll = async (req, res) => {
  const data = await Opinion.findAll();
  res.json(data);
};

exports.create = async (req, res) => {
  const nueva = await Opinion.create(req.body);
  res.status(201).json(nueva);
};
