const express = require("express");
const { Todo } = require("../models/todo.js");
const todoRoutes = express.Router();

// CREATE
todoRoutes.post("/", async (req, res) => {
  const newtodo = new Todo(req.body);
  try {
    const savedTodo = await newtodo.save();
    res.status(200).json(savedTodo);
  } catch (err) {
    res.status(500).json(err);
  }
});
todoRoutes.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = { todoRoutes };
