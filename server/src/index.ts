import express from "express";
import cors from "cors";
import { pool } from "./db";

const app = express();

//middleware
app.use(cors());
app.use(express.json()); // automatically turns body response into json

// ROUTES

// create a todo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    res.status(201).json(newTodo.rows[0]);
  } catch (error) {
    console.error(error);
    // console.error(error.message);
  }
});

// get all todos
app.get("/todos", async (req, res) => {
  const todos = await pool.query("SELECT * FROM todo");
  res.status(200).send({ todos: todos.rows });
});

// get a todo
app.get("/todos/:id", async (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
  res.status(200).send({ todo: todo.rows });
});

// update a todo
app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  const updateTodo = await pool.query(
    "UPDATE todo SET description = $1 WHERE todo_id = $2",
    [description, id]
  );
  res.status(200).send({ msg: "Todo was updated" });
});

// delete a todo
app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  const deleteTodo = pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
  res.status(204).send({ msg: "Todo was deleted" });
});

app.listen(5000, () => {
  console.log("Server has started on port 5000");
});
