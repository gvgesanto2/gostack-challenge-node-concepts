const express = require("express");

const {
  getRepositories,
  createRepository,
  updateRepository,
  deleteRepository,
  incrementLikes,
  findRepositoryById,
} = require("../controllers/repository.controller");

const router = express.Router();

router.route("/").get(getRepositories).post(createRepository);

router.route("/:id").put(updateRepository).delete(deleteRepository);

router.route("/:id/like").post(incrementLikes);

router.param("id", findRepositoryById);

module.exports = router;
