const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs, likes } = request.body;

  const repositorie = { id: uuid(), title, url, techs, likes };

  repositories.push(repositorie);

  return response.status(201).json(repositorie);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositorieIndex = repositories.findIndex(
    (project) => project.id === id
  );
  if (repositorieIndex < 0) {
    return response.status(400).json({ error: "repositorie not found" });
  }
  const like = repositories[repositorieIndex].likes;
  const repositorie = {
    id,
    title,
    url,
    techs,
    like,
  };
  repositories[repositorieIndex] = repositorie;

  return response.json(repositorie);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repositorieIndex = repositories.findIndex(
    (project) => project.id === id
  );

  if (repositorieIndex < 0) {
    return response.status(400).json({ error: "repositorie not found" });
  }

  repositories.splice(repositorieIndex, 1);
  return response.status(204).json({ message: "repositorie deleted" });
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositorieIndex = repositories.findIndex(
    (project) => project.id === id
  );
  if (repositorieIndex < 0) {
    return response.status(400).json({ error: "repositorie not found" });
  }
  repositories[repositorieIndex].likes =
    repositories[repositorieIndex].likes + 1;

  return response.json(repositories[repositorieIndex]);
});

module.exports = app;
