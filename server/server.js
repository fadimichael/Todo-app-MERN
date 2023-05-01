const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const colors = require("colors");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
// dotenv.config();
const { connectDB } = require("./utils/connectDB");
// const { todoRoutes } = require("./routes/Todo_Routes");

const { ObjectId } = require("mongodb");

const app = express();
const PORT = process.env.PORT || 4949;

app.use(cors());
app.use(morgan("dev"));

connectDB();
app.use(express.json());

// app.use("/api/todos", todoRoutes);

const Todo = require("./models/todo");

//read all todo
app.get("/todos/all", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new todo
app.post("/todos/add", (req, res) => {
  try {
    const todos = new Todo({ text: req.body.text });
    todos.save();
    res.json(todos);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete todo
app.delete("/todos/delete", async (req, res) => {
  const id = req.body.unique_id;
  console.log(colors.bgGreen(id));
  try {
    const result = await Todo.deleteOne({ _id: ObjectId(id) });
    // res.json(result);
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update todo
app.put("/todos/update/", async (req, res) => {
  try {
    const todo = await Todo.findById(req.body.id);
    todo.complete = !todo.complete;
    todo.save();
    res.json(todo);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

app.listen(PORT, () => {
  console.log(colors.bgGreen("Sever is listening to port : ", PORT));
});
