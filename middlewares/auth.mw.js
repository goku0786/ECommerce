const userModel = require('../models/user.model');
const passwordValidator = require('password-validator');

const verifySignupBody = async (req, res, next) => {
    const { name, email, password, userId } = req.body;

    try {
        if (!name || !email || !password || !userId) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        // if (!emailRegex.test(email)) {
        //     return res.status(400).json({ message: "Invalid email format" });
        // }

        // const passwordSchema = new passwordValidator();
        // passwordSchema
        //     .is().min(8)
        //     .is().max(100)
        //     .has().uppercase()
        //     .has().lowercase()
        //     .has().digits()
        //     .has().not().spaces();

        // if (!passwordSchema.validate(password)) {
        //     return res.status(400).json({ message: "Password is not strong enough" });
        // }

        try {
            const user = await userModel.findOne({ userId });
            if (user) {
                return res.status(400).json({ message: "User Id should be unique" });
            }
        } catch (err) {
            console.error('Error while checking user existence', err);
            return res.status(500).json({ message: 'Error while checking user existence' });
        }

        next();
    } catch (err) {
        console.error('Error while validating user request', err);
        res.status(500).json({ message: 'Error while validating user request' });
    }
};

const verifySigninBody = async (req, res, next) => {
    if (!req.body.userId) {
        return res.status(400).send({ message: "userId is not provided" })
    }
    if (!req.body.password) {
        return res.status(400).send({ message: "password is not provided" })
    }

    next();
}

module.exports = {
    verifySignupBody,
    verifySigninBody
}