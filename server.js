const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.json());

const PORT = 3000;

let tasks = [];

app.get("/getTasks", (req, res) => {
  res.json({
    tasks: tasks,
  });
});

app.post("/addTasks", (req, res) => {
  let newTask = req.body;
  tasks.push(newTask);
  res.json({
    message: "Task added successfully.",
  });
});

app.delete("/deleteTask", (req, res) => {
  const index = req.body.index;
  console.log("Received request to delete task at index:", index);
  if (Number.isInteger(index) && index >= 0 && index < tasks.length) {
    tasks.splice(index, 1);
    res.json({
      message: "Task deleted successfully.",
    });
  } else {
    res.status(400).json({
      message: "Invalid task index.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`My Personal Manager App is running at http://localhost:${PORT}`);
});
