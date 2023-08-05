const express = require('express');
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();

/*===================================================================================== 
    Route 1 -   create user using :POST "/api/auth/".doesn't auth  
=======================================================================================*/

const JWT_SECRET = "shadabhussain";

router.post('/', [
    body('email', "Enter valid email").isEmail(),
    body('password', "Enter valid password").isLength({ min: 5 }),
    body('name', "Enter valid name").isLength({ min: 3 })
], async (req, res) => {
    //if any error occured then return bad request
    const {email,name,password} = req.body;
     
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //check if email is already exist
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "sorry user is already exist" });
        }
        /*========================
             create user
        ===================*/
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        const Data ={
            email,name,password
        };

       /* user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })*/
         user = await User.create(Data);

        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ authtoken });
        // res.json(user);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured");
    }
})

/*===================================================================================== 
      Route 2 -    Authenticate a user using:POST "/api/auth/login".no login require  
=======================================================================================*/


router.post('/login', [
    body('email', "Enter valid email").isEmail(),
    body('password', "password can not be blank").exists()
], async (req, res) => {

    //if any error occured then return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {email,password} = req.body;
    try {
        let user = await User.findOne({email});

        if(!user){
            return res.status(400).json({error:"fill correct cradential"});
        }

        const comparePassword = await bcrypt.compare(password,user.password);
        if(!comparePassword){
            return res.status(400).json({error:"fill correct cradential"});
        }
        const data = {
            user: {
                id: user.id
            }
        }

       
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ authtoken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error occured");
    }


})


/*===================================================================================== 
      Route 3 -    GET detail of logged in user : POST "/api/auth/getuser".login require 
=======================================================================================*/
router.post('/getuser',fetchuser, async (req, res) => {
    try{
        userID = req.user.id;
        const user = await User.findById(userID).select("-password");
        res.send(user);
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("internal server error");
    }
})
module.exports = router;