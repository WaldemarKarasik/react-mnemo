const User = require('../../models/User')
const Word = require('../../models/Word')
const router = require('express').Router()
const auth = require('../../middleware/auth')


router.post('/random-word', auth, (req,res) => {
    Word.countDocuments().exec((err, count) => {
        const random = Math.floor(Math.random() * count)
        Word.findOne().skip(random).exec((err, randomWord) => {
            const name = randomWord.name.charAt(0).toLowerCase() + randomWord.name.slice(1)
            res.json({name, examples: randomWord.examples, defintion: randomWord.definition})
        })
    })
})

module.exports = router