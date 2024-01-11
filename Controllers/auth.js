const sendMail = require('../utils/mails');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');



const postSignUp = async (req, res) => {
    //checking user exist or not
    try {
        // console.log(req.body);
        // console.log(userData);
        const user = await User.findOne({ email: req.body.email })
        // console.log(user);
        // console.log(Boolean(user));
        if (user) {
            res.send("user already exist");
        }
        else {
            req.body.password = await bcrypt.hash(req.body.password, 10);
            const token = await jwt.sign(req.body, 'shhhhh');
            // console.log(token);
            await sendMail(req.body.email, "Email verification", "your link to verify Email is", token);
            res.send("token send");
        }
    }
    catch (e) {
        console.log("something gone wrong");
        res.status(400).send("Bad response");
    }

}

const login = async (req, res) => {
    try {
        console.log(req.body);
        if (req.body.email && req.body.password) {
            const user = await User.findOne({ email: req.body.email })
            if (user) {
                console.log(user);
                const exist = await bcrypt.compare(req.body.password, user.password);
                if (exist) {
                    res.send("login succesfully");
                }
                else {
                    res.send("credentials are wrong");
                }


            }
            else {
                res.send("user dont exist");
            }

        }
        else {
            res.send("empty field");
        }

    } catch (error) {

    }

}

const verifySignup = async (req, res) => {
    const token = req.params.token;
    const data = await jwt.verify(token, 'shhhhh');
    //console.log(data);
    const exist = await User.findOne({ email: data.email });
    if (exist) {
        res.status(201).send("Token verified already");
    }
    else {
        await User.create(data);
        //console.log(token);
        res.send("verify");
    }
}

module.exports = { postSignUp, login, verifySignup }