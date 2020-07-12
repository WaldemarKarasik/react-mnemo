const router = require("express").Router();
const Word = require("../models/Word");

router.post("/", async (req, res) => {
  const { name, type, examples, definition } = req.body;
  const newWord = new Word({ name, type, examples, definition });
  const savedWord = await newWord.save();
  if (savedWord) {
    return res.status(201).json(savedWord);
  } else {
    return res.json("error");
  }
});

router.get("/list", async (req, res) => {
  console.log(req.query);
  // var words = await Word.find();
  const myAggregate = Word.aggregate();
  Word.aggregatePaginate(myAggregate, { page: req.query.page || 1, limit: 5 })
    .then(function (result) {
      // result.docs
      // result.totalDocs = 100
      // result.limit = 10
      // result.page = 1
      // result.totalPages = 10
      // result.hasNextPage = true
      // result.nextPage = 2
      // result.hasPrevPage = false
      // result.prevPage = null
      return res.status(200).json(result);
    })
    .catch(function (err) {
      res.json(err);
    });
  // await Word.aggregatePaginate(myAggregate, { page: 1, limit: 5 })
  //   .then((results) => {
  //     console.log(results);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // const normalWords = [[...words]];
  // const normalizedWords = Object.assign({}, words)
  // console.log(normalizedWords)
  // const normalizedWords =  words.map((word, key)=>{
  //   console.log(word[key])
  //   // return {id:word[i]._id, name: word[i].name, key: word[i].key, link_sentence: word[i].link_sentence, definition: word[i].definition}
  // })
  // return res.json(words);
});

router.post("/details/", (req, res) => {
  const { name } = req.query;
  if (!name) {
    return res.end();
  }
  Word.findOne({ name }, (err, word) => {
    if (err) {
      return res.status(500);
    }
    return res.json(word);
  });
});

module.exports = router;
