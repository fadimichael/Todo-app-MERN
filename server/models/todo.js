const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  complete: {
    type: Boolean,
    default: false,
  },
  timestamp: {
    type: String,
    default: Date.now(),
  },
  // id: {
  //   type: mongoose.Types.ObjectId,
  //   required: true,
  // },
});

const Todo = mongoose.model("Todo", TodoSchema, "FADI");

// //Todo is a name we gave to our Schema it will build a new collection in mongodb with the name
// todos that mean (klein geschrieben und extra (s) am ende)
//TodoSchema is our actual Schema name

//if you want your own name and capital or small then you have to wirte it in the third Filed like FADI
// it will be FADI capital and without S and the end;
module.exports = Todo;
