const express = require('express');
const summaryController = require('../controllers/summaryController');

const router = express.Router();

router.post('/summaries', summaryController.create);
router.get('/summaries', summaryController.list);
router.get('/summaries/:summaryId', summaryController.get);
router.put('/summaries/:summaryId', summaryController.update);
router.delete('/summaries/:summaryId', summaryController.remove);

module.exports = router;