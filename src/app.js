const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

// Import route files
const repositoryRouter = require("./routes/repository.routes");

const app = express();

// Body Parser
app.use(express.json());
// Enable CORS
app.use(cors());

// Mount routers
app.use("/repositories", repositoryRouter);

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
