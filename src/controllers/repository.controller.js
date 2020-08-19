const Repository = require("../models/repository.model");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/ErrorResponse");

// Load repository by ID and append to req
exports.findRepositoryById = async (req, res, next, repositoryId) => {
  try {
    const repo = await Repository.findById(repositoryId);

    if (!repo) {
      return next(new ErrorResponse("No repository with this ID", 400));
    }

    req.repository = repo;
    return next();
  } catch (error) {
    next(error);
  }
};

// @desc Get all repositories
// @route GET /repositories
// @access Public
exports.getRepositories = asyncHandler(async (req, res, next) => {
  const repositories = await Repository.fetchAll();

  res.status(200).json(repositories);
});

// @desc Create a new repository
// @route POST /repositories
// @access Public
exports.createRepository = asyncHandler(async (req, res, next) => {
  const { title, url, techs } = req.body;

  const newRepository = new Repository({ title, url, techs });
  await newRepository.save();

  res.status(201).json(newRepository);
});

// @desc Update repository
// @route PUT /repositories/:id
// @access Public
exports.updateRepository = asyncHandler(async (req, res, next) => {
  const { title, url, techs } = req.body;
  const repoToUpdate = req.repository;

  await repoToUpdate.updateAndSave({ title, url, techs });

  res.status(200).json(repoToUpdate);
});

// @desc Delete repository
// @route DELETE /repositories/:id
// @access Public
exports.deleteRepository = asyncHandler(async (req, res, next) => {
  const repoToDelete = req.repository;

  await repoToDelete.remove();

  res.status(204).json({});
});

// @desc Increment the repository's likes number by 1
// @route POST /repositories/:id/like
// @access Public
exports.incrementLikes = asyncHandler(async (req, res, next) => {
  const repoToUpdate = req.repository;

  repoToUpdate.incrementLikes();
  await repoToUpdate.save();

  res.status(200).json(repoToUpdate);
});
