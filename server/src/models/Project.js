const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    tags: [{ type: String }],
    liveUrl: { type: String },
    repoUrl: { type: String },
    image: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', ProjectSchema);
