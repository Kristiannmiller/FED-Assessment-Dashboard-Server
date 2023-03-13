const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  topic: { type: String, required: true },
  targetScore: { type: Number, required: true },
  subTopics: {
    type: [
      {
        subTopic: String,
        targetScore: Number,
        categories: [
          {
            category: String,
            referenceMaterial: [String],
            targetScore: Number,
            notes: String,
          },
        ],
      },
    ],
    required: true,
  },
});

module.exports = mongoose.model('Category', categorySchema);

