"use strict";

const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const db = {};
const basename = path.basename(__filename);

mongoose.Promise = global.Promise;

const connectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect("mongodb://localhost:27017/voting-app", connectOptions)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Load models dynamically
fs.readdirSync(__dirname)
  .filter((file) => file !== basename && file.slice(-3) === ".js")
  .forEach((file) => {
    const model = require(path.join(__dirname, file));
    db[model.modelName] = model;
  });

// Define associations if available
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.mongoose = mongoose;

module.exports = db;
