const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const {Admin} = require("../db");
const {User} = require("../db");
const jwt = require("jsonwebtoken");
const secret = require("../secret.js")

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

router.post('/signin' , async(req, res) => {
    // Implement admin signup logic
    const username = req.headers.username;
    const password = req.headers.password;

    const isValidated = await Admin.find({
        username:username,
        password:password
    })

    if(isValidated){
        const token = jwt.sign({password , username} , secret );
        res.json({
            token
        })
    }
    else{
        res.status(411).json({
            msg:"You are not Authorised"
        })
    }
});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
    res.json({
        msg:"Hi I'm permitted to view courses!"
    });
});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
});

module.exports = router;