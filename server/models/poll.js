const mongoose = require("mongoose");

const pollSchema = new mongoose.Schema(
  {
    pollQuestion: String,
    pollOptions: Array,
    PollDuration: {
      type: String,
      enum: ["1day", "3day", "1week", "2week"],
      default: "1day",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    voteCount: {
      type: Number,
      default: 0,
    },
    subscribers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Poll = mongoose.model("Poll", pollSchema);
module.exports = Poll;
