const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  try {
    const token = req.get("x-auth-token");
    console.log(token)
    if (!token) {
      return res
        .status(401)
        .json({ msg: "No authentication token, authorization denied" });
    }
    const verified = jwt.verify(token, "komsomolradio");
    if (!verified) {
      return res
        .status(401)
        .json({ msg: "Token verification failed, authorization denied" });
    }
    req.user = await User.findOne({ _id: verified._id });
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = auth;
