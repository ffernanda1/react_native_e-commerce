const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const app = express();
const port = 3001;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");



mongoose.connect("mongodb+srv://mangorifernanda:ffrostbite@cluster0.g1rmixt.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.log("Error connection to MongoDB", err);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const User = require("./models/user");
const Order = require("./models/order");

//function to send Verification Email to the user
const sendVerificationEmail = async (email, verificationToken) => {
    //create a nodemailer transport 
    const transporter = nodemailer.createTransport({
        //configure the email service

    });

    const mailOptions = {
        from: "amazon.com",
        to: email,
        subject: "Email Verification",
        text: `Please click the following link to verify your email : http://localhost:8000/verify/${verificationToken}`
    };

    //send email
    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log({ message: 'error sending verification email', error })

    }
}

//endpoint to register in the app
app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" })
        }

        const newUser = new User({ firstName, lastName, email, password })
        //generate and store verification
        newUser.verificationToken = crypto.randomBytes(20).toString("hex");

        //save the user to database
        await newUser.save();

        //send Verification email to the user

        sendVerificationEmail(newUser.email, newUser.verificationToken);


    } catch (error) {

        console.log("Error registering", error)
        res.status(500).json({ message: "registration failed" })
    }
});

//endpoint verify email

app.get('/verify/:token', async (req, res) => {
    try {
        const token = req.params.token;

        //Find the user with given verification token

        const user = await User.findOne({ verificationToken: token });
        if (!user) {
            return res.status(404).json({ message: "Invalid verification token" });
        };
        //Mark the user as verified
        user.verified = true;
        user.verificationToken = undefined;

        await user.save();

        res.status(200).json({ message: "email Verified successfully" });
    } catch (error) {
        res.status(500).json({ message: "email verification failed" })
    }
});