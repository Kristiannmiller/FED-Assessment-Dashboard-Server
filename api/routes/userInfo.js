const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user');

router.get('/', (request, response, next) => {
  const email = request.body.email;
  User.findOne({ email: email })
    .exec()
    .then((doc) => {
      if (doc) {
        response.status(200).json(doc);
      } else {
        response.status(404).json({ message: 'No user found' });
      }
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
      response.status(200).json({
        user,
      });
    })
    .catch((err) => {
      response.json(500).json({ error: err });
    });
});

router.patch('/:userId', (request, response, next) => {
  const id = request.params.userId;
  User.findByIdAndUpdate({ _id: id }, request.body, { new: true })
    .exec()
    .then((res) => {
      response.status(200).json(res);
    })
    .catch((err) => {
      response.status(500).json({
        error: err,
      });
    });
});

module.exports = router;

