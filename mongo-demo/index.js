const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/playground").then(() => {
  console.log("CONNECTED TO MONGODB...");
});

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: {
    type: Date,
    default: Date.now,
  },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

const course = new Course({
  name: "Nodejs course",
  author: "Mosh",
  tags: ["Node", "MongoDB", "Express"],
  isPublished: false,
});

// this is an asynchronous operation i.e we don't know how much time it would take to save this to DB that's why it returns a promise
// course.save().then((result) => {
//   console.log({ result });
// });


(async function getCourses() {
    const courses = await Course
    .find({ }) // this find() method returns a DocumentQuery object that's why we can apply chaining query to the find method 
    .or([{author: {$in: ['Mosh']}}])
    .limit(10)
    .sort({name: 1});
    console.log({courses});
})();

/*

    Comparison operators (for comparing values)
    eq - equal
    ne - not equal
    gt - greater than
    gte - greater than equal
    lt - less than
    lte - less than equal
    in 

*/

/*

    Logical Operators
    or()
    and()

    // this will find the values which has author === 'Mosh' or isPublished true are either  
    Model.find().or([{author: 'Mosh'}, {isPublished: true}])

*/

/*

Schema types are
- String
- Number
- Date
- Buffer
- Boolean
- ObjectID
- Array 
*/
