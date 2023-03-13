const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Users = require('../models/users');
const User = require('../models/user');

router.get('/', (request, response, next) => {
  Users.find()
    .exec()
    .then((docs) => {
      console.log(docs);
      response.status(200).json(docs);
    })
    .catch((err) => {
      response.status(500).json({ error: err });
    });
});

router.post('/', (request, response, next) => {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    email: request.body.email,
    scores: request.body.scores || [],
  });
  user
    .save()
    .then((result) => {
      console.log(result);
      response.status(200).json({
        user,
      });
    })
    .catch((err) => {
      console.log(err);
      response.json(500).json({ error: err });
    });
});

router.delete('/:userId', (request, response, next) => {
  const id = request.params.userId;
  User.deleteOne({ _id: id })
    .exec()
    .then((res) => {
      console.log(res);
      response.status(200).json(res);
    })
    .catch((err) => {
      console.log(err);
      response.status(500).json({ error: err });
    });
});

module.exports = router;

