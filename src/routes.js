const router = require("express").Router();

router.get('/', (req, res) => {
  res.status(200).send('API Teste para upload de audio')
});

const summaryController = require('./controllers/summaryController')

router.post('/summaries', summaryController.create);
router.get('/summaries', summaryController.list);
router.get('/summaries/:summaryId', summaryController.get);
router.put('/summaries/:summaryId', summaryController.update);
router.delete('/summaries/:summaryId', summaryController.remove);

module.exports = router;
