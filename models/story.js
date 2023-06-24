const mongoose = require("mongoose");

const storySchema = new mongoose.Schema(
  {
    story: {
      story: {
        type: String,
        require: true,
      },
    },
  },
  { collection: "stories" }
);

module.exports = mongoose.model("Story", storySchema);
