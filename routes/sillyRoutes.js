const express = require("express");
const router = express.Router();
const Story = require("../models/story");
const Save = require("../models/savedStory");

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
  console.log("SaveStory endpoint");
  try {
    const saveStory = new Save({
      story: req.body.story.displayStory,
    });

    const addSavedStory = await saveStory.save();
    console.log("story saved");
    res.status(201).json(addSavedStory);
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "There was an error saving your story!" });
  }
});

//Return saved stories
router.get("/getSavedStories", async (req, res) => {
  try {
    const getSavedStories = await Save.find();
    res.status(200).json(getSavedStories);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ msg: "There was an error getting your saved stories." });
  }
});

module.exports = router;
