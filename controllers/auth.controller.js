const bcrypt = require('bcryptjs')
const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const secretKey = require('../configs/auth.config')

exports.signup = async (req, res) => {
    const user = req.body;
    const userObj = {
        name: user.name,
        email: user.email,
        userId: user.userId,
        userType: user.userType,
        password: bcrypt.hashSync(user.password, 8)
    }

    // const resObj = {
    //     name: userObj.name,
    //     email: userObj.email,
    //     userId: userObj.userId,
    //     userType: userObj.userType,
    //     password: userObj.password, // Include the hashed password
    //     createdAt: userObj.createdAt,
    //     updatedAt: userObj.updatedAt
    // }

    try {
        const userCreated = (await userModel.create(userObj));
        console.log(userCreated, 'user created')
        res.status(201).send(userCreated)

    } catch (err) {
        console.log(err, 'Error while registering user')
        res.status(500).send('Error while registering user')
    }

}

exports.signin = async (req, res) => {
    const user = await userModel.findOne({ userId: req.body.userId });
    if (user == null) {
        return res.status(400).send({ message: "User  id is not a valid user id" });
    }
    //                                   //provided by user  //stored in database
    const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);

    if (!isPasswordValid) {
        return res.status(401).send({ message: "Wrong password" });
    }

    const token = jwt.sign({ id: user.userId }, secretKey.secret, {
        expiresIn: 120
    })

    res.status(200).send({
        name: user.name,
        userId: user.userId,
        email: user.email,
        token: token,
    })

}