const express = require('express');
const router = express.Router();

router.get('/:filename/download', (req, res) => {
  const file = `${__dirname}/static/${req.params.filename}.pdf`;
  res.download(file);
});

module.exports = router;
