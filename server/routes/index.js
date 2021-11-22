const express = require('express');
const handleError = require('../middlewares/errorhandling');
const router = express.Router();

const UserGages = require('../models/userGageSchema');

router.get('/:filename/download', (req, res) => {
  const file = `${__dirname}/static/${req.params.filename}.pdf`;
  res.download(file);
});

router.post('/register-user-gage', async (req, res) => {
  const isExist = await UserGages.find({
    amount: req.body.amount,
    riskType: req.body.riskType,
    riskPercentage: req.body.riskPercentage,
    ownedByAddress: req.body.ownedByAddress,
    gageId: req.body.gageId,
  }).exec();

  if (!isExist.length > 0) {
    const userGage = new UserGages({
      amount: req.body.amount,
      riskType: req.body.riskType,
      riskPercentage: req.body.riskPercentage,
      ownedByAddress: req.body.ownedByAddress,
      gageId: req.body.gageId,
    });

    userGage
      .save()
      .then((values) => {
        res.json(values);
      })
      .catch((err) => {
        res.json(err);
      });
  }
});

router.get('/getUserStatus/:account', async (req, res) => {
  await UserGages.find({ ownedByAddress: req.params.account }, (err, data) => {
    if (err) {
      res.json(err);
    }
    res.json(data);
  })
    .clone()
    .catch(function (err) {
      console.log(err);
    });
});

router.post('/find-gage', async (req, res) => {
  await UserGages.find(
    { amount: req.body.amount, riskType: req.body.riskType, riskPercentage: req.body.riskPercentage, gageStatus: req.body.status },
    (err, data) => {
      if (err) {
        res.json(err);
      }
      res.json(data);
    }
  )
    .clone()
    .catch(function (err) {
      console.log(err);
    });
});

router.post('/findAndUpdateGageAddress', async (req, res) => {
  await UserGages.findOneAndUpdate(
    { gageId: req.body.gageId, ownedByAddress: req.body.account },
    { gageAddress: req.body.gageAddress },
    (err, data) => {
      if (err) {
        res.json(err);
      }
      res.json(data);
    }
  )
    .clone()
    .catch(function (err) {
      console.log(err);
    });
});

module.exports = router;
