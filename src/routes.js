const routes = require("express").Router();
const multer = require("multer");
const multerConfig = require("./config/multer");

routes.get('/', (req, res) => {
  res.status(200).send('API Teste para upload de audio')
});

routes.post("/posts", multer(multerConfig).single("file"), (req, res) => {
  const { originalname: name, size, key, location: url = '' } = req.file;
  const post = {
    name,
    size,
    key,
    url
  }
  return res.json(post);
});

const summaryController = require('./controllers/summaryController')

router.post('/summaries', summaryController.create);
router.get('/summaries', summaryController.list);
router.get('/summaries/:summaryId', summaryController.get);
router.put('/summaries/:summaryId', summaryController.update);
router.delete('/summaries/:summaryId', summaryController.remove);

module.exports = routes;
