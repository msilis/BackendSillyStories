const express = require("express");
const router = express.Router();
const Story = require("../models/story");
const savedStory = require("../models/savedStory");

router.get("/", (req, res) => {
  res.status(200).send("Silly Stories Back End");
});

router.get("/stories", async (req, res) => {
  try {
    const allStories = await Story.find({});
    console.log(allStories);
    res.status(201).json(allStories);
  } catch (err) {
    console.log(err);
  }
});
//get random story
router.get("/randomStory", async (req, res) => {
  const storyArray = [];
  try {
    const newStory = await Story.find({});
    storyArray.push(newStory);
    const randomStory = Math.floor(Math.random() * storyArray[0].length);
    console.log(randomStory);
    res.status(200).json(storyArray[0][randomStory]);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      msg: "There was an error with the server. I could not get a random story.",
    });
  }
});

//Save story
router.post("/saveStory", async (req, res) => {
  try {
    const saveStory = new savedStory({
      story: req.body.story,
    });

    const addSavedStory = await saveStory.save();
    res.status(201).json(addSavedStory);
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "There was an error saving your story!" });
  }
});

module.exports = router;
