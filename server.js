const express = require('express');
const app = express();
const mongoose = require('mongoose');
const serverConfig = require('./configs/server.config')
const dbConfig = require('./configs/db.config')
const userModel = require('./models/user.model')
const bcrypt = require('bcryptjs')

app.use(express.json())

mongoose.connect(dbConfig.DB_URL)

const db = mongoose.connection

db.on("error", () => {
    console.log("Error in connecting to database")
})

db.once("open", () => {
    console.log("Connected to MongoDB")
    init();
})

async function init() {
    try {
        let user = await userModel.findOne({ userId: "admin" })
        if (user) {
            console.log("Admin already exists")
            return
        }

    } catch (err) {
        console.log("Error while reading data", err)
    }

    try {
        user = await userModel.create({
            userId: "admin",
            password: bcrypt.hashSync("admin", 8),
            name: "Admin",
            email: "admin@gmail.com",
        })
        console.log("Admin created successfully", user);
    }

    catch (err) {
        console.log("Error while creating Admin", err)
    }
}

require('./routes/auth.routes')(app)

app.listen(serverConfig.PORT, function (err) {
    if (err) console.log(err);
    console.log(`Server is running on port`, serverConfig.PORT);
})