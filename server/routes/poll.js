const { default: mongoose } = require("mongoose");
const authorization = require("../middleware/authorization");
const Poll = require("../models/poll");

const router = require("express").Router();

router.post("/create", authorization, async (req, res) => {
  const { pollQuestion, pollOptions, PollDuration, isActive } = req.body;
  console.log(req.body.user);

  try {
    const poll = new Poll({
      pollQuestion,
      pollOptions,
      PollDuration,
      isActive,
    });
    await poll.save();
    res.status(200).json({
      data: poll,
      isError: false,
      message: "poll created successfully!",
    });
  } catch (err) {
    res.status(401).json({ isError: true, data: err, message: err });
  }
});

router.get("/activePolls", async (_req, res) => {
  try {
    const polls = await Poll.find({ isActive: true });
    res.status(200).json({
      data: polls,
      isError: false,
    });
  } catch (err) {
    res.status(401).json({ isError: true, data: err });
  }
});

router.put("/plusVote/:id", authorization, async (req, res) => {
  try {
    const prevPoll = await Poll.findById({ _id: req.params.id });
    await Poll.findByIdAndUpdate(
      { _id: req.params.id },
      { voteCount: prevPoll?.voteCount + 1 },
      { new: true }
    ).then((data) => {
      res.status(200).json({
        data: data,
        message: "incremented",
        isError: false,
      });
    });
  } catch (error) {
    res.status(401).json({ isError: true, data: error });
  }
});
router.put("/minusVote/:id", authorization, async (req, res) => {
  try {
    const prevPoll = await Poll.findById({ _id: req.params.id });
    await Poll.findByIdAndUpdate(
      { _id: req.params.id },
      { voteCount: prevPoll?.voteCount - 1 },
      {
        new: true,
      }
    ).then((data) => {
      res.status(200).json({
        data: data,
        message: "decremented",
        isError: false,
      });
    });
  } catch (error) {
    res.status(401).json({ isError: true, data: error });
  }
});

router.put("/active/:id", authorization, async (req, res) => {
  try {
    await Poll.findByIdAndUpdate(
      { _id: req.params.id },
      { isActive: true },
      {
        new: true,
      }
    ).then(() => {
      res.status(200).json({
        message: "poll status changed to active",
        isError: false,
      });
    });
  } catch (error) {
    res.status(401).json({ isError: true, data: error });
  }
});
router.put("/inactive/:id", authorization, async (req, res) => {
  try {
    await Poll.findByIdAndUpdate(
      { _id: req.params.id },
      { isActive: false },
      {
        new: true,
      }
    ).then(() => {
      res.status(200).json({
        message: "poll status changed to inactive",
        isError: false,
      });
    });
  } catch (error) {
    res.status(401).json({ isError: true, data: error });
  }
});

router.put("/subscribe/:id", authorization, async (req, res) => {
  try {
    const { user: userId } = req.body;
    const user_id = new mongoose.Types.ObjectId(userId);
    const poll = await Poll.findById({ _id: req.params.id });
    const alreadySubscribed = poll.subscribers.every(
      (id) => JSON.stringify(id) === JSON.stringify(user_id)
    );

    if (alreadySubscribed) {
      return res.status(401).json({
        message: "user has already subscibed to this poll",
        isError: true,
      });
    }
    await Poll.findByIdAndUpdate(
      { _id: req.params.id },
      { $push: { subscribers: userId } },
      {
        new: true,
      }
    ).then(() => {
      res.status(200).json({
        message:
          "you have subscribed to this poll and will received an email when poll is closed",
        isError: false,
      });
    });
  } catch (error) {
    res.status(401).json({ isError: true, data: error.message });
  }
});

module.exports = router;
