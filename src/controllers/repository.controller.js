const Repository = require("../models/repository.model");

// @desc Get all repositories
// @route GET /repositories
// @access Public
exports.getRepositories = async (req, res, next) => {
  const repositories = await Repository.fetchAll();

  res.status(200).json(repositories);
};

// @desc Create a new repository
// @route POST /repositories
// @access Public
exports.createRepository = async (req, res, next) => {
  const { title, url, techs } = req.body;

  const newRepo = new Repository(title, url, techs);
  await newRepo.save();

  res.status(200).json(newRepo);
};

// @desc Update repository
// @route PUT /repositories/:id
// @access Public
exports.updateRepository = (req, res, next) => {};

// @desc Delete repository
// @route DELETE /repositories/:id
// @access Public
exports.deleteRepository = (req, res, next) => {};
