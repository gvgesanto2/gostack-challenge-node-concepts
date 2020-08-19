const path = require("path");

const { uuid, isUuid } = require("uuidv4");

const { readJsonFile, writeJsonFile } = require("../utils/file.utils");

const reposFilePath = path.join(__dirname, "..", "data", "repositories.json");

class Repository {
  constructor({ id, title, url, techs, likes }) {
    this.id = isUuid(id) ? id : uuid();
    this.title = title || "";
    this.url = url || "";
    this.techs = techs || [];
    this.likes = likes || 0;
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

  update({ title, url, techs }) {
    this.title = title || this.title;
    this.url = url || this.url;
    this.techs = techs || this.techs;
  }

  async updateAndSave(updatedAttributes) {
    this.update(updatedAttributes);
    await this.save();
  }

  incrementLikes() {
    this.likes++;
  }

  async remove() {
    const repositories = await readJsonFile(reposFilePath);

    const remainingRepositories = repositories.filter(
      (repo) => repo.id !== this.id
    );

    await writeJsonFile(reposFilePath, remainingRepositories);
  }

  static async removeAll() {
    await writeJsonFile(reposFilePath, []);
  }

  static async fetchAll() {
    return await readJsonFile(reposFilePath);
  }

  static async findById(repositoryId) {
    const repositories = await readJsonFile(reposFilePath);

    const repo = repositories.find((repo) => repo.id === repositoryId);

    return repo ? new Repository(repo) : repo;
  }
}

module.exports = Repository;
