const app = require("./app");

const PORT = process.env.PORT || 3333;
const mode = process.env.NODE_ENV || "development";

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}! [${mode}]`);
});
