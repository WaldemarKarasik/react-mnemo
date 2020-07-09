const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true, min: 6 },
  displayName: { type: String },
  words: [{ type: mongoose.Schema.Types.ObjectId, ref: "Word" }],
});

module.exports = mongoose.model("User", UserSchema);
