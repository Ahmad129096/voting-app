const express = require("express");
const app = express();
const cors = require("cors");

const port = process.env.PORT || 4001;

//* Middleware
app.use(express.json());
app.use(cors());

//* Socket.io Setup
//* Routes

//? Index Route
app.use("/", require("./routes/index"));

//? Authorization Route
app.use("/auth", require("./routes/jwtAuth"));
app.use("/poll", require("./routes/poll"));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
