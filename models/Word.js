const mongoose = require("mongoose");
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
var random = require('mongoose-simple-random');



const WordSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: {type: String, required: true},
  definition: {type: String, required: true},
  examples: [{type: String, required: true}]
}
);

WordSchema.plugin(aggregatePaginate)
WordSchema.plugin(random)

module.exports = mongoose.model("Word", WordSchema);
