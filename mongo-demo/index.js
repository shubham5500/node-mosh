const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/playground").then(() => {
  console.log("CONNECTED TO MONGODB...");
});

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    // only these enum value will be required for this category
    enum: ['web', 'mobile', 'network'],
    required: true,
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      isAsync: true,
      validator: function(v) {
        setTimeout(() => {
          return Promise.resolve(v && v.length > 0)
        }, 4000);
      },
      message: 'A course should have at least one tag.'
    }
  },
  date: {
    type: Date,
    default: Date.now,
  },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
  },
});

const Course = mongoose.model("Course", courseSchema);

const course = new Course({
  name: 'Shubham',
  author: "Mosh",
  category: 'web',
  tags: null,
  isPublished: true,
  price: 10,
});

(async function () {
  try {
    console.log("RUN");
    await course.validate();
    // this is an asynchronous operation i.e we don't know how much time it would take to save this to DB that's why it returns a promise

    await course.save();
  } catch (error) {
    console.log("===========>", error.message);
  }
})();

// (async function getCourses() {
//   const courses = await Course.find({}) // this find() method returns a DocumentQuery object that's why we can apply chaining query to the find method
//     .or([{ author: { $in: ["Mosh"] } }])
//     .limit(10)
//     .sort({ name: 1 });
//   console.log({ courses });
// })();

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
