const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/embedding-document-relation')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: [authorSchema],
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function updateCourse(courseId) {
    const course = Course.findById(courseId);

    course.author.name = 'Shubham Yadav';
    course.save();
}

async function addAuthor(courseId, author) {
    const course = await Course.findById(courseId);
    course.authors.push(author);
    course.save();
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function removeAuthor(courseId, authorId) {
    const course = await Course.findById(courseId);
    // course.authors = course.authors.filter(author => author.id !== authorId);
    const author = course.authors.id(authorId);
    author.deleteOne();
    course.save();
}

// addAuthor('6597fc362f1052bac5deb6f9', new Author({name: 'Mosh'}))
removeAuthor('6597fc362f1052bac5deb6f9', '6597ff20cdc3dcff85684aa1');
// createCourse('Node Course', [new Author({ name: 'Mosh' }), new Author({ name: 'Shubham' })]);