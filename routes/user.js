const router = require("express").Router();
const User = require("../models/User");
const Joi = require("@hapi/joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const justRegistered = require("../middleware/justRegistered");
const Word = require("../models/Word");

const validationSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().trim().min(6).required(),
  // passwordCheck: Joi.ref("password"),
});
// .with("password", "passwordCheck");

router.post("/register", async (req, res) => {
  const { email, password, passwordCheck, displayName } = req.body;
  const validationResult = validationSchema.validate({
    email,
    password,
  });
  if (validationResult.error) {
    return res.json({
      message: {
        msgBody: validationResult.error.details[0].message,
        msgError: true,
      },
    });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({
        message: {
          msgBody: "Account with this email already exists",
          msgError: true,
        },
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
      displayName: displayName ? displayName : undefined,
    });
    await newUser.save((err, user) => {
      let email = user.email;
      let _id = user._id;
      const data = { email, _id };
      const jsonData = JSON.stringify(email);
      return res.redirect(307, `login/${jsonData}`);
    });
    // res.status(201).json(savedUser);
    // const token = jwt.sign(
    //     {
    //       _id: userExists._id,
    //     },
    //     "komsomolradio",
    //     { expiresIn: "1hr" }
    // );
    // const email = savedUser.email
    // const _id = savedUser.id
    // const data = {email, _id}
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login/:data?", justRegistered, async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExists = await User.findOne({ email }).populate("words");

    if (!userExists) {
      return res.json({
        message: {
          msgBody: "User with this email was not found",
          msgError: true,
        },
      });
    }
    const isMatch = await bcrypt.compare(password, userExists.password);
    if (!isMatch) {
      return res.json({
        message: { msgBody: "Invalid credentials", msgError: true },
      });
    }
    const token = jwt.sign(
      {
        _id: userExists._id,
      },
      "komsomolradio",
      { expiresIn: "1hr" }
    );
    res.json({
      message: { msgBody: "Logged in", msgError: false },
      token,
      user: {
        id: userExists._id,
        displayName: userExists.displayName
          ? userExists.displayName
          : undefined,
        email: userExists.email,
        words: userExists.words,
        new: userExists.new
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete", auth, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete({ _id: req.user._id });
    return res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);
    const verified = jwt.verify(token, "komsomolradio");
    if (!verified) return res.json(false);
    const user = await User.findById(verified._id);
    if (!user) return res.json(false);
    return res.json(true);
  } catch (err) {
    res.json(false);
  }
});

router.post("/", auth, async (req, res) => {
  /// User.findById() return user ?????
  // console.log(req.user.id);
  User.findById({ _id: req.user.id })
    .populate("words")
    .exec((err, user) => {
      res.json({
        email: req.user.email,
        id: req.user.id,
        displayName: req.user.displayName ? req.user.displayName : undefined,
        words: user.words,
        new: user.new
      });
    });
  // res.json({
  //   email: req.user.email,
  //   _id: req.user.id,
  //   displayName: req.user.displayName ? req.user.displayName : undefined,
  // });
});

router.post("/learn-word", auth, async (req, res) => {
  const { name } = req.body;
  const userId = req.user.id;
  try {
    const foundUser = await User.findById(req.user.id);
    if (foundUser) {
      const foundWord = await Word.findOne({ name });
      if (foundWord) {
        if (foundUser.words.includes(foundWord._id)) {
          return res.json({
            msg: { msgBody: "You already learn this word", msgError: true },
          });
        }
        foundUser.words.push(foundWord);
        const addedWordSaved = await foundUser.save();
        const words = await User.findOne({ _id: addedWordSaved._id }).populate(
          "words"
        );
        return res.status(201).json(words.words);
      }
    }
  } catch (e) {
    res.json(e.message);
  }
});

router.post('/intro-viewed', auth, async (req,res) => {

  const user = await User.findOneAndUpdate({email: req.user.email}, {new: false}, {new: true})

  await user.save((err, doc) => {
    if (err)
      return console.log(err)
    return res.status(200).json(doc)
  })
})

router.post('/delete-word-from-list', auth, async (req,res) => {
  const {_id} = req.body

  await User.findOne({_id: req.user._id}).populate("words").exec(async (err, user) => {
    user.words.pull(_id)
    user.save((err, doc) => {
      if (err) {
        return res.json({msg: {msgBody: "Fail", msgError: true}})
      }
      return res.json({msg: {msgBody: "Success", msgError: false}, user: doc})
    })
  })
})


module.exports = router;
