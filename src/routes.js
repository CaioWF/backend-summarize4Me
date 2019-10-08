const routes = require("express").Router();
const multer = require("multer");
const multerConfig = require("./config/multer");

routes.get('/', (req, res) => {
  res.status(200).send('API Teste para upload de audio')
});

routes.post("/posts", multer(multerConfig).single("file"), async (req, res) => {
  const { originalname: name, size, key, location: url = '' } = req.file;
  const post = {
    name,
    size,
    key,
    url
  }
  return res.json(post);
});

module.exports = routes;
