const express = require("express");
const Joi = require("joi");
require("dotenv").config();

const app = express();
app.use(express.json());

const courses = [
  { course: "Some course 1", id: 1 },
  { course: "Some course 2", id: 2 },
  { course: "Some course 3", id: 3 },
];

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  // we are reading the id from the URL i.e /api/courses/:id
  const id = req.params.id;
  const course = courses.find(item => item.id === parseInt(id));
  if (!course) {
    res.status(404).send('Course not found');
  }
  res.status(200).send(course);
});

app.post('/api/courses', (req, res) => {
    if (!req.body.name || req.body.name.length < 3) {
        res.status(400).send('Bad request');
        return;
    }
    const post = {
        id: courses.length + 1,
        name: req.body.name,
    }

    courses.push(post);
    res.send(post);
})

app.listen(process.env.PORT, () => {
  console.log("LISTENING ON 3000");
});
