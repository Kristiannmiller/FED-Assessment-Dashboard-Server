const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Category = require('../models/category');

router.get('/', (request, response, next) => {
  Category.find()
    .exec()
    .then((docs) => {
      response.status(200).json(docs);
    })
    .catch((err) => {
      response.status(500).json({ error: err });
    });
});

router.post('/', (request, response, next) => {
  const category = new Category({
    _id: new mongoose.Types.ObjectId(),
    topic: request.body.topic,
    targetScore: request.body.targetScore,
    subTopics: request.body.subTopics,
  });
  category
    .save()
    .then((result) => {
      response.status(200).json({
        message: 'handling POST requests to /categories',
        category: category,
      });
    })
    .catch((err) => {
      response.status(500).json({ error: err });
    });
});

router.get('/:catId', (request, response, next) => {
  const id = request.params.catId;
  Category.findById(id)
    .exec()
    .then((doc) => {
      if (doc) {
        response.status(200).json(doc);
      } else {
        response
          .status(404)
          .json({ message: 'No valid entry found for category ID' });
      }
    })
    .catch((err) => {
      response.status(500).json({ error: err });
    });
});

router.patch('/:catId', (request, response, next) => {
  const id = request.params.catId;
  Category.findByIdAndUpdate({ _id: id }, request.body, { new: true })
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

router.delete('/:catId', (request, response, next) => {
  const id = request.params.catId;
  Category.deleteOne({ _id: id })
    .exec()
    .then((res) => {
      response.status(200).json(res);
    })
    .catch((err) => {
      response.status(500).json({ error: err });
    });
});

module.exports = router;

