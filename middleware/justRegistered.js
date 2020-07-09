const User = require('../models/User')
const jwt = require('jsonwebtoken')
const justRegistered = async (req,res,next) => {
   if (req.params.data) {

       try {
            const email = await JSON.parse(req.params.data)

           const userExists = await User.findOne({ email });

           if (!userExists) {
               return res.json({message: {msgBody: "User with this email was not found", msgError: true}});
           }
           const token = jwt.sign(
               {
                   _id: userExists._id,
               },
               "komsomolradio",
               { expiresIn: "1hr" }
           );
           res.json({
               message: {msgBody: "Logged in", msgError: false},
               token,
               user: {
                   id: userExists._id,
                   displayName: userExists.displayName
                       ? userExists.displayName
                       : undefined,
                   email: userExists.email,
               },
           });
           res.end()
       } catch (err) {
           res.status(500).json({ error: err.message });
       }
   } else {
       next()
   }
}
module.exports = justRegistered