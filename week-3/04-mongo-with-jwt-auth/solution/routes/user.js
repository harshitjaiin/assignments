const { Router } = require("express");
const router = Router();
const jwt = require("jsonwebtoken")
const {Admin , User , Courses} = require("../db")
const userMiddleware = require("../middleware/user");
const {JWT_Secret} = require("../secret")
// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const username = req.headers.username;
    const password = req.headers.password;

    await User.create({
        username : username, 
        password : password
    })
    
    res.json({
        message : "User created successfully!"
    })
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username = req.headers.username
    const password = req.headers.password

    console.log(JWT_Secret);

    const User =  await User.find({
        username,
        password
    })

    if(User){
        const token = jwt.sign({
            username
        } , JWT_Secret);

        res.json({
            token
        })
    }
    else{
        res.status(411).json({
            message: "Incorrect Credentials!"
        })
    }
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const courses = await Courses.find({});

    res.json({
        courses: courses
    })
});

router.post('/courses/:courseId', userMiddleware,  async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username  = req.headers.username;
    
    await User.updateOne({
        username:username
    } , {
            "$push": {
                purchasedCourses:courseId
            }
    })
    res.json({
        message: "Course Purchase Successful!"
    })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const user = await Courses.findOne({
        username : req.headers.username
    })

    const purchasedCourses = user.purchasedCourses;
    const courses = await Courses.find({
        _id:{
            "$in":purchasedCourses
        }
    })

    res.json({
        courses
    })
});

module.exports = router