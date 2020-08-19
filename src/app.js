const express = require("express");
const cors = require("cors");

const errorHandler = require("./middleware/errorHandler");

// Import route files
const repositoryRouter = require("./routes/repository.routes");

const app = express();

// Body Parser
app.use(express.json());
// Enable CORS
app.use(cors());

// Mount routers
app.use("/repositories", repositoryRouter);

// Error handler
app.use(errorHandler);

module.exports = app;
