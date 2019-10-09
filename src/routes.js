const routes = require("express").Router();
const multer = require("multer");
const multerConfig = require("./config/multer");

routes.get('/', (req, res) => {
  res.status(200).send('API Teste para upload de audio')
});

const summaryController = require('./controllers/summaryController')

router.post('/summaries', multer(multerConfig).single("file"), summaryController.create);
router.get('/summaries', summaryController.list);
router.get('/summaries/:summaryId', summaryController.get);
router.put('/summaries/:summaryId', summaryController.update);
router.delete('/summaries/:summaryId', summaryController.remove);

module.exports = routes;
