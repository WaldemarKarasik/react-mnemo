const jwt = require("jsonwebtoken");
const User = require("../models/User");
const admin = async (req,res,next) => {
    const {name} = req.query
    if (!name)
        return res.json({msg: {msgBody: "Name not provided", msgError: true}})
        const token = req.get("x-auth-token");
        console.log(token)
        if (!token) {
          return res
            .status(401)
            .json({ msg: "No authentication token, authorization denied" });
        }
        const verified = await jwt.verify(token, 'komsomolradio')
        if (!verified) {
            return res
              .status(401)
              .json({ msg: "Token verification failed, authorization denied" });
          }
          const user = await User.findOne({ _id: verified._id });
          if (!user.admin) {
              return res.status(403).json({ msg: "Not an admin" });
          }
          req.user = user
          next();
}  

module.exports = admin