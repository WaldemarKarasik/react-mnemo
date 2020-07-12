const mongoose = require("mongoose");
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');


const WordSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: {type: String, required: true},
  definiton: {type: String, required: true},
  examples: [{type: String, required: true}]
}
);

WordSchema.plugin(aggregatePaginate)

module.exports = mongoose.model("Word", WordSchema);
