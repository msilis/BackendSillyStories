const mongoose = require("mongoose");

const savedSchema = new mongoose.Schema(
  {
    story: {
      type: String,
      required: true,
    },
  },
  { collection: "savedStories" }
);

module.exports = mongoose.model("Save", savedSchema);
