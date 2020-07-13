const User = require('../../models/User')
const Word = require('../../models/Word')
const router = require('express').Router()
const auth = require('../../middleware/auth')


router.post('/random-word', auth, (req,res) => {
    // Word.countDocuments().exec((err, count) => {
    //     const random = Math.floor(Math.random() * count)
    //     Word.findOne().skip(random).exec((err, randomWord) => {
            // const name = randomWord.name.charAt(0).toLowerCase() + randomWord.name.slice(1)
            // res.json({name, examples: randomWord.examples, defintion: randomWord.definition})
    //     })
    // })


    // Word.findOneRandom((err, randomWord) => {
    //     const name = randomWord.name.charAt(0).toLowerCase() + randomWord.name.slice(1)
    //     res.json({name, examples: randomWord.examples, defintion: randomWord.definition})

    // })


    User.findOne({_id: req.user._id}).populate('words').exec((err, user) => {
        const words = []
        for (let i=0; i<user.words.length; i++) {
            words.push(user.words[i])
        }
        if (words.length == 0) {
            return res.json({msg: {msgBody: "User has no words", msgError: true}})
        }
        const random = Math.floor(Math.random() * words.length)
        const randomWord = words[random]
        const name = randomWord.name.charAt(0).toLowerCase() + randomWord.name.slice(1)
        res.json({name, examples: randomWord.examples, _id: randomWord._id, defintion: randomWord.definition})
    })
})

module.exports = router