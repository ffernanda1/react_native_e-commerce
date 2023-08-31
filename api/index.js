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
        service: 'gmail',
        auth: {
            user: "mangorifernanda@gmail.com",
            pass: "mjtwetitsdujwtvy"
        }
    });

    const mailOptions = {
        from: "amazon.com",
        to: email,
        subject: "Email Verification",
        text: `Please click the following link to verify your email : http://192.168.1.67:3001/verify/${verificationToken}`
    };

    //send email
    try {
        await transporter.sendMail(mailOptions);
        console.log("verification email sent successfully")
    } catch (error) {
        console.log({ message: 'error sending verification email', error })

    }
}
const generateSecretKey = () => {
    const secretKey = crypto.randomBytes(32).toString("hex");
    return secretKey
}

const secretKey = generateSecretKey()

//endpoint to register in the app
app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("email already registered:", email);
            return res.status(400).json({ message: "Email already registered" })
        }

        const newUser = new User({ name, email, password })

        //generate and store verification
        newUser.verificationToken = crypto.randomBytes(20).toString("hex");

        //save the user to database
        await newUser.save();

        console.log("New User Registered:", newUser);


        //send Verification email to the user
        sendVerificationEmail(newUser.email, newUser.verificationToken);

        res.status(201).json({
            message:
                "Registration successful. Please check your email for verification.",
        });
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

//endpoint to login the user
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        //check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" })
        }

        //check if the passowrd is correct
        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid password' })

        }

        //generate token
        const token = jwt.sign({ userId: user._id }, secretKey);

        res.status(200).json({ token })
    } catch (error) {
        res.status(500).json({ messageL: "login failed!!" })
    }
})