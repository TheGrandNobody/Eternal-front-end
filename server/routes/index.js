const express = require('express');
const handleError = require('../middlewares/errorhandling');
const router = express.Router();
const paginate = require('../middlewares/pagination');
const UserGages = require('../models/userGageSchema');
const UserApprovals = require('../models/userApprovalStatus');

router.get('/:filename/download', (req, res) => {
  const file = `${__dirname}/static/${req.params.filename}.pdf`;
  res.download(file);
});

router.get('/getUserStatus/:account', async (req, res) => {
  await UserGages.find({ gageJoinedUsersAddresses: req.params.account }, (err, data) => {
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

router.get('/getAllGagesAddresses/:account', async (req, res) => {
  const data = await paginate(
    req,
    UserGages,
    UserGages.find({ gageStatus: { $ne: 'closed' }, ownedByAddress: req.params.account }, { gageId: true, gageAddress: true })
  )();
  res.json(data);
});

router.get('/getAllGages/:account/:status', async (req, res) => {
  const data = await paginate(
    req,
    UserGages,
    UserGages.find({ gageStatus: req.params.status.toLowerCase(), gageJoinedUsersAddresses: req.params.account })
  )();
  res.json(data);
});

router.post('/find-gage', async (req, res) => {
  await UserGages.find(
    {
      amount: req.body.amount,
      riskType: req.body.riskType,
      riskPercentage: req.body.riskPercentage,
      gageStatus: req.body.status,
      gageType: req.body.gageType,
    },
    (err, data) => {
      if (err) {
        res.json(err);
        return;
      }
      res.json(data);
      return;
    }
  )
    .clone()
    .catch(function (err) {
      console.log(err);
    });
});

router.post('/findAndUpdateGageAddress', async (req, res) => {
  await UserGages.updateOne({ gageId: req.body.gageId }, { $set: { gageAddress: req.body.gageAddress } }, (err, data) => {
    if (err) {
      res.json(err);
      return;
    }
    res.json({ result: data });
    return;
  })
    .clone()
    .catch(function (err) {
      console.log(err);
    });
});

router.post('/findAndUpdateGageStatus', async (req, res) => {
  await UserGages.updateOne({ gageId: req.body.gageId }, { $set: { gageStatus: req.body.gageStatus } }, (err, data) => {
    if (err) {
      res.json(err);
      return;
    }
    res.json({ message: 'Gage Status updated !' });
    return;
  })
    .clone()
    .catch(function (err) {
      console.log(err);
    });
});

router.post('/createUserApprovalStatus', async (req, res) => {
  const isExist = await UserApprovals.find({ account: req.body.account });
  if (!isExist.length > 0) {
    const data = new UserApprovals({ account: req.body.account, approvalStatus: req.body.status });
    await data.save();
    res.json({ message: 'approval Created Successfully !' });
    return;
  }
  res.json({ message: 'approval is already there !' });
});

router.get('/findUserApprovalStatus/:account', async (req, res) => {
  await UserApprovals.findOne({ account: req.params.account }, (err, data) => {
    if (err) {
      res.json(err);
      return;
    }
    res.json(data);
    return;
  })
    .clone()
    .catch(function (err) {
      console.log(err);
    });
});

router.post('/addUserToGage', async (req, res) => {
  const isExist = await UserGages.find({ gageId: req.body.gageId, gageJoinedUsersAddresses: req.body.userAddress }).exec();
  console.log(isExist);
  if (!isExist.length > 0) {
    UserGages.updateOne(
      { gageId: req.body.gageId },
      { $push: { gageJoinedUsersAddresses: req.body.userAddress }, $inc: { gageUsersJoined: 1 } },

      (err, data) => {
        if (err) {
          handleError(err);
        }
        res.json({ message: 'User address Added to Db!' });
        return;
      }
    )
      .clone()
      .catch(function (err) {
        console.log(err);
      });
    return;
  }
  res.send('the address already exist!');
});

router.post('/register-user-gage', async (req, res) => {
  const isExist = await UserGages.find({
    amount: req.body.amount,
    gageAddress: req.body.gageAddress,
    riskType: req.body.riskType,
    riskPercentage: req.body.riskPercentage,
    ownedByAddress: req.body.ownedByAddress,
    gageId: req.body.gageId,
    gageType: req.body.gageType,
  }).exec();

  if (!isExist.length > 0) {
    const userGage = new UserGages({
      amount: req.body.amount,
      riskType: req.body.riskType,
      riskPercentage: req.body.riskPercentage,
      ownedByAddress: req.body.ownedByAddress,
      gageAddress: req.body.gageAddress,
      gageId: req.body.gageId,
      gageJoinedUsersAddresses: [],
      gageType: req.body.gageType,
    });

    userGage
      .save()
      .then((values) => {
        res.json({ result: values });
        return;
      })
      .catch((err) => {
        res.json(err);
        return;
      });
    return;
  }
  res.json({ message: 'User already Exist' });
});

module.exports = router;
