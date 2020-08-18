const fs = require("fs").promises;
const path = require("path");

const { uuid } = require("uuidv4");

const reposFilePath = path.join(__dirname, "..", "data", "repositories.json");

const readJsonFile = async (filePath) => {
  try {
    const fileContent = await fs.readFile(filePath);

    return JSON.parse(fileContent);
  } catch (error) {
    console.log(error);
  }
};

const writeJsonFile = async (filePath, data) => {
  try {
    await fs.writeFile(filePath, JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

const repos = [
  {
    id: "9c989a09-8820-40e1-8611-228e7d7db276",
    title: "test1",
    url: "http://test1.com",
    techs: ["test1"],
    likes: 0,
  },
];

class Repository {
  constructor(title, url, techs) {
    this.id = uuid();
    this.title = title;
    this.url = url;
    this.techs = techs;
    this.likes = 0;
  }

  async save() {
    const repositories = await readJsonFile(reposFilePath);

    const existingRepositoryIndex = repositories.findIndex(
      (repo) => repo.id === this.id
    );

    if (existingRepositoryIndex === -1) {
      repositories.push(this);
    } else {
      repositories[existingRepositoryIndex] = this;
    }

    await writeJsonFile(reposFilePath, repositories);
  }

  static async fetchAll() {
    return await readJsonFile(reposFilePath);
  }
}

module.exports = Repository;
