const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User, Course} = require("../db");
// User Routes
// ### User routes
// - POST /users/signup
//   Description: Creates a new user account.
//   Input: { username: 'user', password: 'pass' }
//   Output: { message: 'User created successfully' }
// - GET /users/courses
//   Description: Lists all the courses.
//   Input: Headers: { 'username': 'username', 'password': 'password' }
//   Output: { courses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] }
// - POST /users/courses/:courseId
//   Description: Purchases a course. courseId in the URL path should be replaced with the ID of the course to be purchased.
//   Input: Headers: { 'username': 'username', 'password': 'password' }
//   Output: { message: 'Course purchased successfully' }
// - GET /users/purchasedCourses
//    Description: Lists all the courses purchased by the user.
//   Input: Headers: { 'username': 'username', 'password': 'password' }
//   Output: { purchasedCourses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] }
router.post('/signup',async  (req, res) => {
    // Implement user signup logic
    const username = req.headers.username;
    const password = req.headers.password;

    await User.create({
        username:username,
        password:password
    })
    res.json({
        msg:"User Created Successfully!"
    })
});

//it doesnt use middleware as zruri nhi hai course dekhne k lie user ka reg hona
router.get('/courses',async (req, res) => {
    // Implement listing all courses logic
    const data = await Course.find({});

    res.json({
        courses:data
    })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;
    console.log(courseId);
    await User.updateOne({
        username:username,
    },{
        "$push":{
            purchasedCourses:courseId
        }
    })
    res.json({
        msg:"Purchase Complete!"
    })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({
        username:req.headers.username
    })

    const purchasedCourses = user.purchasedCourses;
    const courses = await Course.find({
        _id:{
            "$in":purchasedCourses
        }
    })

    res.json({
        courses : courses
    })
});

module.exports = router