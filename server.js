const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//Creating Express app
const app = express();

// Config
dotenv.config({ path: "config/config.env" });

app.use(express.json());
app.use(cors());

// Connecting Database
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch(console.error);

//Creating Schema
const Schema = mongoose.Schema;
const TodoSchema = new Schema({
  task: {
    type: String,
    required: true,
  },
});

const Todo = mongoose.model("Todo", TodoSchema);

//App routes

app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post("/todos/new", async (req, res) => {
  const todos = await new Todo({
    task: req.body.task,
  });
  todos.save();
  res.json(todos);
});

app.delete("/todos/delete/:id", async (req, res) => {
  const result = await Todo.findByIdAndDelete(req.params.id);
  res.json(result);
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 4000;
}

app.listen(port, function () {
  console.log(`Server has started successfully on Port ${port}`);
});
