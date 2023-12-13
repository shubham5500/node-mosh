const express = require("express");
const Joi = require("joi");
const router = express.Router();

const courses = [
    { course: "Some course 1", id: 1 },
    { course: "Some course 2", id: 2 },
    { course: "Some course 3", id: 3 },
  ];
  
router.get("/", (req, res) => {
  res.send(courses);
});

router.get("/:id", (req, res) => {
  // we are reading the id from the URL i.e //:id
  const id = req.params.id;
  const course = courses.find((item) => item.id === parseInt(id));
  if (!course) {
    res.status(404).send("Course not found");
  }
  res.status(200).send(course);
});

router.post("/", (req, res) => {
  if (validateCourse(req.body).error) {
    return res.status(400).send(result.error);
  }
  const post = {
    id: courses.length + 1,
    name: req.body.name,
  };

  courses.push(post);
  res.send(post);
});

router.put("/:id", (req, res) => {
  // Look up for the course
  // if not existing return 404
  const course = courses.find((item) => item.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send("Course not found");
  }

  if (validateCourse(req.body).error) {
    return res.status(400).send(result.error);
  }
  course.course = req.body.name;
  res.status(200).send(course);
});

function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(course);
}
module.exports = router;
