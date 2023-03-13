const mongoose = require('mongoose');

const usersSchema = mongoose.Schema([
  {
    _id: mongoose.Schema.Types.ObjectId,
    email: { type: String, required: true },
    scores: {
      type: [
        {
          topic: String,
          overallScore: Number || 0,
          subTopics: [{ title: String, average: Number || 0 }],
        },
      ],
    },
  },
]);

module.exports = mongoose.model('Users', usersSchema);

