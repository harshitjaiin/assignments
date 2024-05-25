const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const {Admin} = require("../db");
const {Course} = require("../db");


// ### Admin Routes:
// - POST /admin/signup
//   Description: Creates a new admin account.
//   Input Body: { username: 'admin', password: 'pass' }
//   Output: { message: 'Admin created successfully' }
// - GET /admin/courses
//   Description: Returns all the courses.
//   Input: Headers: { 'username': 'username', 'password': 'password' }
//   Output: { courses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] }

// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const username = req.headers.username;
    const password = req.headers.password;

    Admin.create({
        username:username,
        password:password
    }).then(function(){
        res.json({
        msg:"Successfully Registered!"
        })
    })
});


// -POST /admin/courses
//   Description: Creates a new course.
//   Input: Headers: { 'username': 'username', 'password': 'password' }, Body: { title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com' }
//   Output: { message: 'Course created successfully', courseId: "new course id" }
router.post('/courses', adminMiddleware, async(req, res) => {
    // Implement course creation logic
        // Body: { title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com' }
        const body = req.body;
        const title = body.title;
        const description = body.description;
        const price = body.price;
        const imageLink = body.imageLink;
        
        const newCourse = await Course.create({
            title: title,
            description: description,
            price:price,
            imageLink: imageLink
        })
        if(newCourse){
            res.json({
                msg:"Successfully Added a New Course!",
                //ye apne aap deteta hui database ( mongoDb here)
                courseId: newCourse._id
            })
        }
        else{
            res.json({
                msg:"error in connecting to the database!"
            })
        }
        
});

router.get('/courses', adminMiddleware, async(req, res) => {
    // Implement fetching all courses logic
const {Course} = require("../db");
const courses = await Course.find({})
    
    res.json({
        courses : courses
    })
});

module.exports = router;