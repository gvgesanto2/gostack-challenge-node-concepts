const fs = require("fs").promises;

exports.readJsonFile = async (filePath) => {
  const fileContent = await fs.readFile(filePath);

  return JSON.parse(fileContent);
};

exports.writeJsonFile = async (filePath, data) => {
  await fs.writeFile(filePath, JSON.stringify(data));
};
