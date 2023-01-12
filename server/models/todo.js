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

const Todo = mongoose.model("Todo", TodoSchema);

// //Todo is a name we gave to our Schema
//TodoSchema is our actual Schema name

module.exports = Todo;
