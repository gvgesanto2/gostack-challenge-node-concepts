const express = require("express");

const {
  getRepositories,
  createRepository,
  updateRepository,
  deleteRepository,
} = require("../controllers/repository.controller");

const router = express.Router();

router.route("/").get(getRepositories).post(createRepository);

router.route("/:id").put(updateRepository).delete(deleteRepository);

module.exports = router;
